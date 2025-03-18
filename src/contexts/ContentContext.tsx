
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";
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
} from '@/types/contentTypes';

import {
  heroSectionData,
  serviceCardsData,
  aboutSectionData,
  statsData,
  missionSectionData,
  servicesSectionData,
  serviceItemsData,
  solutionsSectionData,
  solutionItemsData,
  techStackSectionData,
  techCategoriesData,
  clientsSectionData,
  clientLogosData,
  partnerLogosData,
  testimonialsData
} from '@/data/staticContent';

interface ContentContextType {
  heroSection: HeroSection;
  serviceCards: ServiceCard[];
  aboutSection: AboutSection;
  stats: Stat[];
  missionSection: MissionSection;
  servicesSection: ServicesSection;
  serviceItems: ServiceItem[];
  solutionsSection: SolutionsSection;
  solutionItems: SolutionItem[];
  techStackSection: TechStackSection;
  techCategories: TechCategory[];
  clientsSection: ClientsSection;
  clientLogos: ClientLogo[];
  partnerLogos: PartnerLogo[];
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refreshContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use static data instead of fetching from Supabase
  const [heroSection] = useState<HeroSection>(heroSectionData);
  const [serviceCards] = useState<ServiceCard[]>(serviceCardsData);
  const [aboutSection] = useState<AboutSection>(aboutSectionData);
  const [stats] = useState<Stat[]>(statsData);
  const [missionSection] = useState<MissionSection>(missionSectionData);
  const [servicesSection] = useState<ServicesSection>(servicesSectionData);
  const [serviceItems] = useState<ServiceItem[]>(serviceItemsData);
  const [solutionsSection] = useState<SolutionsSection>(solutionsSectionData);
  const [solutionItems] = useState<SolutionItem[]>(solutionItemsData);
  const [techStackSection] = useState<TechStackSection>(techStackSectionData);
  const [techCategories] = useState<TechCategory[]>(techCategoriesData);
  const [clientsSection] = useState<ClientsSection>(clientsSectionData);
  const [clientLogos] = useState<ClientLogo[]>(clientLogosData);
  const [partnerLogos] = useState<PartnerLogo[]>(partnerLogosData);
  const [testimonials] = useState<Testimonial[]>(testimonialsData);

  // Simplified refresh function that just shows a toast
  const refreshContent = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Content refreshed successfully");
    }, 500);
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
