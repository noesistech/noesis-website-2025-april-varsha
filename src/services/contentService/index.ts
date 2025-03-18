
import { contentCacheService } from '../contentCacheService';
import { heroService } from './heroService';
import { aboutService } from './aboutService';
import { missionService } from './missionService';
import { servicesService } from './servicesService';
import { solutionsService } from './solutionsService';
import { techStackService } from './techStackService';
import { clientsService } from './clientsService';

// Export the combined content service
export const contentService = {
  // Hero section methods
  getHeroSection: heroService.getHeroSection,
  getServiceCards: heroService.getServiceCards,
  
  // About section methods
  getAboutSection: aboutService.getAboutSection,
  getStats: aboutService.getStats,
  
  // Mission section methods
  getMissionSection: missionService.getMissionSection,
  
  // Services section methods
  getServicesSection: servicesService.getServicesSection,
  
  // Solutions section methods
  getSolutionsSection: solutionsService.getSolutionsSection,
  
  // Tech stack section methods
  getTechStackSection: techStackService.getTechStackSection,
  
  // Clients section methods
  getClientsSection: clientsService.getClientsSection,
  
  // Content update checking
  async checkForContentUpdates(): Promise<boolean> {
    return contentCacheService.checkForUpdates();
  }
};
