
import { SolutionsSection, SolutionItem } from '@/types/supabase';
import { baseContentService } from './baseContentService';

export const solutionsService = {
  async getSolutionsSection(forceRefresh = false): Promise<{ section: SolutionsSection | null, items: SolutionItem[] }> {
    const section = await baseContentService.fetchContent<SolutionsSection>(
      'solutions_section', 
      'solutionsSection', 
      forceRefresh, 
      { isSingle: true }
    );
    
    const items = await baseContentService.fetchContent<SolutionItem[]>(
      'solution_items', 
      'solutionItems', 
      forceRefresh, 
      { orderBy: 'sort_order' }
    ) || [];
    
    return { section, items };
  }
};
