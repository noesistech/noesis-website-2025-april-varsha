
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

  return (
    <section className="py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-noesis-purple">Team</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the talented professionals who make our vision a reality through creativity, technical expertise, and dedication.
          </p>
        </div>
        
        {/* Department Filter - Desktop/Tablet Version */}
        {!needsAccordion && departmentGroups.length > 0 && (
          <div className="mb-8 flex justify-center">
            <ToggleGroup 
              type="single" 
              value={selectedCategory}
              onValueChange={(value) => value && setSelectedCategory(value)}
              className="bg-noesis-darker/70 p-1 rounded-lg border border-noesis-purple/20"
            >
              {departmentGroups.map(group => (
                <ToggleGroupItem 
                  key={group} 
                  value={group}
                  aria-label={`Filter by ${group}`}
                  className="px-4 py-2 data-[state=on]:bg-noesis-purple data-[state=on]:text-white"
                >
                  {group}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}
        
        {/* Department Filter - Mobile Accordion Version */}
        {needsAccordion && departmentGroups.length > 0 && (
          <div className="mb-8 mx-auto max-w-md">
            <Accordion type="single" collapsible className="bg-noesis-darker/70 rounded-lg border border-noesis-purple/20">
              <AccordionItem value="departments">
                <AccordionTrigger className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span>Filter by Department:</span> 
                    <span className="text-noesis-purple font-medium">{selectedCategory}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ScrollArea className="h-48 px-4 py-2">
                    <div className="space-y-2">
                      {departmentGroups.map(group => (
                        <button
                          key={group}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedCategory === group 
                              ? 'bg-noesis-purple text-white' 
                              : 'hover:bg-noesis-purple/20'
                          }`}
                          onClick={() => setSelectedCategory(group)}
                        >
                          {group}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        
        {/* Team Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TeamSection
              title=""
              teamMembers={filteredTeamMembers}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FilterableTeamSection;
