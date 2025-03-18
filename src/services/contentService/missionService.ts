
import { MissionSection } from '@/types/supabase';
import { baseContentService } from './baseContentService';

export const missionService = {
  async getMissionSection(forceRefresh = false): Promise<MissionSection | null> {
    return baseContentService.fetchContent<MissionSection>(
      'mission_section', 
      'missionSection', 
      forceRefresh, 
      { isSingle: true }
    );
  }
};
