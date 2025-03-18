
import { supabase } from '@/integrations/supabase/client';
import { TechStackSection, TechCategory } from '@/types/supabase';
import { baseContentService } from './baseContentService';
import { contentCacheService } from '../contentCacheService';

export const techStackService = {
  async getTechStackSection(forceRefresh = false): Promise<{ section: TechStackSection | null, categories: TechCategory[] }> {
    const section = await baseContentService.fetchContent<TechStackSection>(
      'tech_stack_section', 
      'techStackSection', 
      forceRefresh, 
      { isSingle: true }
    );
    
    const categories = await contentCacheService.getCachedData('techCategories', async () => {
      const categoriesResult = await supabase
        .from('tech_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (categoriesResult.error) {
        console.error("Error fetching tech categories:", categoriesResult.error);
        return [];
      }
      
      const categories: TechCategory[] = categoriesResult.data || [];
      
      // Fetch technologies for each category
      for (const category of categories) {
        const techResult = await supabase
          .from('technologies')
          .select('*')
          .eq('category_id', category.id)
          .order('sort_order', { ascending: true });
        
        if (techResult.error) {
          console.error(`Error fetching technologies for category ${category.id}:`, techResult.error);
          category.technologies = []; 
        } else {
          category.technologies = techResult.data || [];
        }
      }
      
      return categories;
    }, forceRefresh);
    
    return { section, categories };
  }
};
