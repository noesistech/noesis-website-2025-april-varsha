
import { supabase } from "@/integrations/supabase/client";

interface CacheItem<T> {
  data: T;
  timestamp: number;
  etag?: string;
}

interface CachedContent {
  heroSection?: CacheItem<any>;
  serviceCards?: CacheItem<any>;
  aboutSection?: CacheItem<any>;
  stats?: CacheItem<any>;
  missionSection?: CacheItem<any>;
  servicesSection?: CacheItem<any>;
  serviceItems?: CacheItem<any>;
  solutionsSection?: CacheItem<any>;
  solutionItems?: CacheItem<any>;
  techStackSection?: CacheItem<any>;
  techCategories?: CacheItem<any>;
  clientsSection?: CacheItem<any>;
  clientLogos?: CacheItem<any>;
  partnerLogos?: CacheItem<any>;
  testimonials?: CacheItem<any>;
}

// In-memory cache
let contentCache: CachedContent = {};

// Cache expiration time (10 minutes)
const CACHE_EXPIRATION = 10 * 60 * 1000;

export const contentCacheService = {
  async getCachedData<T>(key: keyof CachedContent, fetcher: () => Promise<T>, forceRefresh = false): Promise<T> {
    const cachedItem = contentCache[key];
    const now = Date.now();
    
    // If we have a cached item that's not expired and we're not forcing a refresh
    if (cachedItem && !forceRefresh && (now - cachedItem.timestamp < CACHE_EXPIRATION)) {
      console.log(`Using cached ${key} data`);
      return cachedItem.data as T;
    }
    
    // Fetch fresh data
    console.log(`Fetching fresh ${key} data`);
    const freshData = await fetcher();
    
    // Update cache
    contentCache[key] = {
      data: freshData,
      timestamp: now
    };
    
    // Store in localStorage for persistence across sessions
    try {
      localStorage.setItem('noesis_content_cache', JSON.stringify(contentCache));
    } catch (e) {
      console.error('Failed to save cache to localStorage:', e);
    }
    
    return freshData;
  },
  
  initializeCache(): void {
    try {
      const savedCache = localStorage.getItem('noesis_content_cache');
      if (savedCache) {
        contentCache = JSON.parse(savedCache);
        console.log('Content cache loaded from localStorage');
      }
    } catch (e) {
      console.error('Failed to load cache from localStorage:', e);
    }
  },
  
  invalidateCache(): void {
    contentCache = {};
    try {
      localStorage.removeItem('noesis_content_cache');
    } catch (e) {
      console.error('Failed to clear localStorage cache:', e);
    }
  },
  
  async checkForUpdates(): Promise<boolean> {
    try {
      // Check the last updated timestamp in any content table
      const { data, error } = await supabase
        .from('hero_section')
        .select('updated_at')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error("Error checking for updates:", error);
        return false;
      }
      
      if (!data) return false;
      
      // Convert to timestamps for comparison
      const serverUpdateTime = new Date(data.updated_at).getTime();
      
      // Find the most recent cache timestamp
      let mostRecentCacheTime = 0;
      Object.values(contentCache).forEach(item => {
        if (item && item.timestamp > mostRecentCacheTime) {
          mostRecentCacheTime = item.timestamp;
        }
      });
      
      // If server data is newer than our cache, invalidate the cache
      if (serverUpdateTime > mostRecentCacheTime) {
        console.log('Server has newer content, invalidating cache');
        this.invalidateCache();
        return true;
      }
      
      return false;
    } catch (e) {
      console.error('Failed to check for updates:', e);
      return false;
    }
  }
};
