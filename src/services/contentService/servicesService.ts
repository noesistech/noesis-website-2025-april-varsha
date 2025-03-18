
import { ServicesSection, ServiceItem } from '@/types/supabase';
import { baseContentService } from './baseContentService';

export const servicesService = {
  async getServicesSection(forceRefresh = false): Promise<{ section: ServicesSection | null, items: ServiceItem[] }> {
    const section = await baseContentService.fetchContent<ServicesSection>(
      'services_section', 
      'servicesSection', 
      forceRefresh, 
      { isSingle: true }
    );
    
    const items = await baseContentService.fetchContent<ServiceItem[]>(
      'service_items', 
      'serviceItems', 
      forceRefresh, 
      { orderBy: 'sort_order' }
    ) || [];
    
    return { section, items };
  }
};
