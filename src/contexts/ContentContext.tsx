
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  ClientsSection,
  ClientLogo,
  PartnerLogo,
  Testimonial,
  Technology
} from '@/types/supabase';
import { toast } from "sonner";

interface ContentContextType {
  heroSection: HeroSection | null;
  serviceCards: ServiceCard[];
  aboutSection: AboutSection | null;
  stats: Stat[];
  missionSection: MissionSection | null;
  servicesSection: ServicesSection | null;
  serviceItems: ServiceItem[];
  solutionsSection: SolutionsSection | null;
  solutionItems: SolutionItem[];
  techStackSection: TechStackSection | null;
  techCategories: TechCategory[];
  clientsSection: ClientsSection | null;
  clientLogos: ClientLogo[];
  partnerLogos: PartnerLogo[];
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
  hasLoadedAnyContent: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [heroSection, setHeroSection] = useState<HeroSection | null>(null);
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([]);
  const [aboutSection, setAboutSection] = useState<AboutSection | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [missionSection, setMissionSection] = useState<MissionSection | null>(null);
  const [servicesSection, setServicesSection] = useState<ServicesSection | null>(null);
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  const [solutionsSection, setSolutionsSection] = useState<SolutionsSection | null>(null);
  const [solutionItems, setSolutionItems] = useState<SolutionItem[]>([]);
  const [techStackSection, setTechStackSection] = useState<TechStackSection | null>(null);
  const [techCategories, setTechCategories] = useState<TechCategory[]>([]);
  const [clientsSection, setClientsSection] = useState<ClientsSection | null>(null);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedAnyContent, setHasLoadedAnyContent] = useState(false);

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      
      // Helper function to safely fetch content with fallbacks
      const safelyFetchContent = async <T,>(
        fetchFn: () => Promise<T>, 
        setStateFn: (data: T) => void, 
        defaultValue: T
      ) => {
        try {
          const data = await fetchFn();
          if (data) {
            setStateFn(data);
            return true;
          }
        } catch (err) {
          console.error("Error fetching content item:", err);
        }
        return false;
      };

      let loadedAny = false;

      // Fetch hero section
      loadedAny = await safelyFetchContent(
        async () => {
          const { data, error } = await supabase
            .from('hero_section')
            .select('*')
            .single();
            
          if (error) throw error;
          return data;
        },
        (data) => setHeroSection(data),
        null
      ) || loadedAny;
      
      // Fetch service cards
      loadedAny = await safelyFetchContent(
        async () => {
          const { data, error } = await supabase
            .from('service_cards')
            .select('*')
            .order('sort_order', { ascending: true });
            
          if (error) throw error;
          return data || [];
        },
        (data) => setServiceCards(data),
        []
      ) || loadedAny;
      
      // Fetch about section
      loadedAny = await safelyFetchContent(
        async () => {
          const { data, error } = await supabase
            .from('about_section')
            .select('*')
            .single();
            
          if (error) throw error;
          return data;
        },
        (data) => setAboutSection(data),
        null
      ) || loadedAny;
      
      // Fetch stats
      loadedAny = await safelyFetchContent(
        async () => {
          const { data, error } = await supabase
            .from('stats')
            .select('*')
            .order('sort_order', { ascending: true });
            
          if (error) throw error;
          return data || [];
        },
        (data) => setStats(data),
        []
      ) || loadedAny;
      
      // Fetch mission section
      loadedAny = await safelyFetchContent(
        async () => {
          const { data, error } = await supabase
            .from('mission_section')
            .select('*')
            .single();
            
          if (error) throw error;
          return data;
        },
        (data) => setMissionSection(data),
        null
      ) || loadedAny;
      
      // Fetch services section and items
      try {
        const { data: sectionData, error: sectionError } = await supabase
          .from('services_section')
          .select('*')
          .single();
          
        if (sectionError) throw sectionError;
        setServicesSection(sectionData);
        
        const { data: itemsData, error: itemsError } = await supabase
          .from('service_items')
          .select('*')
          .order('sort_order', { ascending: true });
          
        if (itemsError) throw itemsError;
        setServiceItems(itemsData || []);
        
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching services:", err);
      }
      
      // Fetch solutions section and items
      try {
        const { data: sectionData, error: sectionError } = await supabase
          .from('solutions_section')
          .select('*')
          .single();
          
        if (sectionError) throw sectionError;
        setSolutionsSection(sectionData);
        
        const { data: itemsData, error: itemsError } = await supabase
          .from('solution_items')
          .select('*')
          .order('sort_order', { ascending: true });
          
        if (itemsError) throw itemsError;
        setSolutionItems(itemsData || []);
        
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching solutions:", err);
      }
      
      // Fetch tech stack section and categories
      try {
        const { data: sectionData, error: sectionError } = await supabase
          .from('tech_stack_section')
          .select('*')
          .single();
          
        if (sectionError) throw sectionError;
        setTechStackSection(sectionData);
        
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('tech_categories')
          .select('*')
          .order('sort_order', { ascending: true });
          
        if (categoriesError) throw categoriesError;
        
        const categories = categoriesData || [];
        
        // Fetch technologies for each category
        for (const category of categories) {
          // Initialize technologies as an empty array
          category.technologies = [];
          
          const { data: techData, error: techError } = await supabase
            .from('technologies')
            .select('*')
            .eq('category_id', category.id)
            .order('sort_order', { ascending: true });
          
          if (techError) {
            console.error(`Error fetching technologies for category ${category.id}:`, techError);
          } else {
            category.technologies = techData || [];
          }
        }
        
        setTechCategories(categories);
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching tech stack:", err);
      }
      
      // Fetch clients section
      try {
        const { data: sectionData, error: sectionError } = await supabase
          .from('clients_section')
          .select('*')
          .single();
          
        if (sectionError) throw sectionError;
        setClientsSection(sectionData);
        
        const { data: clientLogosData, error: clientLogosError } = await supabase
          .from('client_logos')
          .select('*')
          .order('sort_order', { ascending: true });
          
        if (clientLogosError) throw clientLogosError;
        setClientLogos(clientLogosData || []);
        
        const { data: partnerLogosData, error: partnerLogosError } = await supabase
          .from('partner_logos')
          .select('*')
          .order('sort_order', { ascending: true });
          
        if (partnerLogosError) throw partnerLogosError;
        setPartnerLogos(partnerLogosData || []);
        
        const { data: testimonialsData, error: testimonialsError } = await supabase
          .from('testimonials')
          .select('*')
          .order('sort_order', { ascending: true });
          
        if (testimonialsError) throw testimonialsError;
        setTestimonials(testimonialsData || []);
        
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching clients section:", err);
      }
      
      if (loadedAny) {
        setHasLoadedAnyContent(true);
        setError(null);
      } else if (!hasLoadedAnyContent) {
        // Only set error if we've never successfully loaded content
        setError("Unable to load content. Please try again later.");
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching content:", err);
      
      // Only set error if we've never loaded any content
      if (!hasLoadedAnyContent) {
        setError("Failed to load content. Please try again later.");
      }
      
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchAllContent();
  }, []);

  const refreshContent = async () => {
    setLoading(true);
    await fetchAllContent();
    toast.success("Content refreshed successfully");
  };

  return (
    <ContentContext.Provider
      value={{
        heroSection,
        serviceCards,
        aboutSection,
        stats,
        missionSection,
        servicesSection,
        serviceItems,
        solutionsSection,
        solutionItems,
        techStackSection,
        techCategories,
        clientsSection,
        clientLogos,
        partnerLogos,
        testimonials,
        loading,
        error,
        refreshContent,
        hasLoadedAnyContent
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
