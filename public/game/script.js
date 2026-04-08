// Achievement system data
const ACHIEVEMENTS = {
  firstWin: {
    id: "firstWin",
    name: "First Victory",
    description: "Win your first round",
    icon: "🎯",
    rarity: "common",
    condition: (stats) => stats.totalWins >= 1,
  },
  streak5: {
    id: "streak5",
    name: "Hot Streak",
    description: "Get a 5-game winning streak",
    icon: "🔥",
    rarity: "common",
    condition: (stats) => stats.bestStreak >= 5,
  },
  streak10: {
    id: "streak10",
    name: "On Fire",
    description: "Get a 10-game winning streak",
    icon: "🔥🔥",
    rarity: "uncommon",
    condition: (stats) => stats.bestStreak >= 10,
  },
  streak25: {
    id: "streak25",
    name: "Unstoppable",
    description: "Get a 25-game winning streak",
    icon: "🌟",
    rarity: "rare",
    condition: (stats) => stats.bestStreak >= 25,
  },
  perfectionist: {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Get 10 perfect scores in a row",
    icon: "💎",
    rarity: "epic",
    condition: (stats) => stats.consecutivePerfectScores >= 10,
  },
  speedster: {
    id: "speedster",
    name: "Lightning Fast",
    description: "Answer correctly in under 2 seconds",
    icon: "⚡",
    rarity: "uncommon",
    condition: (stats) => stats.fastestTime > 0 && stats.fastestTime < 2000,
  },
  scholar: {
    id: "scholar",
    name: "Scholar",
    description: "Play 100 total rounds",
    icon: "📚",
    rarity: "rare",
    condition: (stats) => stats.totalRounds >= 100,
  },
  hardcoreGamer: {
    id: "hardcoreGamer",
    name: "Hardcore Gamer",
    description: "Win 10 rounds on Hard difficulty",
    icon: "💀",
    rarity: "epic",
    condition: (stats) => stats.hardWins >= 10,
  },
  scoreHunter: {
    id: "scoreHunter",
    name: "Score Hunter",
    description: "Reach 50,000 total score",
    icon: "💰",
    rarity: "rare",
    condition: (stats) => stats.totalScore >= 50000,
  },
  scoreMaster: {
    id: "scoreMaster",
    name: "Score Master",
    description: "Reach 200,000 total score",
    icon: "👑",
    rarity: "legendary",
    condition: (stats) => stats.totalScore >= 200000,
  },
  franchise: {
    id: "franchise",
    name: "Franchise Fan",
    description: "Win 5 rounds with franchise mode enabled",
    icon: "🎮",
    rarity: "uncommon",
    condition: (stats) => stats.franchiseWins >= 5,
  },
  dedication: {
    id: "dedication",
    name: "Dedicated Player",
    description: "Play for 7 consecutive days",
    icon: "📅",
    rarity: "epic",
    condition: (stats) => stats.consecutiveDays >= 7,
  },
};

// Mock data for offline testing
const MOCK_DATA = [
  {
    tag_name: "fluttershy",
    post_count: 15420,
    image_url:
      "https://static.wikia.nocookie.net/mlp/images/d/d6/Fluttershy_ID_S1E17.png",
    is_franchise: false,
  },
  {
    tag_name: "twilight_sparkle",
    post_count: 8765,
    image_url:
      "https://static.wikia.nocookie.net/mlp/images/b/b8/Twilight_Sparkle_ID_S4E01.png",
    is_franchise: false,
  },
  {
    tag_name: "renamon",
    post_count: 23145,
    image_url:
      "https://static.wikia.nocookie.net/digimon/images/f/f2/Renamon_b.jpg",
    is_franchise: false,
  },
  {
    tag_name: "princess_peach",
    post_count: 5432,
    image_url:
      "https://static.wikia.nocookie.net/mario/images/7/7c/Peach_Posing_Alt_3D_Artwork.png",
    is_franchise: false,
  },
  {
    tag_name: "gardevoir",
    post_count: 12890,
    image_url:
      "https://archives.bulbagarden.net/media/upload/thumb/f/f8/0282Gardevoir.png/1280px-0282Gardevoir.png",
    is_franchise: false,
  },
  {
    tag_name: "gamma_prototype",
    post_count: 7654,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "delta_experiment",
    post_count: 19876,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "epsilon_sample",
    post_count: 3421,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "zeta_specimen",
    post_count: 16543,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "theta_example",
    post_count: 9876,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "lambda_demo",
    post_count: 11234,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "omega_final",
    post_count: 4567,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "minecraft",
    post_count: 45000,
    image_url: null,
    is_franchise: true,
  },
  {
    tag_name: "one_piece",
    post_count: 32000,
    image_url: null,
    is_franchise: true,
  },
  {
    tag_name: "pokemon",
    post_count: 78000,
    image_url: null,
    is_franchise: true,
  },
  // Additional characters for better difficulty demonstration
  {
    tag_name: "sonic_the_hedgehog",
    post_count: 45000,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "lucario",
    post_count: 32000,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "bowser",
    post_count: 18000,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "krystal",
    post_count: 8500,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "isabelle",
    post_count: 6200,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "rouge_the_bat",
    post_count: 4100,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "cream_the_rabbit",
    post_count: 2800,
    image_url: null,
    is_franchise: false,
  },
  {
    tag_name: "tails",
    post_count: 1500,
    image_url: null,
    is_franchise: false,
  },
];

