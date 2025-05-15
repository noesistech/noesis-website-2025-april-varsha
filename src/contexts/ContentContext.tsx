
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
  Testimonial,
  ContactSection
} from '@/types/contentTypes';
import { AICapability, AIProduct } from '@/components/AICapabilitiesSection';
import { TeamMember } from '@/components/TeamSection';

// Import data from the new modular files
import { heroSectionData, serviceCardsData } from '@/data/content/hero';
import { aboutSectionData, statsData } from '@/data/content/about';
import { missionSectionData } from '@/data/content/mission';
import { servicesSectionData, serviceItemsData } from '@/data/content/services';
import { solutionsSectionData, solutionItemsData } from '@/data/content/solutions';
import { techStackSectionData, techCategoriesData } from '@/data/content/techstack';
import { 
  aiCapabilitiesSectionData, 
  aiCapabilitiesData, 
  aiProductsData,
  aiProductsSectionData 
} from '@/data/content/aiCapabilities';
import { 
  clientsSectionData, 
  clientLogosData, 
  partnerLogosData, 
  testimonialsData 
} from '@/data/content/clients';
import { teamSectionData, teamMembersData } from '@/data/content/team';
import { contactSectionData } from '@/data/content/contact';

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
  aiCapabilitiesSection: {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
  };
  aiCapabilities: AICapability[];
  aiProducts: AIProduct[];
  aiProductsSection: {
    id: string;
    title: string;
    subtitle: string;
    created_at: string;
    updated_at: string;
  };
  teamSection: {
    id: string;
    title: string;
    subtitle?: string;
    created_at: string;
    updated_at: string;
  };
  teamMembers: TeamMember[];
  clientsSection: ClientsSection;
  clientLogos: ClientLogo[];
  partnerLogos: PartnerLogo[];
  testimonials: Testimonial[];
  contactSection: ContactSection;
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
  const [aiCapabilitiesSection] = useState(aiCapabilitiesSectionData);
  const [aiCapabilities] = useState<AICapability[]>(aiCapabilitiesData);
  const [aiProducts] = useState<AIProduct[]>(aiProductsData);
  const [aiProductsSection] = useState(aiProductsSectionData);
  const [teamSection] = useState(teamSectionData);
  const [teamMembers] = useState<TeamMember[]>(teamMembersData);
  const [clientsSection] = useState<ClientsSection>(clientsSectionData);
  const [clientLogos] = useState<ClientLogo[]>(clientLogosData);
  const [partnerLogos] = useState<PartnerLogo[]>(partnerLogosData);
  const [testimonials] = useState<Testimonial[]>(testimonialsData);
  const [contactSection] = useState<ContactSection>(contactSectionData);

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
        aiCapabilitiesSection,
        aiCapabilities,
        aiProducts,
        aiProductsSection,
        teamSection,
        teamMembers,
        clientsSection,
        clientLogos,
        partnerLogos,
        testimonials,
        contactSection,
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
