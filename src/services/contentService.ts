
import { supabase } from "@/integrations/supabase/client";
import {
  HeroSection,
  ServiceCard,
  AboutSection,
  Stat,
  MissionSection,
  ServicesSection,
  ServiceItem,
  SolutionsSection,
  SolutionItem,
  TechStackSection,
  TechCategory,
  Technology,
  ClientsSection,
  ClientLogo,
  PartnerLogo,
  Testimonial
} from "@/types/supabase";
import { contentCacheService } from "@/services/contentCacheService";

export const contentService = {
  async getHeroSection(): Promise<HeroSection | null> {
    return contentCacheService.getCachedData('heroSection', async () => {
      const { data, error } = await supabase
        .from('hero_section')
        .select('*')
        .single();
      
      if (error) {
        console.error("Error fetching hero section:", error);
        return null;
      }
      
      return data;
    });
  },

  async getServiceCards(): Promise<ServiceCard[]> {
    return contentCacheService.getCachedData('serviceCards', async () => {
      const { data, error } = await supabase
        .from('service_cards')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error("Error fetching service cards:", error);
        return [];
      }
      
      return data || [];
    });
  },

  async getAboutSection(): Promise<AboutSection | null> {
    return contentCacheService.getCachedData('aboutSection', async () => {
      const { data, error } = await supabase
        .from('about_section')
        .select('*')
        .single();
      
      if (error) {
        console.error("Error fetching about section:", error);
        return null;
      }
      
      return data;
    });
  },

  async getStats(): Promise<Stat[]> {
    return contentCacheService.getCachedData('stats', async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error("Error fetching stats:", error);
        return [];
      }
      
      return data || [];
    });
  },

  async getMissionSection(): Promise<MissionSection | null> {
    return contentCacheService.getCachedData('missionSection', async () => {
      const { data, error } = await supabase
        .from('mission_section')
        .select('*')
        .single();
      
      if (error) {
        console.error("Error fetching mission section:", error);
        return null;
      }
      
      return data;
    });
  },

  async getServicesSection(): Promise<{ section: ServicesSection | null, items: ServiceItem[] }> {
    const section = await contentCacheService.getCachedData('servicesSection', async () => {
      const sectionResult = await supabase
        .from('services_section')
        .select('*')
        .single();
      
      if (sectionResult.error) {
        console.error("Error fetching services section:", sectionResult.error);
      }
      
      return sectionResult.data;
    });
    
    const items = await contentCacheService.getCachedData('serviceItems', async () => {
      const itemsResult = await supabase
        .from('service_items')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (itemsResult.error) {
        console.error("Error fetching service items:", itemsResult.error);
      }
      
      return itemsResult.data || [];
    });
    
    return { section, items };
  },

  async getSolutionsSection(): Promise<{ section: SolutionsSection | null, items: SolutionItem[] }> {
    const section = await contentCacheService.getCachedData('solutionsSection', async () => {
      const sectionResult = await supabase
        .from('solutions_section')
        .select('*')
        .single();
      
      if (sectionResult.error) {
        console.error("Error fetching solutions section:", sectionResult.error);
      }
      
      return sectionResult.data;
    });
    
    const items = await contentCacheService.getCachedData('solutionItems', async () => {
      const itemsResult = await supabase
        .from('solution_items')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (itemsResult.error) {
        console.error("Error fetching solution items:", itemsResult.error);
      }
      
      return itemsResult.data || [];
    });
    
    return { section, items };
  },

  async getTechStackSection(): Promise<{ section: TechStackSection | null, categories: TechCategory[] }> {
    const section = await contentCacheService.getCachedData('techStackSection', async () => {
      const sectionResult = await supabase
        .from('tech_stack_section')
        .select('*')
        .single();
      
      if (sectionResult.error) {
        console.error("Error fetching tech stack section:", sectionResult.error);
      }
      
      return sectionResult.data;
    });
    
    const categories = await contentCacheService.getCachedData('techCategories', async () => {
      const categoriesResult = await supabase
        .from('tech_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (categoriesResult.error) {
        console.error("Error fetching tech categories:", categoriesResult.error);
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
          category.technologies = []; // Initialize technologies as empty array to prevent undefined errors
        } else {
          category.technologies = techResult.data || [];
        }
      }
      
      return categories;
    });
    
    return { section, categories };
  },

  async getClientsSection(): Promise<{ 
    section: ClientsSection | null, 
    clientLogos: ClientLogo[], 
    partnerLogos: PartnerLogo[],
    testimonials: Testimonial[]
  }> {
    const section = await contentCacheService.getCachedData('clientsSection', async () => {
      const sectionResult = await supabase
        .from('clients_section')
        .select('*')
        .single();
      
      if (sectionResult.error) {
        console.error("Error fetching clients section:", sectionResult.error);
      }
      
      return sectionResult.data;
    });
    
    const clientLogos = await contentCacheService.getCachedData('clientLogos', async () => {
      const clientLogosResult = await supabase
        .from('client_logos')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (clientLogosResult.error) {
        console.error("Error fetching client logos:", clientLogosResult.error);
      }
      
      return clientLogosResult.data || [];
    });
    
    const partnerLogos = await contentCacheService.getCachedData('partnerLogos', async () => {
      const partnerLogosResult = await supabase
        .from('partner_logos')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (partnerLogosResult.error) {
        console.error("Error fetching partner logos:", partnerLogosResult.error);
      }
      
      return partnerLogosResult.data || [];
    });
    
    const testimonials = await contentCacheService.getCachedData('testimonials', async () => {
      const testimonialsResult = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (testimonialsResult.error) {
        console.error("Error fetching testimonials:", testimonialsResult.error);
      }
      
      return testimonialsResult.data || [];
    });
    
    return {
      section,
      clientLogos,
      partnerLogos,
      testimonials
    };
  },
  
  async checkForContentUpdates(): Promise<boolean> {
    return contentCacheService.checkForUpdates();
  }
};
