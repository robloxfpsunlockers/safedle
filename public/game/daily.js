class R34DailyGame {
  constructor() {
    this.maxRounds = 10;
    this.maxPostCountRatio = 12;

    this.isAnimating = false;
    this.gameActive = false;
    this.viewingRound = null;
    this.displayedRound = 0;

    this.allCharacters = [];
    this.characterByTag = new Map();

    this.seed = this.getDailySeed();
    this.dailySaveKey = this.getDailySaveKey();

    const seedGen = this.xmur3(this.seed);
    this.random = this.mulberry32(seedGen());

    this.elements = this.initializeElements();
    this.initializeNavigation();
    this.initializeInteractions();

    this.startGame().catch((err) => {
      console.error("Failed to start daily game:", err);
      this.showError();
    });
  }

  initializeElements() {
    return {
      loading: document.getElementById("loading"),
      gameContent: document.getElementById("game-content"),
      errorMessage: document.getElementById("error-message"),
      resultOverlay: document.getElementById("result-overlay"),
      finalScorePopup: document.getElementById("final-score-popup"),

      currentRoundDisplay: document.getElementById("current-round"),
      backToCurrentRoundBtn: document.getElementById("back-to-current-round"),

      scoreSquares: document.getElementById("score-squares"),
      scoreBreakdown: document.getElementById("score-breakdown"),

      leftCharacter: document.getElementById("left-character"),
      leftNotes: document.getElementById("left-character-notes"),
      leftCountContainer: document.getElementById("left-count-container"),
      leftCountDisplay: document.getElementById("left-count-display"),
      leftCard: document.querySelector(".character-container.left .character-card"),
      leftQuestionMark: document.querySelector(".left-question-mark"),

      rightCharacter: document.getElementById("right-character"),
      rightNotes: document.getElementById("right-character-notes"),
      rightCountContainer: document.getElementById("right-count-container"),
      rightCountDisplay: document.getElementById("right-count"),
      rightCard: document.querySelector(
        ".character-container.right .character-card"
      ),
      rightQuestionMark: document.querySelector(".right-question-mark"),

      resultText: document.getElementById("result-text"),
      nextBtn: document.getElementById("next-btn"),

      finalScoreText: document.getElementById("final-score-text"),
      shareScoreBtn: document.getElementById("share-score-btn"),
      playMainModeBtn: document.getElementById("play-main-mode-btn"),
      nextDailyTimer: document.getElementById("next-daily-timer"),

      backToMainLink: document.getElementById("back-to-main"),
    };
  }

  initializeNavigation() {
    const goToMainMode = () => {
      const locale = this.detectLocale();
      const target = `/${locale}/game`;

      try {
        if (window.top) {
          window.top.location.assign(target);
          return;
        }
      } catch (_) {}

      window.location.assign(target);
    };

    if (this.elements.backToMainLink) {
      this.elements.backToMainLink.addEventListener("click", (e) => {
        e.preventDefault();
        goToMainMode();
      });
    }

    if (this.elements.playMainModeBtn) {
      this.elements.playMainModeBtn.addEventListener("click", () => {
        goToMainMode();
      });
    }
  }

  initializeInteractions() {
    if (this.elements.leftCard) {
      this.elements.leftCard.addEventListener("click", () =>
        this.makeGuess("left")
      );
    }

    if (this.elements.rightCard) {
      this.elements.rightCard.addEventListener("click", () =>
        this.makeGuess("right")
      );
    }

    if (this.elements.nextBtn) {
      this.elements.nextBtn.addEventListener("click", () => this.nextRound());
    }

    if (this.elements.backToCurrentRoundBtn) {
      this.elements.backToCurrentRoundBtn.addEventListener("click", () =>
        this.exitViewingMode()
      );
    }

    if (this.elements.shareScoreBtn) {
      this.elements.shareScoreBtn.addEventListener("click", () =>
        this.shareScore()
      );
    }
  }

  async startGame() {
    this.showLoading();
    await this.loadCharacters();

    this.state = this.loadGameState();
    if (!this.state) {
      this.state = this.createNewGameState();
      this.saveGameState();
    }
    if (!this.isStateValid(this.state)) {
      this.state = this.createNewGameState();
      this.saveGameState();
    }

    this.generateScoreTracker();
    this.updateScoreTracker();

    this.elements.loading.style.display = "none";
    this.elements.errorMessage.style.display = "none";
    this.elements.gameContent.style.display = "flex";

    if (this.state.completed) {
      this.showFinalScore();
      return;
    }

    this.displayedRound = this.getSafeCurrentRound();
    this.loadRound(this.displayedRound, { viewing: false });
    this.startNextDailyCountdown();
  }

  async loadCharacters() {
    let characters = null;

    if (
      window.gameCache &&
      typeof window.gameCache.getCharacterData === "function"
    ) {
      characters = await window.gameCache.getCharacterData(true);
    } else {
      const response = await fetch("/api/characters");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      characters = await response.json();
    }

    if (!Array.isArray(characters) || characters.length < this.maxRounds * 2) {
      throw new Error("Not enough characters for daily mode");
    }

    this.allCharacters = characters;
    this.characterByTag = new Map();
    for (const char of characters) {
      if (char && typeof char.tag_name === "string") {
        this.characterByTag.set(char.tag_name, char);
      }
    }
  }

  createNewGameState() {
    return {
      version: 1,
      seed: this.seed,
      createdAt: Date.now(),
      currentRound: 0,
      completed: false,
      pairs: this.generateDailyPairs(),
      answers: Array(this.maxRounds).fill(null),
      guesses: Array(this.maxRounds).fill(null),
    };
  }

  generateDailyPairs() {
    const validChars = this.allCharacters.filter((c) => {
      if (!c || typeof c.tag_name !== "string") return false;
      const postCount = Number(c.post_count);
      return Number.isFinite(postCount) && postCount > 0;
    });

    if (validChars.length < this.maxRounds * 2) {
      throw new Error("Not enough characters for daily mode");
    }

    const used = new Set();
    const pairs = [];

    const pickUnusedIndex = () => {
      const remainingCount = validChars.length - used.size;
      if (remainingCount <= 0) return null;

      let skip = this.randomInt(remainingCount);
      for (let i = 0; i < validChars.length; i++) {
        if (used.has(i)) continue;
        if (skip === 0) return i;
        skip--;
      }
      return null;
    };

    for (let round = 0; round < this.maxRounds; round++) {
      let pair = null;

      for (let attempt = 0; attempt < 300; attempt++) {
        const leftIdx = pickUnusedIndex();
        if (leftIdx === null) break;

        const left = validChars[leftIdx];
        const leftCount = Number(left.post_count);
        if (!Number.isFinite(leftCount) || leftCount <= 0) continue;

        const candidates = [];
        for (let j = 0; j < validChars.length; j++) {
          if (j === leftIdx || used.has(j)) continue;
          const right = validChars[j];
          const rightCount = Number(right.post_count);
          if (!Number.isFinite(rightCount) || rightCount <= 0) continue;
          if (this.isPairBalanced(leftCount, rightCount)) {
            candidates.push(j);
          }
        }

        if (candidates.length === 0) continue;

        const rightIdx = candidates[this.randomInt(candidates.length)];
        const right = validChars[rightIdx];

        used.add(leftIdx);
        used.add(rightIdx);

        pair = {
          leftTag: left.tag_name,
          rightTag: right.tag_name,
        };
        break;
      }

      if (!pair) {
        const remaining = [];
        for (let i = 0; i < validChars.length; i++) {
          if (!used.has(i)) remaining.push(i);
        }
        if (remaining.length < 2) {
          throw new Error("Not enough characters for daily mode");
        }

        const leftIdx = remaining[this.randomInt(remaining.length)];
        used.add(leftIdx);
        const remaining2 = remaining.filter((i) => i !== leftIdx);
        const rightIdx = remaining2[this.randomInt(remaining2.length)];
        used.add(rightIdx);

        pair = {
          leftTag: validChars[leftIdx].tag_name,
          rightTag: validChars[rightIdx].tag_name,
        };
      }

      pairs.push(pair);
    }

    return pairs;
  }

  isPairBalanced(leftCount, rightCount) {
    const min = Math.min(leftCount, rightCount);
    const max = Math.max(leftCount, rightCount);
    if (min <= 0) return false;
    return max / min <= this.maxPostCountRatio;
  }

  getDailySeed() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  getDailySaveKey() {
    return `daily_game_${this.seed}`;
  }

  loadGameState() {
    try {
      const raw = localStorage.getItem(this.dailySaveKey);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (!parsed || parsed.seed !== this.seed || parsed.version !== 1) {
        return null;
      }

      if (!Array.isArray(parsed.pairs) || parsed.pairs.length !== this.maxRounds) {
        return null;
      }

      parsed.answers = Array.isArray(parsed.answers)
        ? parsed.answers.slice(0, this.maxRounds)
        : [];
      parsed.guesses = Array.isArray(parsed.guesses)
        ? parsed.guesses.slice(0, this.maxRounds)
        : [];

      while (parsed.answers.length < this.maxRounds) parsed.answers.push(null);
      while (parsed.guesses.length < this.maxRounds) parsed.guesses.push(null);

      if (typeof parsed.currentRound !== "number") {
        parsed.currentRound = 0;
      }
      parsed.currentRound = Math.max(0, Math.min(this.maxRounds, parsed.currentRound));

      const firstUnanswered = parsed.answers.findIndex((a) => a === null);
      if (firstUnanswered === -1) {
        parsed.currentRound = this.maxRounds;
        parsed.completed = true;
      } else {
        parsed.currentRound = firstUnanswered;
      }

      parsed.completed = Boolean(parsed.completed) || parsed.currentRound >= this.maxRounds;

      return parsed;
    } catch (e) {
      console.warn("Failed to load daily game state:", e);
      return null;
    }
  }

  saveGameState() {
    try {
      localStorage.setItem(this.dailySaveKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save daily game state:", e);
    }
  }

  getSafeCurrentRound() {
    if (!this.state) return 0;
    const r = Number(this.state.currentRound);
    if (!Number.isFinite(r)) return 0;
    return Math.max(0, Math.min(this.maxRounds - 1, r));
  }

  loadRound(roundIndex, { viewing }) {
    const pair = this.state.pairs[roundIndex];
    const left = this.getCharacter(pair.leftTag);
    const right = this.getCharacter(pair.rightTag);

    this.displayedRound = roundIndex;
    this.viewingRound = viewing ? roundIndex : null;

    this.setRoundDisplay(roundIndex, viewing);
    this.updateCardDisplay(left, right);

    this.clearCardFeedback();

    if (viewing) {
      this.elements.backToCurrentRoundBtn.style.display = "inline-flex";
      this.elements.backToCurrentRoundBtn.textContent = this.state.completed
        ? "Back to Results"
        : "Back to Game";

      this.setCardsClickable(false);
      this.revealCounts(left.post_count, right.post_count);

      const guessSide = this.state.guesses[roundIndex];
      if (guessSide) {
        const correctSide = this.getCorrectSide(left.post_count, right.post_count);
        if (guessSide === correctSide) {
          this.getCardBySide(guessSide).classList.add("correct-answer");
        } else {
          this.getCardBySide(guessSide).classList.add("wrong-answer");
          this.getCardBySide(correctSide).classList.add("correct-answer");
        }
      }

      this.gameActive = false;
      return;
    }

    this.elements.backToCurrentRoundBtn.style.display = "none";
    this.hideCounts();

    this.setCardsClickable(true);
    this.gameActive = true;
  }

  updateCardDisplay(left, right) {
    this.elements.leftCharacter.textContent = this.formatCharacterName(
      left.tag_name
    );
    this.setNotes(this.elements.leftNotes, left.note);
    this.elements.leftCountDisplay.textContent = Number(left.post_count).toLocaleString();
    this.updateCharacterImage(this.elements.leftCard, left.image_url);

    this.elements.rightCharacter.textContent = this.formatCharacterName(
      right.tag_name
    );
    this.setNotes(this.elements.rightNotes, right.note);
    this.elements.rightCountDisplay.textContent = Number(
      right.post_count
    ).toLocaleString();
    this.updateCharacterImage(this.elements.rightCard, right.image_url);
  }

  setNotes(notesEl, note) {
    if (!notesEl) return;
    if (note && String(note).trim() !== "") {
      notesEl.textContent = note;
      notesEl.style.display = "block";
    } else {
      notesEl.textContent = "";
      notesEl.style.display = "none";
    }
  }

  getCharacter(tagName) {
    const char = this.characterByTag.get(tagName);
    if (!char) {
      throw new Error(`Character not found: ${tagName}`);
    }
    return char;
  }

  formatCharacterName(name) {
    if (typeof name !== "string") return "Unknown";
    return name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  setRoundDisplay(roundIndex, viewing) {
    if (!this.elements.currentRoundDisplay) return;
    const base = `${roundIndex + 1}/${this.maxRounds}`;
    this.elements.currentRoundDisplay.textContent = viewing
      ? `${base} (Viewing)`
      : base;
  }

  generateScoreTracker() {
    if (!this.elements.scoreSquares) return;
    this.elements.scoreSquares.innerHTML = "";

    for (let i = 0; i < this.maxRounds; i++) {
      const sq = document.createElement("div");
      sq.className = "score-square pending";
      sq.textContent = String(i + 1);
      sq.dataset.roundIndex = String(i);
      sq.addEventListener("click", () => this.onScoreSquareClick(i));
      this.elements.scoreSquares.appendChild(sq);
    }
  }

  updateScoreTracker() {
    if (!this.elements.scoreSquares) return;
    const squares = this.elements.scoreSquares.querySelectorAll(".score-square");
    squares.forEach((sq) => {
      const idx = Number(sq.dataset.roundIndex);
      const answer = this.state.answers[idx];
      sq.classList.remove("pending", "correct", "incorrect");

      if (answer === true) {
        sq.classList.add("correct");
      } else if (answer === false) {
        sq.classList.add("incorrect");
      } else {
        sq.classList.add("pending");
      }
    });

    this.updateScoreBreakdown();
  }

  updateScoreBreakdown() {
    if (!this.elements.scoreBreakdown) return;
    this.elements.scoreBreakdown.innerHTML = "";

    for (let i = 0; i < this.maxRounds; i++) {
      const sq = document.createElement("div");
      sq.className = "score-square pending";
      sq.dataset.roundIndex = String(i);
      sq.addEventListener("click", () => this.onScoreSquareClick(i));

      const answer = this.state.answers[i];
      if (answer === true) {
        sq.classList.remove("pending");
        sq.classList.add("correct");
      } else if (answer === false) {
        sq.classList.remove("pending");
        sq.classList.add("incorrect");
      }

      this.elements.scoreBreakdown.appendChild(sq);
    }
  }

  onScoreSquareClick(roundIndex) {
    const answered = this.state.answers[roundIndex] !== null;
    if (!answered) return;

    this.elements.resultOverlay.style.display = "none";
    this.elements.finalScorePopup.style.display = "none";

    this.loadRound(roundIndex, { viewing: true });
  }

  exitViewingMode() {
    if (this.state.completed) {
      this.showFinalScore();
      return;
    }

    this.viewingRound = null;
    this.displayedRound = this.getSafeCurrentRound();
    this.loadRound(this.displayedRound, { viewing: false });
  }

  async makeGuess(side) {
    if (!this.gameActive || this.isAnimating) return;
    if (this.viewingRound !== null) return;
    if (this.state.completed) return;
    if (this.displayedRound !== this.getSafeCurrentRound()) return;
    if (this.state.answers[this.displayedRound] !== null) return;

    this.isAnimating = true;
    this.gameActive = false;

    const roundIndex = this.displayedRound;
    const pair = this.state.pairs[roundIndex];
    const left = this.getCharacter(pair.leftTag);
    const right = this.getCharacter(pair.rightTag);

    const correctSide = this.getCorrectSide(left.post_count, right.post_count);
    const isCorrect = side === correctSide;

    this.state.guesses[roundIndex] = side;
    this.state.answers[roundIndex] = isCorrect;
    this.state.currentRound = Math.max(this.state.currentRound, roundIndex + 1);
    if (this.state.currentRound >= this.maxRounds) {
      this.state.completed = true;
    }

    this.saveGameState();
    this.updateScoreTracker();

    this.clearCardFeedback();
    if (isCorrect) {
      this.getCardBySide(side).classList.add("correct-answer");
    } else {
      this.getCardBySide(side).classList.add("wrong-answer");
      this.getCardBySide(correctSide).classList.add("correct-answer");
    }

    this.revealCounts(left.post_count, right.post_count);
    this.showResultOverlay(isCorrect);

    this.isAnimating = false;
  }

  getCorrectSide(leftCount, rightCount) {
    const left = Number(leftCount);
    const right = Number(rightCount);
    if (!Number.isFinite(left) || !Number.isFinite(right)) return "left";
    if (left === right) return "left";
    return left > right ? "left" : "right";
  }

  getCardBySide(side) {
    return side === "left" ? this.elements.leftCard : this.elements.rightCard;
  }

  clearCardFeedback() {
    if (this.elements.leftCard) {
      this.elements.leftCard.classList.remove("correct-answer", "wrong-answer");
    }
    if (this.elements.rightCard) {
      this.elements.rightCard.classList.remove("correct-answer", "wrong-answer");
    }
  }

  setCardsClickable(clickable) {
    const value = clickable ? "" : "none";
    if (this.elements.leftCard) this.elements.leftCard.style.pointerEvents = value;
    if (this.elements.rightCard) this.elements.rightCard.style.pointerEvents = value;
  }

  hideCounts() {
    if (this.elements.leftCountContainer) {
      this.elements.leftCountContainer.classList.add("hard-hidden");
      this.elements.leftCountContainer.classList.remove("revealing");
      this.elements.leftCountContainer.style.display = "none";
    }
    if (this.elements.rightCountContainer) {
      this.elements.rightCountContainer.classList.add("hard-hidden");
      this.elements.rightCountContainer.classList.remove("revealing");
      this.elements.rightCountContainer.style.display = "none";
    }
    if (this.elements.leftQuestionMark) this.elements.leftQuestionMark.style.display = "block";
    if (this.elements.rightQuestionMark) this.elements.rightQuestionMark.style.display = "block";
  }

  revealCounts(leftCount, rightCount) {
    if (this.elements.leftCountDisplay) {
      this.elements.leftCountDisplay.textContent = Number(leftCount).toLocaleString();
    }
    if (this.elements.rightCountDisplay) {
      this.elements.rightCountDisplay.textContent = Number(rightCount).toLocaleString();
    }

    if (this.elements.leftCountContainer) {
      this.elements.leftCountContainer.classList.remove("hard-hidden");
      this.elements.leftCountContainer.classList.add("revealing");
      this.elements.leftCountContainer.style.display = "block";
      setTimeout(() => {
        this.elements.leftCountContainer.classList.remove("revealing");
      }, 350);
    }

    if (this.elements.rightCountContainer) {
      this.elements.rightCountContainer.classList.remove("hard-hidden");
      this.elements.rightCountContainer.classList.add("revealing");
      this.elements.rightCountContainer.style.display = "block";
      setTimeout(() => {
        this.elements.rightCountContainer.classList.remove("revealing");
      }, 350);
    }

    if (this.elements.leftQuestionMark) this.elements.leftQuestionMark.style.display = "none";
    if (this.elements.rightQuestionMark) this.elements.rightQuestionMark.style.display = "none";
  }

  showResultOverlay(isCorrect) {
    if (!this.elements.resultOverlay) return;
    this.elements.resultText.textContent = isCorrect ? "Correct!" : "Incorrect";
    this.elements.resultText.classList.remove("correct", "incorrect");
    this.elements.resultText.classList.add(isCorrect ? "correct" : "incorrect");

    this.elements.resultOverlay.style.display = "block";
    // Force reflow so CSS transition triggers consistently
    this.elements.resultOverlay.offsetHeight;
    this.elements.resultOverlay.classList.add("show");

    if (this.elements.nextBtn) {
      this.elements.nextBtn.textContent = this.state.completed
        ? "View Results"
        : "Next Round";
    }
  }

  nextRound() {
    this.elements.resultOverlay.classList.remove("show");
    setTimeout(() => {
      this.elements.resultOverlay.style.display = "none";
    }, 400);

    if (this.state.completed) {
      this.showFinalScore();
      return;
    }

    this.displayedRound = this.getSafeCurrentRound();
    this.loadRound(this.displayedRound, { viewing: false });
  }

  showFinalScore() {
    this.elements.resultOverlay.style.display = "none";
    this.elements.finalScorePopup.style.display = "flex";
    this.elements.backToCurrentRoundBtn.style.display = "none";

    const score = this.state.answers.filter((a) => a === true).length;
    this.elements.finalScoreText.textContent = `${score}/${this.maxRounds}`;

    this.updateScoreBreakdown();
    this.startNextDailyCountdown();
  }

  isStateValid(state) {
    if (!state || state.seed !== this.seed || state.version !== 1) return false;
    if (!Array.isArray(state.pairs) || state.pairs.length !== this.maxRounds) {
      return false;
    }

    for (const pair of state.pairs) {
      if (!pair || typeof pair.leftTag !== "string" || typeof pair.rightTag !== "string") {
        return false;
      }
      if (pair.leftTag === pair.rightTag) return false;
      if (!this.characterByTag.has(pair.leftTag)) return false;
      if (!this.characterByTag.has(pair.rightTag)) return false;
    }

    return true;
  }

  async shareScore() {
    const date = this.seed;
    const locale = this.detectLocale();
    const score = this.state.answers.filter((a) => a === true).length;
    const squares = this.state.answers
      .map((a) => (a === true ? "🟩" : a === false ? "🟥" : "⬜"))
      .join("");

    const shareUrl = `${window.location.origin}/${locale}/daily`;
    const text = `Rule34dle Daily ${date}\n${score}/${this.maxRounds}\n${squares}\n${shareUrl}`;

    try {
      await navigator.clipboard.writeText(text);
      this.flashShareButton("Copied!");
    } catch (e) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        this.flashShareButton("Copied!");
      } catch (e2) {
        console.warn("Failed to copy score:", e2);
        this.flashShareButton("Copy failed");
      }
    }
  }

  flashShareButton(label) {
    if (!this.elements.shareScoreBtn) return;
    const original = this.elements.shareScoreBtn.textContent;
    this.elements.shareScoreBtn.textContent = label;
    setTimeout(() => {
      this.elements.shareScoreBtn.textContent = original;
    }, 1200);
  }

  startNextDailyCountdown() {
    if (!this.elements.nextDailyTimer) return;

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }

    const update = () => {
      const next = this.getNextUtcMidnight();
      const diff = Math.max(0, next.getTime() - Date.now());

      const totalSeconds = Math.floor(diff / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(totalSeconds % 60).padStart(2, "0");

      this.elements.nextDailyTimer.textContent = `${hours}:${minutes}:${seconds}`;
      if (diff <= 0) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
        this.elements.nextDailyTimer.textContent = "00:00:00";
      }
    };

    update();
    this.countdownInterval = setInterval(update, 1000);
  }

  getNextUtcMidnight() {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  }

  detectLocale() {
    const supported = [
      "en",
      "zh",
      "zh-TW",
      "ja",
      "es",
      "fr",
      "de",
      "ru",
      "pt",
      "it",
      "nl",
      "ko",
      "hi",
      "tr",
      "ar",
      "th",
    ];

    try {
      const path = (window.top || window).location.pathname || "/";
      const first = path.split("/").filter(Boolean)[0] || "";
      if (supported.includes(first)) return first;
    } catch (_) {}

    return "en";
  }

  showLoading() {
    this.elements.loading.style.display = "flex";
    this.elements.gameContent.style.display = "none";
    this.elements.errorMessage.style.display = "none";
  }

  showError() {
    this.elements.loading.style.display = "none";
    this.elements.gameContent.style.display = "none";
    this.elements.errorMessage.style.display = "block";
  }

  randomInt(max) {
    if (max <= 0) return 0;
    return Math.floor(this.random() * max);
  }

  xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
    };
  }

  mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  updateCharacterImage(characterCard, imageUrl) {
    if (!characterCard) return;

    const existingImageContainer = characterCard.querySelector(
      ".character-image-container"
    );
    if (existingImageContainer) {
      existingImageContainer.remove();
    }

    if (!imageUrl || String(imageUrl).trim() === "") return;

    const imageContainer = document.createElement("div");
    imageContainer.className = "character-image-container";

    const image = document.createElement("img");
    image.className = "character-image";
    try {
      image.referrerPolicy = "no-referrer";
    } catch (_) {}

    imageContainer.appendChild(image);

    const characterName = characterCard.querySelector("h2");
    const postCount = characterCard.querySelector(".post-count");
    if (characterName && postCount) {
      characterCard.insertBefore(imageContainer, postCount);
    } else {
      characterCard.appendChild(imageContainer);
    }

    this.tryLoadImage(String(imageUrl), image, imageContainer).catch(() => {
      if (imageContainer.parentNode) imageContainer.remove();
    });
  }

  tryLoadImage(imageUrl, image, imageContainer) {
    return new Promise((resolve, reject) => {
      const cachedStrategy =
        window.gameCache && typeof window.gameCache.getImageStrategy === "function"
          ? window.gameCache.getImageStrategy(imageUrl)
          : null;

      const corsProxies = [
        "https://corsproxy.io/?",
        "https://cors-anywhere.herokuapp.com/",
        "https://api.allorigins.win/raw?url=",
      ];

      let methodIndex = cachedStrategy !== null ? cachedStrategy : 0;
      const totalMethods = corsProxies.length + 1;

      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      const timeout = isMobile ? 5000 : 3000;

      const tryNext = () => {
        if (methodIndex >= totalMethods) {
          reject(new Error("All image loading options failed"));
          return;
        }

        let currentUrl;
        if (methodIndex === 0) {
          currentUrl = imageUrl;
        } else {
          const proxy = corsProxies[methodIndex - 1];
          currentUrl = proxy.includes("?url=")
            ? `${proxy}${encodeURIComponent(imageUrl)}`
            : `${proxy}${imageUrl}`;
        }

        this.loadImageDirectly(
          image,
          currentUrl,
          methodIndex,
          imageUrl,
          resolve,
          reject,
          () => {
            methodIndex++;
            tryNext();
          },
          timeout,
          imageContainer
        );
      };

      tryNext();
    });
  }

  loadImageDirectly(
    image,
    currentUrl,
    methodIndex,
    originalUrl,
    resolve,
    reject,
    tryNextOption,
    timeout,
    imageContainer
  ) {
    let settled = false;
    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
    };

    const timer = setTimeout(() => {
      if (settled) return;
      cleanup();
      tryNextOption();
    }, timeout);

    image.onload = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);

      if (image.naturalWidth > 1 && image.naturalHeight > 1) {
        image.classList.add("loaded");

        if (
          window.gameCache &&
          typeof window.gameCache.setImageStrategy === "function"
        ) {
          window.gameCache.setImageStrategy(originalUrl, methodIndex);
        }

        cleanup();
        resolve();
      } else {
        cleanup();
        tryNextOption();
      }
    };

    image.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();
      tryNextOption();
    };

    if (imageContainer) {
      imageContainer.classList.remove("loaded");
    }

    image.src = currentUrl;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new R34DailyGame();
});
