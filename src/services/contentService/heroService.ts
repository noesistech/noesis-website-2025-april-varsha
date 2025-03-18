
import { HeroSection, ServiceCard } from '@/types/supabase';
import { baseContentService } from './baseContentService';

export const heroService = {
  async getHeroSection(forceRefresh = false): Promise<HeroSection | null> {
    return baseContentService.fetchContent<HeroSection>(
      'hero_section', 
      'heroSection', 
      forceRefresh, 
      { isSingle: true }
    );
  },

  async getServiceCards(forceRefresh = false): Promise<ServiceCard[]> {
    return baseContentService.fetchContent<ServiceCard[]>(
      'service_cards', 
      'serviceCards', 
      forceRefresh, 
      { orderBy: 'sort_order' }
    ) || [];
  }
};
