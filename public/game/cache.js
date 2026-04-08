// Client-side cache manager to reduce API requests
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
    this.IMAGE_STRATEGY_CACHE_KEY = "imageStrategies";
    this.CHARACTER_DATA_KEY = "characterData";
    this.LAST_CACHE_DAY_KEY = "lastCacheDay";

    // Check if we need to clear cache for new day
    this.checkAndClearDailyCache();
  }

  // Get current UTC date string
  getCurrentUTCDateString() {
    const now = new Date();
    return (
      now.getUTCFullYear() +
      "-" +
      String(now.getUTCMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getUTCDate()).padStart(2, "0")
    );
  }

  // Check if it's a new UTC day and clear cache if needed
  checkAndClearDailyCache() {
    try {
      const currentDate = this.getCurrentUTCDateString();
      const lastCacheDay = localStorage.getItem(this.LAST_CACHE_DAY_KEY);

      if (lastCacheDay && lastCacheDay !== currentDate) {
        console.log("New UTC day detected, clearing cache...", {
          lastCacheDay,
          currentDate,
        });
        this.clearAllCacheData();
      }

      localStorage.setItem(this.LAST_CACHE_DAY_KEY, currentDate);
    } catch (e) {
      console.warn("Failed to check daily cache reset:", e);
    }
  }

  // Clear all cache data
  clearAllCacheData() {
    this.cache.clear();
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("cache_")) {
          localStorage.removeItem(key);
        }
      });
      console.log("Daily cache cleared successfully");
    } catch (e) {
      console.warn("Failed to clear localStorage cache:", e);
    }
  }

  // Set data with expiration
  set(key, data, customTTL = null) {
    const ttl = customTTL || this.CACHE_DURATION;
    const expiry = Date.now() + ttl;

    this.cache.set(key, { data, expiry });

    try {
      localStorage.setItem(
        `cache_${key}`,
        JSON.stringify({ data, expiry })
      );
    } catch (e) {
      console.warn("Failed to persist cache to localStorage:", e);
    }
  }

  // Get data if not expired
  get(key) {
    let cached = this.cache.get(key);

    if (!cached) {
      try {
        const stored = localStorage.getItem(`cache_${key}`);
        if (stored) {
          cached = JSON.parse(stored);
          if (cached && cached.expiry > Date.now()) {
            this.cache.set(key, cached);
          } else {
            localStorage.removeItem(`cache_${key}`);
            cached = null;
          }
        }
      } catch (e) {
        console.warn("Failed to read cache from localStorage:", e);
      }
    }

    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    this.cache.delete(key);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (e) {}

    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear(key) {
    this.cache.delete(key);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (e) {}
  }

  clearAll() {
    this.cache.clear();
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("cache_")) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn("Failed to clear localStorage cache:", e);
    }
  }

  // Get character data with caching - calls /api/characters
  async getCharacterData(includeFranchises) {
    const cacheKey = `${this.CHARACTER_DATA_KEY}_${includeFranchises}`;

    // Check cache first
    const cached = this.get(cacheKey);
    if (cached) {
      console.log(
        `Using cached character data (${includeFranchises ? "with" : "without"} franchises):`,
        cached.length,
        "characters"
      );
      return cached;
    }

    // Fetch from /api/characters (Vercel serverless function)
    console.log("Fetching fresh character data from API...");
    const url = `/api/characters${includeFranchises ? "" : "?includeFranchises=false"}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the result for 15 minutes
      this.set(cacheKey, data);
      console.log(
        `Cached fresh character data (${includeFranchises ? "with" : "without"} franchises):`,
        data.length,
        "characters"
      );

      return data;
    } catch (error) {
      console.error("Failed to fetch character data:", error);
      throw error;
    }
  }

  // Store successful image loading strategy
  setImageStrategy(imageUrl, strategy) {
    const strategies = this.get(this.IMAGE_STRATEGY_CACHE_KEY) || {};
    strategies[imageUrl] = {
      strategy,
      timestamp: Date.now(),
    };
    this.set(
      this.IMAGE_STRATEGY_CACHE_KEY,
      strategies,
      7 * 24 * 60 * 60 * 1000
    );
  }

  // Get cached image loading strategy
  getImageStrategy(imageUrl) {
    const strategies = this.get(this.IMAGE_STRATEGY_CACHE_KEY) || {};
    const cached = strategies[imageUrl];

    if (cached && Date.now() - cached.timestamp < 7 * 24 * 60 * 60 * 1000) {
      return cached.strategy;
    }
    return null;
  }
}

// Global cache instance
window.gameCache = new CacheManager();
