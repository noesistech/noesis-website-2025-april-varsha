
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

// Define a type for our table names based on the Database
type TableName = 
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
  | 'clients_section'
  | 'client_logos'
  | 'partner_logos'
  | 'testimonials'
  | 'technologies';

// In-memory cache
let contentCache: CachedContent = {};

// Cache expiration time (2 minutes in production, shorter for development)
const CACHE_EXPIRATION = process.env.NODE_ENV === 'production' ? 2 * 60 * 1000 : 30 * 1000;

export const contentCacheService = {
  async getCachedData<T>(key: keyof CachedContent, fetcher: () => Promise<T>, forceRefresh = false): Promise<T> {
    const cachedItem = contentCache[key];
    const now = Date.now();
    
    // If we have a cached item that's not expired and we're not forcing a refresh
    if (cachedItem && !forceRefresh && (now - cachedItem.timestamp < CACHE_EXPIRATION)) {
      console.log(`Using cached ${key} data`);
      return cachedItem.data as T;
    }
    
    try {
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
    } catch (error) {
      console.error(`Error fetching fresh data for ${key}:`, error);
      
      // If we have a cached item, return it even if it's expired
      // This allows the app to function with stale data when network request fails
      if (cachedItem) {
        console.log(`Using expired cached ${key} data as fallback`);
        return cachedItem.data as T;
      }
      
      // If we don't have any cached data, propagate the error
      throw error;
    }
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
  
  invalidateCache(specificKey?: keyof CachedContent): void {
    if (specificKey) {
      // Invalidate only a specific key
      if (contentCache[specificKey]) {
        delete contentCache[specificKey];
        console.log(`Cache for ${specificKey} invalidated`);
      }
    } else {
      // Invalidate entire cache
      contentCache = {};
      console.log('Entire content cache invalidated');
    }
    
    try {
      localStorage.setItem('noesis_content_cache', JSON.stringify(contentCache));
    } catch (e) {
      console.error('Failed to update localStorage cache:', e);
    }
  },
  
  async checkForUpdates(): Promise<boolean> {
    try {
      // Check multiple tables for updates
      const tablesToCheck: TableName[] = [
        'hero_section',
        'service_cards',
        'about_section',
        'stats',
        'mission_section',
        'services_section',
        'service_items',
        'solutions_section',
        'solution_items',
        'tech_stack_section',
        'tech_categories',
        'clients_section',
        'client_logos',
        'partner_logos',
        'testimonials'
      ];
      
      let hasUpdates = false;
      
      for (const table of tablesToCheck) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('updated_at')
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();
          
          if (error) {
            console.error(`Error checking for updates in ${table}:`, error);
            continue;
          }
          
          if (!data || !data.updated_at) continue;
          
          // Convert to timestamps for comparison
          const serverUpdateTime = new Date(data.updated_at).getTime();
          
          // Find the corresponding cache key
          const cacheKey = this.tableToCacheKey(table);
          if (!cacheKey) continue;
          
          const cachedItem = contentCache[cacheKey];
          
          // If we don't have a cached item or server data is newer than our cache
          if (!cachedItem || serverUpdateTime > cachedItem.timestamp) {
            console.log(`Server has newer content for ${table}, invalidating cache for ${cacheKey}`);
            this.invalidateCache(cacheKey);
            hasUpdates = true;
          }
        } catch (error) {
          console.error(`Error processing updates for table ${table}:`, error);
        }
      }
      
      return hasUpdates;
    } catch (e) {
      console.error('Failed to check for updates:', e);
      return false;
    }
  },
  
  tableToCacheKey(tableName: TableName): keyof CachedContent | null {
    const mapping: Record<TableName, keyof CachedContent> = {
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
      'clients_section': 'clientsSection',
      'client_logos': 'clientLogos',
      'partner_logos': 'partnerLogos',
      'testimonials': 'testimonials',
      'technologies': 'techCategories' // Map technologies to tech categories as they're related
    };
    
    return mapping[tableName] || null;
  }
};