class R34HigherLowerGame {
  constructor() {
    this.currentStreak = 0;
    this.bestStreak = parseInt(localStorage.getItem("bestStreak")) || 300;
    this.leftCharacter = null;
    this.rightCharacter = null;
    this.gameActive = false;
    this.isAnimating = false;
    this.allCharacters = [];

    // Difficulty settings
    this.difficulty = localStorage.getItem("difficulty") || "medium";
    this.difficultyRanges = {
      easy: { min: 20000, max: Infinity }, // High post counts (easier to guess)
      medium: { min: 5000, max: 50000 }, // Medium post counts
      hard: { min: 0, max: 5000 }, // Low post counts (harder to guess)
    };

    // Scoring system
    this.currentScore = 0;
    this.totalScore = parseInt(localStorage.getItem("totalScore")) || 0;
    this.roundStartTime = 0;
    this.consecutiveCorrect = 0;
    this.difficultyMultipliers = {
      easy: 1,
      medium: 1.5,
      hard: 2.5,
    };

    // Achievement system
    this.achievements = JSON.parse(localStorage.getItem("achievements")) || {};
    this.stats = JSON.parse(localStorage.getItem("gameStats")) || {
      totalWins: 0,
      totalRounds: 0,
      fastestTime: 0,
      consecutivePerfectScores: 0,
      hardWins: 0,
      franchiseWins: 0,
      consecutiveDays: 0,
      lastPlayDate: null,
      perfectScoreStreak: 0,
    };
    this.newAchievements = []; // Track new achievements earned this session

    this.initializeElements();
    this.initializeReportProblem();
    this.updateStreakDisplay();
    this.checkDailyPlay();
    this.startGame();
  }

  checkDailyPlay() {
    const today = new Date().toDateString();
    const lastPlayDate = this.stats.lastPlayDate;

    if (lastPlayDate) {
      const lastDate = new Date(lastPlayDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor(
        (todayDate - lastDate) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        this.stats.consecutiveDays++;
      } else if (daysDiff > 1) {
        this.stats.consecutiveDays = 1;
      }
    } else {
      this.stats.consecutiveDays = 1;
    }

    this.stats.lastPlayDate = today;
    this.saveStats();
  }

  saveStats() {
    localStorage.setItem("gameStats", JSON.stringify(this.stats));
  }

  saveAchievements() {
    localStorage.setItem("achievements", JSON.stringify(this.achievements));
  }

  checkAchievements() {
    const newUnlocked = [];

    for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
      if (!this.achievements[id] && achievement.condition(this.stats)) {
        this.achievements[id] = {
          unlockedAt: Date.now(),
          ...achievement,
        };
        newUnlocked.push(achievement);
      }
    }

    if (newUnlocked.length > 0) {
      this.saveAchievements();
      this.showAchievementNotifications(newUnlocked);
    }
  }

  showAchievementNotifications(achievements) {
    achievements.forEach((achievement, index) => {
      setTimeout(() => {
        this.showAchievementNotification(achievement);
      }, index * 1000); // Stagger notifications by 1 second
    });
  }

  showAchievementNotification(achievement) {
    const notification = document.getElementById("achievement-notification");
    const icon = notification.querySelector(".achievement-icon");
    const name = notification.querySelector(".achievement-name");
    const description = notification.querySelector(".achievement-description");

    icon.textContent = achievement.icon;
    name.textContent = achievement.name;
    description.textContent = achievement.description;

    notification.style.display = "block";

    // Hide after 5 seconds
    setTimeout(() => {
      notification.style.display = "none";
    }, 5000);
  }

  openAchievements() {
    this.populateAchievements();
    document.getElementById("achievements-popup").style.display = "flex";
  }

  closeAchievements() {
    document.getElementById("achievements-popup").style.display = "none";
  }

