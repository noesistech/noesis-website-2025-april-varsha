
import { AboutSection, Stat } from '@/types/supabase';
import { baseContentService } from './baseContentService';

export const aboutService = {
  async getAboutSection(forceRefresh = false): Promise<AboutSection | null> {
    return baseContentService.fetchContent<AboutSection>(
      'about_section', 
      'aboutSection', 
      forceRefresh, 
      { isSingle: true }
    );
  },

  async getStats(forceRefresh = false): Promise<Stat[]> {
    return baseContentService.fetchContent<Stat[]>(
      'stats', 
      'stats', 
      forceRefresh, 
      { orderBy: 'sort_order' }
    ) || [];
  }
};
