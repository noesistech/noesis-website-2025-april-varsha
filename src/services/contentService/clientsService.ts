
import { ClientsSection, ClientLogo, PartnerLogo, Testimonial } from '@/types/supabase';
import { baseContentService } from './baseContentService';

export const clientsService = {
  async getClientsSection(forceRefresh = false): Promise<{ 
    section: ClientsSection | null, 
    clientLogos: ClientLogo[], 
    partnerLogos: PartnerLogo[],
    testimonials: Testimonial[]
  }> {
    const section = await baseContentService.fetchContent<ClientsSection>(
      'clients_section', 
      'clientsSection', 
      forceRefresh, 
      { isSingle: true }
    );
    
    const clientLogos = await baseContentService.fetchContent<ClientLogo[]>(
      'client_logos', 
      'clientLogos', 
      forceRefresh, 
      { orderBy: 'sort_order' }
    ) || [];
    
    const partnerLogos = await baseContentService.fetchContent<PartnerLogo[]>(
      'partner_logos', 
      'partnerLogos', 
      forceRefresh, 
      { orderBy: 'sort_order' }
    ) || [];
    
    const testimonials = await baseContentService.fetchContent<Testimonial[]>(
      'testimonials', 
      'testimonials', 
      forceRefresh, 
      { orderBy: 'sort_order' }
    ) || [];
    
    return {
      section,
      clientLogos,
      partnerLogos,
      testimonials
    };
  }
};
