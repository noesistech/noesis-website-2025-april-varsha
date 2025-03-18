
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

  const fetchAllContent = async (forceRefresh = false) => {
    try {
      setLoading(true);
      
      // Initialize cache from localStorage if available and not forcing refresh
      if (!forceRefresh) {
        contentCacheService.initializeCache();
      } else {
        // For force refresh, we'll completely clear the cache
        contentCacheService.invalidateCache();
      }
      
      // Check for content updates in the background
      const hasUpdates = await contentService.checkForContentUpdates();
      console.log(`Content updates available: ${hasUpdates}`);
      
      // Fetch hero section
      const heroData = await contentService.getHeroSection(forceRefresh);
      setHeroSection(heroData);
      
      // Fetch service cards
      const serviceCardsData = await contentService.getServiceCards(forceRefresh);
      setServiceCards(serviceCardsData);
      
      // Fetch about section
      const aboutData = await contentService.getAboutSection(forceRefresh);
      setAboutSection(aboutData);
      
      // Fetch stats
      const statsData = await contentService.getStats(forceRefresh);
      setStats(statsData);
      
      // Fetch mission section
      const missionData = await contentService.getMissionSection(forceRefresh);
      setMissionSection(missionData);
      
      // Fetch services section and items
      const servicesData = await contentService.getServicesSection(forceRefresh);
      setServicesSection(servicesData.section);
      setServiceItems(servicesData.items);
      
      // Fetch solutions section and items
      const solutionsData = await contentService.getSolutionsSection(forceRefresh);
      setSolutionsSection(solutionsData.section);
      setSolutionItems(solutionsData.items);
      
      // Fetch tech stack section and categories
      const techStackData = await contentService.getTechStackSection(forceRefresh);
      setTechStackSection(techStackData.section);
      setTechCategories(techStackData.categories);
      
      // Fetch clients section
      const clientsData = await contentService.getClientsSection(forceRefresh);
      setClientsSection(clientsData.section);
      setClientLogos(clientsData.clientLogos);
      setPartnerLogos(clientsData.partnerLogos);
      setTestimonials(clientsData.testimonials);
      
      setLoading(false);
      
      if (forceRefresh) {
        toast.success("Content refreshed successfully");
      }
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to load content. Please refresh the page.");
      setLoading(false);
      if (forceRefresh) {
        toast.error("Failed to refresh content");
      }
    }
  };

  // Set up a periodic check for content updates
  useEffect(() => {
    const checkForUpdates = async () => {
      const hasUpdates = await contentService.checkForContentUpdates();
      if (hasUpdates) {
        console.log("Content updates detected, refreshing content");
        fetchAllContent(true);
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
        refreshContent
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
