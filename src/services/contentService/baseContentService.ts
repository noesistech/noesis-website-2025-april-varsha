
import { contentCacheService, TableName, CachedContent } from '@/services/contentCacheService';
import { supabase } from '@/integrations/supabase/client';

// Interface for options
interface FetchOptions {
  isSingle?: boolean;
  orderBy?: string | null;
  orderDirection?: 'asc' | 'desc';
}

// Base utility functions for content services
export const baseContentService = {
  // Generic fetch method that can be reused across content types
  async fetchContent<T>(
    tableName: TableName,
    cacheKey: keyof CachedContent,
    forceRefresh = false,
    options?: Partial<FetchOptions>
  ): Promise<T | null> {
    // Set default options
    const defaultOptions: FetchOptions = {
      isSingle: false,
      orderBy: null,
      orderDirection: 'asc'
    };
    
    // Merge provided options with defaults
    const mergedOptions = { ...defaultOptions, ...options };
    
    return contentCacheService.getCachedData(cacheKey, async () => {
      let query = supabase.from(tableName).select('*');
      
      if (mergedOptions.isSingle) {
        const { data, error } = await query.single();
        
        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          return null;
        }
        
        return data as T;
      } else {
        if (mergedOptions.orderBy) {
          query = query.order(mergedOptions.orderBy, { ascending: mergedOptions.orderDirection === 'asc' });
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          return [] as T;
        }
        
        return (data || []) as T;
      }
    }, forceRefresh);
  }
};
