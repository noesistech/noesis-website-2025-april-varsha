
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { contentService } from '@/services/contentService';
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

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setLoading(true);
        
        // Fetch hero section
        const heroData = await contentService.getHeroSection();
        setHeroSection(heroData);
        
        // Fetch service cards
        const serviceCardsData = await contentService.getServiceCards();
        setServiceCards(serviceCardsData);
        
        // Fetch about section
        const aboutData = await contentService.getAboutSection();
        setAboutSection(aboutData);
        
        // Fetch stats
        const statsData = await contentService.getStats();
        setStats(statsData);
        
        // Fetch mission section
        const missionData = await contentService.getMissionSection();
        setMissionSection(missionData);
        
        // Fetch services section and items
        const servicesData = await contentService.getServicesSection();
        setServicesSection(servicesData.section);
        setServiceItems(servicesData.items);
        
        // Fetch solutions section and items
        const solutionsData = await contentService.getSolutionsSection();
        setSolutionsSection(solutionsData.section);
        setSolutionItems(solutionsData.items);
        
        // Fetch tech stack section and categories
        const techStackData = await contentService.getTechStackSection();
        setTechStackSection(techStackData.section);
        setTechCategories(techStackData.categories);
        
        // Fetch clients section
        const clientsData = await contentService.getClientsSection();
        setClientsSection(clientsData.section);
        setClientLogos(clientsData.clientLogos);
        setPartnerLogos(clientsData.partnerLogos);
        setTestimonials(clientsData.testimonials);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to load content. Please refresh the page.");
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

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
        error
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
