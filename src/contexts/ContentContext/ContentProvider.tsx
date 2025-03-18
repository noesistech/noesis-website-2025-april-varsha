
import React, { createContext, useContext, useState, useEffect } from 'react';
import { contentService } from '@/services/contentService';
import { contentCacheService } from '@/services/contentCacheService';
import { toast } from "sonner";
import { ContentContextType, ContentProviderProps, ContentContextState } from './types';
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

// Create the context with a default undefined value
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Initial state for the content context
const initialState: ContentContextState = {
  heroSection: null,
  serviceCards: [],
  aboutSection: null,
  stats: [],
  missionSection: null,
  servicesSection: null,
  serviceItems: [],
  solutionsSection: null,
  solutionItems: [],
  techStackSection: null,
  techCategories: [],
  clientsSection: null,
  clientLogos: [],
  partnerLogos: [],
  testimonials: [],
  loading: true,
  error: null,
  hasLoadedAnyContent: false
};

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  // Use the initial state object to initialize all state values
  const [state, setState] = useState<ContentContextState>(initialState);

  // Helper function to safely fetch content with fallbacks
  const safelyFetchContent = async <T,>(
    fetchFn: () => Promise<T>, 
    updateStateFn: (data: T) => void, 
    defaultValue: T
  ): Promise<boolean> => {
    try {
      const data = await fetchFn();
      if (data) {
        updateStateFn(data);
        return true;
      }
    } catch (err) {
      console.error("Error fetching content item:", err);
    }
    return false;
  };

  const fetchAllContent = async (forceRefresh = false) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
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

      let loadedAny = false;

      // Fetch hero section
      loadedAny = await safelyFetchContent(
        () => contentService.getHeroSection(forceRefresh),
        (data) => setState(prev => ({ ...prev, heroSection: data })),
        null
      ) || loadedAny;
      
      // Fetch service cards
      loadedAny = await safelyFetchContent(
        () => contentService.getServiceCards(forceRefresh),
        (data) => setState(prev => ({ ...prev, serviceCards: data })),
        []
      ) || loadedAny;
      
      // Fetch about section
      loadedAny = await safelyFetchContent(
        () => contentService.getAboutSection(forceRefresh),
        (data) => setState(prev => ({ ...prev, aboutSection: data })),
        null
      ) || loadedAny;
      
      // Fetch stats
      loadedAny = await safelyFetchContent(
        () => contentService.getStats(forceRefresh),
        (data) => setState(prev => ({ ...prev, stats: data })),
        []
      ) || loadedAny;
      
      // Fetch mission section
      loadedAny = await safelyFetchContent(
        () => contentService.getMissionSection(forceRefresh),
        (data) => setState(prev => ({ ...prev, missionSection: data })),
        null
      ) || loadedAny;
      
      // Fetch services section and items
      try {
        const servicesData = await contentService.getServicesSection(forceRefresh);
        if (servicesData.section) setState(prev => ({ ...prev, servicesSection: servicesData.section }));
        if (servicesData.items) setState(prev => ({ ...prev, serviceItems: servicesData.items }));
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching services:", err);
      }
      
      // Fetch solutions section and items
      try {
        const solutionsData = await contentService.getSolutionsSection(forceRefresh);
        if (solutionsData.section) setState(prev => ({ ...prev, solutionsSection: solutionsData.section }));
        if (solutionsData.items) setState(prev => ({ ...prev, solutionItems: solutionsData.items }));
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching solutions:", err);
      }
      
      // Fetch tech stack section and categories
      try {
        const techStackData = await contentService.getTechStackSection(forceRefresh);
        if (techStackData.section) setState(prev => ({ ...prev, techStackSection: techStackData.section }));
        if (techStackData.categories) setState(prev => ({ ...prev, techCategories: techStackData.categories }));
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching tech stack:", err);
      }
      
      // Fetch clients section
      try {
        const clientsData = await contentService.getClientsSection(forceRefresh);
        if (clientsData.section) setState(prev => ({ ...prev, clientsSection: clientsData.section }));
        if (clientsData.clientLogos) setState(prev => ({ ...prev, clientLogos: clientsData.clientLogos }));
        if (clientsData.partnerLogos) setState(prev => ({ ...prev, partnerLogos: clientsData.partnerLogos }));
        if (clientsData.testimonials) setState(prev => ({ ...prev, testimonials: clientsData.testimonials }));
        loadedAny = true;
      } catch (err) {
        console.error("Error fetching clients section:", err);
      }
      
      if (loadedAny) {
        setState(prev => ({ 
          ...prev, 
          hasLoadedAnyContent: true,
          error: null
        }));
      } else if (!state.hasLoadedAnyContent) {
        // Only set error if we've never successfully loaded content
        setState(prev => ({ 
          ...prev, 
          error: "Unable to load content. Using fallback content instead."
        }));
      }
      
      setState(prev => ({ ...prev, loading: false }));
      
      if (forceRefresh && loadedAny) {
        toast.success("Content refreshed successfully");
      } else if (forceRefresh) {
        toast.error("Failed to refresh content");
      }
    } catch (err) {
      console.error("Error fetching content:", err);
      
      // Only set error if we've never loaded any content
      if (!state.hasLoadedAnyContent) {
        setState(prev => ({ 
          ...prev, 
          error: "Failed to load content. Using fallback content."
        }));
      }
      
      setState(prev => ({ ...prev, loading: false }));
      
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

  const contextValue: ContentContextType = {
    ...state,
    refreshContent
  };

  return (
    <ContentContext.Provider value={contextValue}>
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
