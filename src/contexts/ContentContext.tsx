
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { contentService } from '@/services/contentService';
import { contentCacheService } from '@/services/contentCacheService';
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
  Testimonial
} from '@/types/supabase';
import { toast } from "sonner";
import { ErrorDisplay } from '@/components/ui/error';

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

  const fetchAllContent = async (forceRefresh = false) => {
    try {
      setLoading(true);
      
      // Initialize cache from localStorage if available
      contentCacheService.initializeCache();
      
      // Only clear the cache if forcing a refresh
      if (forceRefresh) {
        contentCacheService.invalidateCache();
      }
      
      // Check for content updates in the background
      try {
        const hasUpdates = await contentService.checkForContentUpdates();
        console.log(`Content updates available: ${hasUpdates}`);
      } catch (err) {
        console.warn("Error checking for content updates:", err);
        // Continue even if update check fails
      }
      
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

      // Fetch all content with individual error handling
      let loadedAny = false;

      // Fetch hero section
      loadedAny = await safelyFetchContent(
        () => contentService.getHeroSection(forceRefresh),
        (data) => setHeroSection(data),
        null
      ) || loadedAny;
      
      // Fetch service cards
      loadedAny = await safelyFetchContent(
        () => contentService.getServiceCards(forceRefresh),
        (data) => setServiceCards(data),
        []
      ) || loadedAny;
      
      // Fetch about section
      loadedAny = await safelyFetchContent(
        () => contentService.getAboutSection(forceRefresh),
        (data) => setAboutSection(data),
        null
      ) || loadedAny;
      
      // Fetch stats
      loadedAny = await safelyFetchContent(
        () => contentService.getStats(forceRefresh),
        (data) => setStats(data),
        []
      ) || loadedAny;
      
      // Fetch mission section
      loadedAny = await safelyFetchContent(
        () => contentService.getMissionSection(forceRefresh),
        (data) => setMissionSection(data),
        null
      ) || loadedAny;
      
      // Fetch services section and items
      try {
        const servicesData = await contentService.getServicesSection(forceRefresh);
        if (servicesData.section) setServicesSection(servicesData.section);
        if (servicesData.items) setServiceItems(servicesData.items);
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching services:", err);
      }
      
      // Fetch solutions section and items
      try {
        const solutionsData = await contentService.getSolutionsSection(forceRefresh);
        if (solutionsData.section) setSolutionsSection(solutionsData.section);
        if (solutionsData.items) setSolutionItems(solutionsData.items);
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching solutions:", err);
      }
      
      // Fetch tech stack section and categories
      try {
        const techStackData = await contentService.getTechStackSection(forceRefresh);
        if (techStackData.section) setTechStackSection(techStackData.section);
        if (techStackData.categories) setTechCategories(techStackData.categories);
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching tech stack:", err);
      }
      
      // Fetch clients section
      try {
        const clientsData = await contentService.getClientsSection(forceRefresh);
        if (clientsData.section) setClientsSection(clientsData.section);
        if (clientsData.clientLogos) setClientLogos(clientsData.clientLogos);
        if (clientsData.partnerLogos) setPartnerLogos(clientsData.partnerLogos);
        if (clientsData.testimonials) setTestimonials(clientsData.testimonials);
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching clients section:", err);
      }
      
      if (loadedAny) {
        setHasLoadedAnyContent(true);
        setError(null);
      } else if (!hasLoadedAnyContent) {
        // Only set error if we've never successfully loaded content
        setError("Unable to load content. Using fallback content instead.");
      }
      
      setLoading(false);
      
      if (forceRefresh && loadedAny) {
        toast.success("Content refreshed successfully");
      } else if (forceRefresh) {
        toast.error("Failed to refresh content");
      }
    } catch (err) {
      console.error("Error fetching content:", err);
      
      // Only set error if we've never loaded any content
      if (!hasLoadedAnyContent) {
        setError("Failed to load content. Using fallback content.");
      }
      
      setLoading(false);
      
      if (forceRefresh) {
        toast.error("Failed to refresh content");
      }
    }
  };

  // Set up a periodic check for content updates
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const hasUpdates = await contentService.checkForContentUpdates();
        if (hasUpdates) {
          console.log("Content updates detected, refreshing content");
          fetchAllContent(true);
        }
      } catch (err) {
        console.warn("Error checking for content updates:", err);
        // Continue even if update check fails
      }
    };
    
    // Initial fetch
    fetchAllContent();
    
    // Check for updates every minute
    const intervalId = setInterval(checkForUpdates, 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const refreshContent = async () => {
    await fetchAllContent(true);
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
