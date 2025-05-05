import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { Card } from './ui/card';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import TeamSection from './TeamSection';
import FounderSection from './founder/FounderSection';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const positionGroups: Record<string, string> = {
  'Sr. Project Manager': 'Management',
  'Manager': 'Management',
  'Project Manager': 'Management',
  'Project Coordinator': 'Management',
  'UI/UX Manager': 'Design',
  'Sr. DevOps Engineer': 'IT & Operations',
  'Full Stack Developer': 'Development',
  'Frontend Developer': 'Development',
  'Senior Frontend Developer': 'Development',
  'Senior QA Engineer': 'Quality Assurance',
  'Senior Quality Assurance Tester': 'Quality Assurance',
  'Jr. QA Tester': 'Quality Assurance',
  'SR. IT Executive': 'IT & Operations',
  'Jr. Finance Executive': 'Finance',
  'Finance Manager': 'Finance',
  'Urvashi Khatri': 'Management',
  'Renu Vishwakarma': 'Finance',
  'Sachin Bodke': 'IT & Operations'
};
const getGroupForMember = (member: any): string => {
  if (member.name === 'Urvashi Khatri') return 'Management';
  if (member.name === 'Renu Vishwakarma') return 'Finance';
  if (member.position === 'Sr. DevOps Engineer' && member.name === 'Sachin Bodke') return 'IT & Operations';
  return positionGroups[member.position] || 'Other';
};
const FilterableTeamSection = () => {
  const {
    teamSection,
    teamMembers
  } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [departmentGroups, setDepartmentGroups] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const needsAccordion = isMobile || isTablet;
  useEffect(() => {
    if (teamMembers && teamMembers.length > 0) {
      const uniqueGroups = new Set<string>(['All']);
      teamMembers.forEach(member => {
        const group = getGroupForMember(member);
        uniqueGroups.add(group);
      });
      const groupOrder = ['All', 'Management', 'Design', 'Development', 'Quality Assurance', 'IT & Operations', 'Finance', 'Other'];
      setDepartmentGroups(groupOrder.filter(g => uniqueGroups.has(g)));
    }
  }, [teamMembers]);
  const groupedTeamMembers = departmentGroups.reduce((acc, group) => {
    if (group === 'All') return acc;
    acc[group] = teamMembers?.filter(member => getGroupForMember(member) === group) || [];
    return acc;
  }, {} as Record<string, typeof teamMembers>);
  const filteredTeamMembers = selectedCategory === 'All' ? teamMembers || [] : groupedTeamMembers[selectedCategory] || [];
  return;
};
export default FilterableTeamSection;