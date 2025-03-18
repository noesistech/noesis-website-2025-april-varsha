
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

export const contentService = {
  async getHeroSection(): Promise<HeroSection | null> {
    const { data, error } = await supabase
      .from('hero_section')
      .select('*')
      .single();
    
    if (error) {
      console.error("Error fetching hero section:", error);
      return null;
    }
    
    return data;
  },

  async getServiceCards(): Promise<ServiceCard[]> {
    const { data, error } = await supabase
      .from('service_cards')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error("Error fetching service cards:", error);
      return [];
    }
    
    return data || [];
  },

  async getAboutSection(): Promise<AboutSection | null> {
    const { data, error } = await supabase
      .from('about_section')
      .select('*')
      .single();
    
    if (error) {
      console.error("Error fetching about section:", error);
      return null;
    }
    
    return data;
  },

  async getStats(): Promise<Stat[]> {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error("Error fetching stats:", error);
      return [];
    }
    
    return data || [];
  },

  async getMissionSection(): Promise<MissionSection | null> {
    const { data, error } = await supabase
      .from('mission_section')
      .select('*')
      .single();
    
    if (error) {
      console.error("Error fetching mission section:", error);
      return null;
    }
    
    return data;
  },

  async getServicesSection(): Promise<{ section: ServicesSection | null, items: ServiceItem[] }> {
    const sectionResult = await supabase
      .from('services_section')
      .select('*')
      .single();
    
    const itemsResult = await supabase
      .from('service_items')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (sectionResult.error) {
      console.error("Error fetching services section:", sectionResult.error);
    }
    
    if (itemsResult.error) {
      console.error("Error fetching service items:", itemsResult.error);
    }
    
    return {
      section: sectionResult.data,
      items: itemsResult.data || []
    };
  },

  async getSolutionsSection(): Promise<{ section: SolutionsSection | null, items: SolutionItem[] }> {
    const sectionResult = await supabase
      .from('solutions_section')
      .select('*')
      .single();
    
    const itemsResult = await supabase
      .from('solution_items')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (sectionResult.error) {
      console.error("Error fetching solutions section:", sectionResult.error);
    }
    
    if (itemsResult.error) {
      console.error("Error fetching solution items:", itemsResult.error);
    }
    
    return {
      section: sectionResult.data,
      items: itemsResult.data || []
    };
  },

  async getTechStackSection(): Promise<{ section: TechStackSection | null, categories: TechCategory[] }> {
    const sectionResult = await supabase
      .from('tech_stack_section')
      .select('*')
      .single();
    
    const categoriesResult = await supabase
      .from('tech_categories')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (sectionResult.error) {
      console.error("Error fetching tech stack section:", sectionResult.error);
    }
    
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
    
    return {
      section: sectionResult.data,
      categories
    };
  },

  async getClientsSection(): Promise<{ 
    section: ClientsSection | null, 
    clientLogos: ClientLogo[], 
    partnerLogos: PartnerLogo[],
    testimonials: Testimonial[]
  }> {
    const sectionResult = await supabase
      .from('clients_section')
      .select('*')
      .single();
    
    const clientLogosResult = await supabase
      .from('client_logos')
      .select('*')
      .order('sort_order', { ascending: true });
    
    const partnerLogosResult = await supabase
      .from('partner_logos')
      .select('*')
      .order('sort_order', { ascending: true });
    
    const testimonialsResult = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    
    return {
      section: sectionResult.data,
      clientLogos: clientLogosResult.data || [],
      partnerLogos: partnerLogosResult.data || [],
      testimonials: testimonialsResult.data || []
    };
  }
};
