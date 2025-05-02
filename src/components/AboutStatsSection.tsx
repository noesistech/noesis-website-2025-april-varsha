import React from 'react';
import { Users, Award, Clock, Percent } from 'lucide-react';
import P5Animation from './P5Animation';
import { useDeviceType } from '@/hooks/use-mobile';
import { useContent } from '@/contexts/ContentContext';
const AboutStatsSection = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const {
    stats
  } = useContent();
  return;
};
const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case 'Users':
      return <Users className="w-6 h-6 text-purple-400" />;
    case 'Trophy':
      return <Award className="w-6 h-6 text-purple-400" />;
    case 'Calendar':
      return <Clock className="w-6 h-6 text-purple-400" />;
    case 'Percent':
    default:
      return <Percent className="w-6 h-6 text-purple-400" />;
  }
};
export default AboutStatsSection;