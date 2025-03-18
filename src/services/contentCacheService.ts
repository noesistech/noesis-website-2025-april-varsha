interface CacheItem<T> {
  data: T;
  timestamp: number;
  etag?: string;
}

export interface CachedContent {
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

// Cache structure
const contentCache: CachedContent = {};

// The tableName to cacheKey mapping
export type TableName = 
  | 'hero_section'
  | 'service_cards'
  | 'about_section'
  | 'stats'
  | 'mission_section'
  | 'services_section'
  | 'service_items'
  | 'solutions_section'
  | 'solution_items'
  | 'tech_stack_section'
  | 'tech_categories'
  | 'technologies'
  | 'clients_section'
  | 'client_logos'
  | 'partner_logos'
  | 'testimonials';

const tableToCacheKeyMap: Record<TableName, keyof CachedContent> = {
  'hero_section': 'heroSection',
  'service_cards': 'serviceCards',
  'about_section': 'aboutSection',
  'stats': 'stats',
  'mission_section': 'missionSection',
  'services_section': 'servicesSection',
  'service_items': 'serviceItems',
  'solutions_section': 'solutionsSection',
  'solution_items': 'solutionItems',
  'tech_stack_section': 'techStackSection',
  'tech_categories': 'techCategories',
  'technologies': 'techCategories', // Note: This maps to the same key
  'clients_section': 'clientsSection',
  'client_logos': 'clientLogos',
  'partner_logos': 'partnerLogos',
  'testimonials': 'testimonials'
};

// Cache expiration time (2 minutes in production, 30 seconds in development)
const CACHE_EXPIRATION = process.env.NODE_ENV === 'production' ? 2 * 60 * 1000 : 30 * 1000;

export const contentCacheService = {
  // Expose the content cache for TypeScript to know it exists
  contentCache,

  // Get data from cache or fetch it
  async getCachedData<T>(key: keyof CachedContent, fetcher: () => Promise<T>, forceRefresh = false): Promise<T> {
    const cachedItem = contentCache[key];
    const now = Date.now();
    
    // If we have a cached item, it's not expired and we're not forcing a refresh, return it
    if (cachedItem && !forceRefresh && now - cachedItem.timestamp < CACHE_EXPIRATION) {
      console.log(`Using cached data for ${key}`);
      return cachedItem.data as T;
    }
    
    try {
      // Otherwise fetch fresh data
      console.log(`Fetching fresh data for ${key}`);
      const freshData = await fetcher();
      
      // Update cache with fresh data
      contentCache[key] = {
        data: freshData,
        timestamp: now
      };
      
      return freshData;
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      
      // If fetch fails but we have cached data (even if expired), return it
      if (cachedItem) {
        console.log(`Using stale cached data for ${key} after fetch failure`);
        return cachedItem.data as T;
      }
      
      // No cached data, re-throw the error
      throw error;
    }
  },
  
  // Initialize cache from localStorage if available
  initializeCache(): void {
    try {
      const savedCache = localStorage.getItem('contentCache');
      if (savedCache) {
        const parsedCache = JSON.parse(savedCache);
        
        // Only restore valid cache items
        Object.keys(parsedCache).forEach(key => {
          if (parsedCache[key] && parsedCache[key].data) {
            contentCache[key as keyof CachedContent] = parsedCache[key];
          }
        });
        
        console.log('Restored content cache from localStorage');
      }
    } catch (err) {
      console.warn('Failed to restore content cache from localStorage', err);
    }
  },
  
  // Invalidate the entire cache or a specific key
  invalidateCache(specificKey?: keyof CachedContent): void {
    if (specificKey) {
      delete contentCache[specificKey];
      console.log(`Invalidated cache for ${specificKey}`);
    } else {
      Object.keys(contentCache).forEach(key => {
        delete contentCache[key as keyof CachedContent];
      });
      console.log('Invalidated all content cache');
    }
    
    // Update localStorage
    try {
      localStorage.setItem('contentCache', JSON.stringify(contentCache));
    } catch (err) {
      console.warn('Failed to update localStorage cache', err);
    }
  },
  
  // Check if any content has been updated more recently than our cache
  async checkForUpdates(): Promise<boolean> {
    let hasUpdates = false;
    
    for (const [tableName, cacheKey] of Object.entries(tableToCacheKeyMap)) {
      const cachedItem = contentCache[cacheKey];
      
      // Skip if we don't have this item cached
      if (!cachedItem) continue;
      
      try {
        const { data, error } = await supabase
          .from(tableName as TableName)
          .select('updated_at')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();
        
        if (error) {
          console.warn(`Error checking updates for ${tableName}:`, error);
          continue;
        }
        
        if (data) {
          const updatedAt = new Date(data.updated_at).getTime();
          
          // If the content was updated after our cache timestamp, we need to refresh
          if (updatedAt > cachedItem.timestamp) {
            console.log(`Content updates detected for ${tableName}`);
            hasUpdates = true;
            break;
          }
        }
      } catch (err) {
        console.warn(`Error checking for updates on ${tableName}:`, err);
      }
    }
    
    return hasUpdates;
  },
  
  // Map a table name to its corresponding cache key
  tableToCacheKey(tableName: TableName): keyof CachedContent {
    return tableToCacheKeyMap[tableName];
  }
};

import { supabase } from '@/integrations/supabase/client';
