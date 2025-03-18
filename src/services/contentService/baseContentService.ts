
import { contentCacheService } from '@/services/contentCacheService';
import { supabase } from '@/integrations/supabase/client';

// Base utility functions for content services
export const baseContentService = {
  // Generic fetch method that can be reused across content types
  async fetchContent<T>(
    tableName: string,
    cacheKey: keyof typeof contentCacheService.contentCache,
    forceRefresh = false,
    options = { 
      isSingle: false, 
      orderBy: null as string | null,
      orderDirection: 'asc' as 'asc' | 'desc'
    }
  ): Promise<T | null> {
    return contentCacheService.getCachedData(cacheKey, async () => {
      let query = supabase.from(tableName).select('*');
      
      if (options.isSingle) {
        const { data, error } = await query.single();
        
        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          return null;
        }
        
        return data as T;
      } else {
        if (options.orderBy) {
          query = query.order(options.orderBy, { ascending: options.orderDirection === 'asc' });
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