  populateAchievements() {
    const grid = document.getElementById("achievements-grid");
    const count = document.getElementById("achievement-count");

    const unlockedCount = Object.keys(this.achievements).length;
    const totalCount = Object.keys(ACHIEVEMENTS).length;
    count.textContent = `${unlockedCount}/${totalCount}`;

    grid.innerHTML = "";

    Object.entries(ACHIEVEMENTS).forEach(([id, achievement]) => {
      const isUnlocked = this.achievements[id];
      const item = document.createElement("div");
      item.className = `achievement-item ${isUnlocked ? "unlocked" : "locked"}`;

      item.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-details">
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-description">${achievement.description}</div>
        </div>
        <div class="achievement-rarity ${achievement.rarity}">${achievement.rarity}</div>
      `;

      grid.appendChild(item);
    });
  }

  initializeElements() {
    this.elements = {
      loading: document.getElementById("loading"),
      gameContent: document.getElementById("game-content"),
      errorMessage: document.getElementById("error-message"),
      resultOverlay: document.getElementById("result-overlay"),

      leftCharacter: document.getElementById("left-character"),
      leftCountDisplay: document.getElementById("left-count-display"),
      leftCountDisplay2: document.getElementById("left-count-display2"),
      leftCharacterCard: document.querySelector(
        ".character-container.left .character-card"
      ),
      leftNotes: document.getElementById("left-character-notes"),

      rightCharacter: document.getElementById("right-character"),
      rightCount: document.getElementById("right-count"),
      rightCountContainer: document.getElementById("right-count-container"),
      rightCharacterCard: document.querySelector(
        ".character-container.right .character-card"
      ),
      rightNotes: document.getElementById("right-character-notes"),

      // How to Play popup elements
      howToPlayBtn: document.getElementById("how-to-play-btn"),
      howToPlayPopup: document.getElementById("how-to-play-popup"),
      closePopupBtn: document.getElementById("close-popup"),
      gotItBtn: document.getElementById("got-it-btn"),

      resultText: document.getElementById("result-text"),
      resultStats: document.getElementById("result-stats"),
      nextBtn: document.getElementById("next-btn"),
      retryBtn: document.getElementById("retry-btn"),

      streak: document.getElementById("streak"),
      bestStreak: document.getElementById("best-streak"),
      bestStreakResult: document.getElementById("best-streak-result"),

      // Score elements
      currentScore: document.getElementById("current-score"),
      totalScore: document.getElementById("total-score"),
      roundScore: document.getElementById("round-score"),
      timeTaken: document.getElementById("time-taken"),
      resultTotalScore: document.getElementById("result-total-score"),

      // Franchise toggle
      franchiseToggle: document.getElementById("franchise-toggle"),

      // Difficulty selector
      difficultySelect: document.getElementById("difficulty-select"),
      difficultyDisplay: document.getElementById("difficulty-display"),
    };

    // Event listeners for clickable character cards
    this.elements.leftCharacterCard.addEventListener("click", () =>
      this.makeGuess("left")
    );
    this.elements.rightCharacterCard.addEventListener("click", () =>
      this.makeGuess("right")
    );

    this.elements.nextBtn.addEventListener("click", () => this.nextRound());
    this.elements.retryBtn.addEventListener("click", () => this.startGame());
    this.elements.howToPlayBtn.addEventListener("click", () =>
      this.openHowToPlay()
    );
    this.elements.closePopupBtn.addEventListener("click", () =>
      this.closeHowToPlay()
    );
    this.elements.gotItBtn.addEventListener("click", () =>
      this.closeHowToPlay()
    );

    // Franchise toggle event listener
    this.elements.franchiseToggle.addEventListener("change", () => {
      this.onFranchiseToggleChange();
    });

    // Difficulty selector event listener
    this.elements.difficultySelect.value = this.difficulty;
    this.elements.difficultySelect.addEventListener("change", () => {
      this.onDifficultyChange();
    });

    // Update difficulty display
    this.updateDifficultyDisplay();

    // Franchise info popup event listeners
    const franchiseInfoBtn = document.getElementById("franchise-info-btn");
    const franchiseInfoPopup = document.getElementById("franchise-info-popup");
    const closeFranchiseInfoBtn = document.getElementById(
      "close-franchise-info"
    );
    const franchiseInfoGotItBtn = document.getElementById(
      "franchise-info-got-it"
    );

    franchiseInfoBtn.addEventListener("click", () => this.openFranchiseInfo());
    closeFranchiseInfoBtn.addEventListener("click", () =>
      this.closeFranchiseInfo()
    );
    franchiseInfoGotItBtn.addEventListener("click", () =>
      this.closeFranchiseInfo()
    );

    // Close franchise info when clicking outside
    franchiseInfoPopup.addEventListener("click", (e) => {
      if (e.target === franchiseInfoPopup) {
        this.closeFranchiseInfo();
      }
    });

    // Changelog popup event listeners
    const changelogBtn = document.getElementById("changelog-btn");
    const changelogPopup = document.getElementById("changelog-popup");
    const closeChangelogBtn = document.getElementById("close-changelog-popup");
    const closeChangelogFooterBtn = document.getElementById(
      "close-changelog-btn"
    );

    if (changelogBtn) {
      changelogBtn.addEventListener("click", () => this.openChangelog());
    }
    if (closeChangelogBtn) {
      closeChangelogBtn.addEventListener("click", () => this.closeChangelog());
    }
    if (closeChangelogFooterBtn) {
      closeChangelogFooterBtn.addEventListener("click", () =>
        this.closeChangelog()
      );
    }

    // Close changelog when clicking outside
    if (changelogPopup) {
      changelogPopup.addEventListener("click", (e) => {
        if (e.target === changelogPopup) {
          this.closeChangelog();
        }
      });
    }

    // Achievements popup event listeners
    const achievementsBtn = document.getElementById("achievements-btn");
    const achievementsPopup = document.getElementById("achievements-popup");
    const closeAchievementsBtn = document.getElementById(
      "close-achievements-popup"
    );
    const closeAchievementsFooterBtn = document.getElementById(
      "close-achievements-btn"
    );

    if (achievementsBtn) {
      achievementsBtn.addEventListener("click", () => this.openAchievements());
    }
    if (closeAchievementsBtn) {
      closeAchievementsBtn.addEventListener("click", () =>
        this.closeAchievements()
      );
    }
    if (closeAchievementsFooterBtn) {
      closeAchievementsFooterBtn.addEventListener("click", () =>
        this.closeAchievements()
      );
    }

    // Close achievements when clicking outside
    if (achievementsPopup) {
      achievementsPopup.addEventListener("click", (e) => {
        if (e.target === achievementsPopup) {
          this.closeAchievements();
        }
      });
    }

    // Close popup when clicking outside of it
    this.elements.howToPlayPopup.addEventListener("click", (e) => {
      if (e.target === this.elements.howToPlayPopup) {
        this.closeHowToPlay();
      }
    });

    // Add touch gesture support for mobile
    this.initTouchGestures();
  }

  initTouchGestures() {
    let touchStartX = null;
    let touchStartY = null;
    let touchStartTime = null;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    // Touch events for left character card
    this.elements.leftCharacterCard.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        e.preventDefault();
      },
      { passive: false }
    );

    this.elements.leftCharacterCard.addEventListener(
      "touchend",
      (e) => {
        if (touchStartX === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaTime = touchEndTime - touchStartTime;

        // Check for swipe gestures
        if (
          deltaTime < maxSwipeTime &&
          Math.abs(deltaX) > minSwipeDistance &&
          Math.abs(deltaX) > Math.abs(deltaY)
        ) {
          if (deltaX > 0) {
            // Swipe right - select this character
            this.makeGuess("left");
          }
        } else if (
          deltaTime < maxSwipeTime &&
          Math.abs(deltaY) < minSwipeDistance &&
          Math.abs(deltaX) < minSwipeDistance
        ) {
          // Tap - select this character
          this.makeGuess("left");
        }

        touchStartX = null;
        touchStartY = null;
        touchStartTime = null;
        e.preventDefault();
      },
      { passive: false }
    );

    // Touch events for right character card
    this.elements.rightCharacterCard.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        e.preventDefault();
      },
      { passive: false }
    );

    this.elements.rightCharacterCard.addEventListener(
      "touchend",
      (e) => {
        if (touchStartX === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaTime = touchEndTime - touchStartTime;

        // Check for swipe gestures
        if (
          deltaTime < maxSwipeTime &&
          Math.abs(deltaX) > minSwipeDistance &&
          Math.abs(deltaX) > Math.abs(deltaY)
        ) {
          if (deltaX < 0) {
            // Swipe left - select this character
            this.makeGuess("right");
          }
        } else if (
          deltaTime < maxSwipeTime &&
          Math.abs(deltaY) < minSwipeDistance &&
          Math.abs(deltaX) < minSwipeDistance
        ) {
          // Tap - select this character
          this.makeGuess("right");
        }

        touchStartX = null;
        touchStartY = null;
        touchStartTime = null;
        e.preventDefault();
      },
      { passive: false }
    );

    // Prevent default touch behavior on character cards to avoid scrolling issues
    [this.elements.leftCharacterCard, this.elements.rightCharacterCard].forEach(
      (card) => {
        card.addEventListener(
          "touchmove",
          (e) => {
            e.preventDefault();
          },
          { passive: false }
        );
      }
    );
  }

  updateStreakDisplay() {
    this.elements.streak.textContent = this.currentStreak;
    this.elements.bestStreak.textContent = this.bestStreak;
    this.elements.currentScore.textContent = this.currentScore.toLocaleString();
    this.elements.totalScore.textContent = this.totalScore.toLocaleString();
  }

  updateDifficultyDisplay() {
    if (this.elements.difficultyDisplay) {
      const difficultyNames = {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      };
      this.elements.difficultyDisplay.textContent =
        difficultyNames[this.difficulty];
      this.elements.difficultyDisplay.className = `difficulty-value ${this.difficulty}`;
    }
  }

  calculateScore(timeTaken, isCorrect) {
    if (!isCorrect) {
      this.consecutiveCorrect = 0;
      return 0;
    }

    // Base score
    let score = 100;

    // Difficulty multiplier
    score *= this.difficultyMultipliers[this.difficulty];

    // Time bonus (faster = more points, max 50% bonus)
    const maxTimeForBonus = 10000; // 10 seconds
    const timeBonus = Math.max(
      0,
      ((maxTimeForBonus - timeTaken) / maxTimeForBonus) * 0.5
    );
    score *= 1 + timeBonus;

    // Consecutive correct bonus (up to 100% bonus after 10 consecutive)
    this.consecutiveCorrect++;
    const consecutiveBonus = Math.min(1, this.consecutiveCorrect / 10);
    score *= 1 + consecutiveBonus;

    // Character difficulty bonus (closer post counts = harder = more points)
    const leftCount = this.leftCharacter.count;
    const rightCount = this.rightCharacter.count;
    const difference = Math.abs(leftCount - rightCount);
    const averageCount = (leftCount + rightCount) / 2;
    const difficultyRatio = 1 - Math.min(1, difference / averageCount);
    const characterDifficultyBonus = difficultyRatio * 0.5;
    score *= 1 + characterDifficultyBonus;

    return Math.round(score);
  }

  async startGame() {
    // Reset game state completely
    this.leftCharacter = null;
    this.rightCharacter = null;
    this.gameActive = false;
    this.isAnimating = false;

    // Reset current session score but keep total score
    this.currentScore = 0;
    this.consecutiveCorrect = 0;

    // Hide result overlay immediately
    this.elements.resultOverlay.style.display = "none";

    // Update display
    this.updateStreakDisplay();

    this.showLoading();
    try {
      // Fetch all characters from our secure API endpoint
      await this.loadCharactersFromAPI();
      // Get initial character for left side
      this.leftCharacter = this.getSpecificCharacter();
      // Load the first round
      this.loadNewRound();
    } catch (error) {
      console.error("Failed to start game:", error);
      this.showError();
    }
  }

  async loadCharactersFromAPI() {
    console.log("Loading characters from cache or API...");
    try {
      // Get the current state of the franchise toggle
      const includeFranchises = this.elements.franchiseToggle.checked;

      // Use cache manager to get character data
      this.allCharacters = await window.gameCache.getCharacterData(
        includeFranchises
      );
    } catch (error) {
      console.error("Error fetching characters from API:", error);
      // Fallback to mock data and apply franchise filter
      const includeFranchises = this.elements.franchiseToggle.checked;
      if (includeFranchises) {
        this.allCharacters = MOCK_DATA;
      } else {
        this.allCharacters = MOCK_DATA.filter(
          (char) => char.is_franchise === false
        );
      }
      console.log(
        `Loaded ${this.allCharacters.length} characters from mock data. Include franchises: ${includeFranchises}`
      );
    }
  }

  loadNewRound() {
    console.log("loadNewRound started");
    this.gameActive = false;

    // Start timing for score calculation
    this.roundStartTime = Date.now();

    try {
      console.log("Getting right character...");
      // Get new character for right side
      this.rightCharacter = this.getSpecificCharacter();
      console.log("Got right character:", this.rightCharacter);

      // Make sure we don't get the same character
      let attempts = 0;
      while (
        this.rightCharacter.rawName === this.leftCharacter.rawName &&
        attempts < 5
      ) {
        console.log(
          `Same character detected, getting different one (attempt ${
            attempts + 1
          })`
        );
        this.rightCharacter = this.getSpecificCharacter();
        attempts++;
      }

      console.log("About to call displayCharacters...");
      this.displayCharacters();
      this.gameActive = true;
      console.log("loadNewRound completed successfully");
    } catch (error) {
      console.error("Failed to load new round:", error);
      this.showError();
    }
  }

  getSpecificCharacter() {
    // Filter characters based on current difficulty
    const difficultyRange = this.difficultyRanges[this.difficulty];
    const filteredCharacters = this.allCharacters.filter((char) => {
      return (
        char.post_count >= difficultyRange.min &&
        char.post_count <= difficultyRange.max
      );
    });

    // If no characters match the difficulty range, fall back to all characters
    const availableCharacters =
      filteredCharacters.length > 0 ? filteredCharacters : this.allCharacters;

    // Pick a random character from the filtered list
    const randomCharacter =
      availableCharacters[
        Math.floor(Math.random() * availableCharacters.length)
      ];
    console.log(
      `Selected character (${this.difficulty}): ${randomCharacter.tag_name} (${randomCharacter.post_count} posts)`
    );

    return {
      name: this.formatCharacterName(randomCharacter.tag_name),
      rawName: randomCharacter.tag_name,
      count: randomCharacter.post_count,
      imageUrl: randomCharacter.image_url,
      notes: randomCharacter.note || null,
    };
  }

  formatCharacterName(name) {
    if (typeof name !== "string") {
      console.warn("Invalid character name:", name);
      return "Unknown Character";
    }
    return name
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  }

  displayCharacters() {
    console.log("displayCharacters called with:", {
      leftCharacter: this.leftCharacter,
      rightCharacter: this.rightCharacter,
    });

    // Hide loading and show game content
    this.elements.loading.style.display = "none";
    this.elements.gameContent.style.display = "flex";

    // Display left character
    this.elements.leftCharacter.textContent = this.leftCharacter.name;
    if (this.elements.leftNotes) {
      const note = this.leftCharacter.notes;
      if (note && String(note).trim() !== "") {
        this.elements.leftNotes.textContent = note;
        this.elements.leftNotes.style.display = "block";
      } else {
        this.elements.leftNotes.textContent = "";
        this.elements.leftNotes.style.display = "none";
      }
    }
    this.elements.leftCountDisplay.textContent =
      this.leftCharacter.count.toLocaleString();
    if (this.elements.leftCountDisplay2) {
      this.elements.leftCountDisplay2.textContent =
        this.leftCharacter.count.toLocaleString();
    }

    // Display/update left character image
    this.updateCharacterImage(
      this.elements.leftCharacterCard,
      this.leftCharacter.imageUrl
    );

    // Display right character (count hidden)
    this.elements.rightCharacter.textContent = this.rightCharacter.name;
    if (this.elements.rightNotes) {
      const note = this.rightCharacter.notes;
      if (note && String(note).trim() !== "") {
        this.elements.rightNotes.textContent = note;
        this.elements.rightNotes.style.display = "block";
      } else {
        this.elements.rightNotes.textContent = "";
        this.elements.rightNotes.style.display = "none";
      }
    }
    this.elements.rightCountContainer.classList.add("hidden");

    // Display/update right character image
    this.updateCharacterImage(
      this.elements.rightCharacterCard,
      this.rightCharacter.imageUrl
    );

    // Show the question mark for the right character
    const questionMark = document.querySelector(".question-mark");
    if (questionMark) {
      questionMark.style.display = "block";
    }

    console.log("displayCharacters completed - game should be visible now");
  }

  updateCharacterImage(characterCard, imageUrl) {
    // Remove any existing character image container
    const existingImageContainer = characterCard.querySelector(
      ".character-image-container"
    );
    if (existingImageContainer) {
      existingImageContainer.remove();
    }

    // Only add image if URL exists and is not null
    if (imageUrl && imageUrl.trim() !== "") {
      const imageContainer = document.createElement("div");
      imageContainer.className = "character-image-container";

      const image = document.createElement("img");
      image.className = "character-image";
      // Reduce hotlink/referrer issues
      try {
        image.referrerPolicy = "no-referrer";
      } catch (_) {}

      const tryLoadImage = (imageUrl, image) => {
        return new Promise((resolve, reject) => {
          // Check if we have a cached successful strategy for this image
          const cachedStrategy = window.gameCache.getImageStrategy(imageUrl);

          const corsProxies = [
            "https://corsproxy.io/?",
            "https://cors-anywhere.herokuapp.com/",
            "https://api.allorigins.win/raw?url=",
          ];

          let methodIndex = cachedStrategy !== null ? cachedStrategy : 0;
          const totalMethods = corsProxies.length + 1;

          // Increase timeout on mobile devices
          const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
            navigator.userAgent
          );
          const timeout = isMobile ? 5000 : 3000;

          const tryNextOption = () => {
            if (methodIndex >= totalMethods) {
              console.warn("All image loading options failed for:", imageUrl);
              reject(new Error("All image loading options failed"));
              return;
            }

            let currentUrl;
            if (methodIndex === 0) {
              currentUrl = imageUrl;
              console.log("Attempting direct load:", currentUrl);
            } else {
              const proxy = corsProxies[methodIndex - 1];
              currentUrl = proxy.includes("?url=")
                ? `${proxy}${encodeURIComponent(imageUrl)}`
                : `${proxy}${imageUrl}`;
              console.log(`Attempting proxy ${methodIndex} load:`, currentUrl);
            }

            // Directly attempt to load the image without HEAD preflight
            this.loadImageDirectly(
              image,
              currentUrl,
              methodIndex,
              imageUrl,
              resolve,
              reject,
              tryNextOption,
              timeout
            );
          };

          tryNextOption();
        });
      };

      // Use optimized image loading strategy
      tryLoadImage(imageUrl, image).catch(() => {
        console.warn("Image failed to load with all methods:", imageUrl);
        if (imageContainer.parentNode) {
          imageContainer.remove();
        }
      });

      imageContainer.appendChild(image);

      // Insert the image container after the character name but before the post count
      const characterName = characterCard.querySelector("h2");
      const postCount = characterCard.querySelector(".post-count");

      if (characterName && postCount) {
        characterCard.insertBefore(imageContainer, postCount);
      } else {
        characterCard.appendChild(imageContainer);
      }
    }
  }

  loadImageDirectly(
    image,
    currentUrl,
    methodIndex,
    originalUrl,
    resolve,
    reject,
    tryNextOption,
    timeout
  ) {
    let settled = false;
    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
    };

    const timer = setTimeout(() => {
      if (settled) return;
      console.warn(`Image load timeout for method ${methodIndex}:`, currentUrl);
      cleanup();
      // Advance to next method
      methodIndex++;
      tryNextOption();
    }, timeout);

    image.onload = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (image.naturalWidth > 1 && image.naturalHeight > 1) {
        image.classList.add("loaded");
        console.log(
          `Image loaded successfully with method ${methodIndex}:`,
          currentUrl
        );

        // Cache the successful strategy
        window.gameCache.setImageStrategy(originalUrl, methodIndex);

        cleanup();
        resolve();
      } else {
        console.warn(
          `Image has invalid dimensions for method ${methodIndex}:`,
          currentUrl
        );
        cleanup();
        methodIndex++;
        tryNextOption();
      }
    };

    image.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      console.warn(
        `Image failed to load with method ${methodIndex}:`,
        currentUrl
      );
      cleanup();
      methodIndex++;
      tryNextOption();
    };

    // Start the load
    image.src = currentUrl;
  }

  async makeGuess(guess) {
    if (!this.gameActive || this.isAnimating) return;

    this.gameActive = false;
    this.isAnimating = true;

    // Calculate time taken for this round
    const timeTaken = Date.now() - this.roundStartTime;

    // Hide question mark
    const questionMark = document.querySelector(".question-mark");
    if (questionMark) {
      questionMark.style.display = "none";
    }

    const isCorrect = this.checkGuess(guess);

    // Calculate and add score
    const roundScore = this.calculateScore(timeTaken, isCorrect);
    this.currentScore += roundScore;
    this.totalScore += roundScore;

    // Save total score to localStorage
    localStorage.setItem("totalScore", this.totalScore.toString());

    // Store for result display
    this.lastRoundScore = roundScore;
    this.lastTimeTaken = timeTaken;

    await this.revealResult(isCorrect);
  }

  checkGuess(guess) {
    // New logic: if user clicked left, they think left has more posts
    // if user clicked right, they think right has more posts
    if (guess === "left") {
      return this.leftCharacter.count >= this.rightCharacter.count;
    } else if (guess === "right") {
      return this.rightCharacter.count >= this.leftCharacter.count;
    }
    return false;
  }

  async revealResult(isCorrect) {
    // Add visual feedback to character cards
    if (isCorrect) {
      this.elements.rightCharacterCard.classList.add("correct-answer");
      // Remove animation class after animation completes
      setTimeout(() => {
        this.elements.rightCharacterCard.classList.remove("correct-answer");
      }, 600);
    } else {
      this.elements.rightCharacterCard.classList.add("wrong-answer");
      setTimeout(() => {
        this.elements.rightCharacterCard.classList.remove("wrong-answer");
      }, 600);
    }

    // Show the right character's count with smooth animation
    await this.animateCountReveal();

    // Wait a moment for the count animation to complete
    await this.delay(500);

    // Update stats and check achievements
    this.updateStatsAndAchievements(isCorrect);

    if (isCorrect) {
      this.currentStreak++;
      if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
        localStorage.setItem("bestStreak", this.bestStreak.toString());

        // Celebrate new best streak
        this.createCelebrationParticles();
      }

      // Celebrate milestone streaks
      if (this.currentStreak % 10 === 0 && this.currentStreak > 0) {
        this.createCelebrationParticles();
      }

      this.updateStreakDisplay();

      // Auto-start next round after a brief delay
      await this.delay(1500);
      this.nextRound();
    } else {
      this.showResultOverlay("Wrong! Game Over", "incorrect", false);

      // Submit final streak to server for daily record keeping
      // Do not await to keep UI responsive
      this.submitMainHighscore(this.currentStreak).catch((err) => {
        console.error("Failed to submit main highscore:", err);
      });

      this.currentStreak = 0;
      this.updateStreakDisplay();
    }

    this.isAnimating = false;
  }

  updateStatsAndAchievements(isCorrect) {
    // Update basic stats
    this.stats.totalRounds++;

    if (isCorrect) {
      this.stats.totalWins++;

      // Track difficulty-specific wins
      if (this.difficulty === "hard") {
        this.stats.hardWins = (this.stats.hardWins || 0) + 1;
      }

      // Track franchise wins
      if (this.elements.franchiseToggle.checked) {
        this.stats.franchiseWins = (this.stats.franchiseWins || 0) + 1;
      }

      // Track fastest time
      if (this.lastTimeTaken > 0) {
        if (
          !this.stats.fastestTime ||
          this.lastTimeTaken < this.stats.fastestTime
        ) {
          this.stats.fastestTime = this.lastTimeTaken;
        }
      }

      // Track perfect scores (high score rounds)
      const maxScore = this.calculateScore(1000, true); // Max possible score
      if (this.lastRoundScore >= maxScore * 0.9) {
        // 90% of max score
        this.stats.perfectScoreStreak =
          (this.stats.perfectScoreStreak || 0) + 1;
        this.stats.consecutivePerfectScores = Math.max(
          this.stats.consecutivePerfectScores || 0,
          this.stats.perfectScoreStreak
        );
      } else {
        this.stats.perfectScoreStreak = 0;
      }
    } else {
      this.stats.perfectScoreStreak = 0;
    }

    // Update best streak in stats
    this.stats.bestStreak = this.bestStreak;
    this.stats.totalScore = this.totalScore;

    // Save stats and check achievements
    this.saveStats();
    this.checkAchievements();
  }

  async animateCountReveal() {
    const countElement = this.elements.rightCount;
    const targetCount = this.rightCharacter.count;

    // Show the container with revealing animation
    this.elements.rightCountContainer.classList.remove("hidden");
    this.elements.rightCountContainer.classList.add("revealing");
    this.elements.rightCountContainer.style.display = "block";

    // Wait for reveal animation to start
    await this.delay(300);

    // Start count animation
    if (countElement) {
      countElement.classList.add("counting");

      // Animate the count from 0 to target with easing
      const duration = 1200; // ms
      const steps = 80;
      let currentCount = 0;

      for (let i = 0; i <= steps; i++) {
        await this.delay(duration / steps);

        // Use easing function for more natural counting
        const progress = i / steps;
        const easedProgress = this.easeOutQuart(progress);
        currentCount = Math.floor(targetCount * easedProgress);

        countElement.textContent = currentCount.toLocaleString();
      }

      // Ensure we show the exact final count
      countElement.textContent = targetCount.toLocaleString();

      // Remove animation classes after a delay
      setTimeout(() => {
        countElement.classList.remove("counting");
        this.elements.rightCountContainer.classList.remove("revealing");
      }, 200);
    }
  }

  // Easing function for smooth count animation
  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  // Create celebration particles for milestones
  createCelebrationParticles() {
    const container = document.createElement("div");
    container.className = "celebration-particles";
    document.body.appendChild(container);

    // Create 50 particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random horizontal position
      particle.style.left = Math.random() * 100 + "%";

      // Random animation delay
      particle.style.animationDelay = Math.random() * 2 + "s";

      // Random size variation
      const size = 4 + Math.random() * 8;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      container.appendChild(particle);
    }

    // Remove container after animation
    setTimeout(() => {
      document.body.removeChild(container);
    }, 5000);
  }

  showResultOverlay(text, className, showNext) {
    this.elements.resultText.textContent = text;
    this.elements.resultText.className = `result-text ${className}`;

    if (showNext) {
      this.elements.nextBtn.style.display = "inline-block";
      this.elements.retryBtn.style.display = "none";
    } else {
      this.elements.nextBtn.style.display = "none";
      this.elements.retryBtn.style.display = "inline-block";
    }

    // Update stats in the overlay
    document.getElementById("current-streak").textContent = this.currentStreak;
    if (this.elements.bestStreakResult) {
      this.elements.bestStreakResult.textContent = this.bestStreak;
    }

    // Update score information
    if (this.elements.roundScore) {
      this.elements.roundScore.textContent =
        this.lastRoundScore?.toLocaleString() || "0";
    }
    if (this.elements.timeTaken && this.lastTimeTaken) {
      this.elements.timeTaken.textContent = `${(
        this.lastTimeTaken / 1000
      ).toFixed(1)}s`;
    }
    if (this.elements.resultTotalScore) {
      this.elements.resultTotalScore.textContent =
        this.totalScore.toLocaleString();
    }

    // Show overlay with animation
    this.elements.resultOverlay.style.display = "block";
    // Force reflow
    this.elements.resultOverlay.offsetHeight;
    // Add show class for animation
    this.elements.resultOverlay.classList.add("show");
  }

  nextRound() {
    // Hide overlay with animation
    this.elements.resultOverlay.classList.remove("show");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.elements.resultOverlay.style.display = "none";
    }, 400);

    // Move right character to left for next round
    this.leftCharacter = this.rightCharacter;

    // Get the next character
    this.loadNewRound();
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  closeHowToPlay() {
    this.elements.howToPlayPopup.style.display = "none";
  }

  openHowToPlay() {
    this.elements.howToPlayPopup.style.display = "flex";
  }

  openChangelog() {
    document.getElementById("changelog-popup").style.display = "flex";
  }

  closeChangelog() {
    document.getElementById("changelog-popup").style.display = "none";
  }

  openFranchiseInfo() {
    document.getElementById("franchise-info-popup").style.display = "flex";
  }

  closeFranchiseInfo() {
    document.getElementById("franchise-info-popup").style.display = "none";
  }

  // Report Problem functionality
  initializeReportProblem() {
    const reportBtn = document.getElementById("report-problem-btn");
    const reportPopup = document.getElementById("report-problem-popup");
    const closeReportBtn = document.getElementById("close-report-popup");
    const cancelReportBtn = document.getElementById("cancel-report");
    const reportForm = document.getElementById("report-form");

    // Open report popup
    reportBtn.addEventListener("click", () => {
      reportPopup.style.display = "flex";
    });

    // Close report popup
    const closeReport = () => {
      reportPopup.style.display = "none";
      this.resetReportForm();
    };

    closeReportBtn.addEventListener("click", closeReport);
    cancelReportBtn.addEventListener("click", closeReport);

    // Close when clicking outside
    reportPopup.addEventListener("click", (e) => {
      if (e.target === reportPopup) {
        closeReport();
      }
    });

    // Handle form submission
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitReport();
    });
  }

  resetReportForm() {
    document.getElementById("report-title").value = "";
    document.getElementById("report-contact").value = "";
    document.getElementById("report-description").value = "";
    const status = document.getElementById("report-status");
    status.style.display = "none";
    status.className = "report-status";
  }

  async submitReport() {
    const title = document.getElementById("report-title").value.trim();
    const contact = document.getElementById("report-contact").value.trim();
    const description = document
      .getElementById("report-description")
      .value.trim();
    const statusDiv = document.getElementById("report-status");
    const submitBtn = document.getElementById("submit-report");

    // Validate required fields
    if (!title || !description) {
      this.showReportStatus("Please fill in all required fields.", "error");
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    this.showReportStatus("Sending report...", "loading");

    try {
      // Send to our secure API endpoint
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          contact: contact || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        this.showReportStatus(
          "Report submitted successfully! Thank you for your feedback.",
          "success"
        );
        setTimeout(() => {
          document.getElementById("report-problem-popup").style.display =
            "none";
          this.resetReportForm();
        }, 3000);
      } else {
        throw new Error(result.error || "Failed to submit report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      this.showReportStatus(
        "Failed to submit report. Please try again later.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Report";
    }
  }

  showReportStatus(message, type) {
    const statusDiv = document.getElementById("report-status");
    statusDiv.textContent = message;
    statusDiv.className = `report-status ${type}`;
    statusDiv.style.display = "block";
  }

  onFranchiseToggleChange() {
    console.log(
      "Franchise toggle changed:",
      this.elements.franchiseToggle.checked
    );

    // Reset streak and scoring when changing filter
    this.currentStreak = 0;
    this.currentScore = 0;
    this.consecutiveCorrect = 0;
    this.updateStreakDisplay();

    // Restart game with new character filtering
    this.startGame();
  }

  onDifficultyChange() {
    this.difficulty = this.elements.difficultySelect.value;
    localStorage.setItem("difficulty", this.difficulty);

    console.log("Difficulty changed to:", this.difficulty);

    // Update difficulty display
    this.updateDifficultyDisplay();

    // Reset streak and scoring when changing difficulty
    this.currentStreak = 0;
    this.currentScore = 0;
    this.consecutiveCorrect = 0;
    this.updateStreakDisplay();

    // Restart game with new difficulty
    this.startGame();
  }

  // Submit the player's final streak to server; server compares and updates if needed
  async submitMainHighscore(streak) {
    // Highscore feature disabled to reduce function invocations.
    // Intentionally no-op.
    return;
  }
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const game = new R34HigherLowerGame();
});
