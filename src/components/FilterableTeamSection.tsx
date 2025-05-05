
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
    <section className="py-12 bg-gradient-to-b from-[#1A1F2C] to-[#191D29]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Meet Our <span className="text-noesis-purple">Team</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our team of dedicated professionals combines expertise across various domains to deliver exceptional results.
          </p>
        </div>

        {needsAccordion ? (
          // Mobile/Tablet View with Accordion
          <div className="mb-8">
            <Accordion type="single" collapsible defaultValue="All" className="w-full">
              {departmentGroups.map((group) => (
                <AccordionItem key={group} value={group} className="border-b border-gray-700">
                  <AccordionTrigger className="text-white hover:text-noesis-purple transition-colors py-4">
                    {group} {group !== 'All' && `(${groupedTeamMembers[group]?.length || 0})`}
                  </AccordionTrigger>
                  <AccordionContent>
                    {group === 'All' ? (
                      <TeamSection 
                        title="" 
                        teamMembers={teamMembers || []} 
                      />
                    ) : (
                      <TeamSection 
                        title="" 
                        teamMembers={groupedTeamMembers[group] || []} 
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          // Desktop View with Toggle Group
          <>
            <div className="flex justify-center mb-8">
              <ToggleGroup 
                type="single" 
                value={selectedCategory}
                onValueChange={(value) => value && setSelectedCategory(value)}
                className="flex flex-wrap justify-center gap-2"
              >
                {departmentGroups.map((group) => (
                  <ToggleGroupItem 
                    key={group} 
                    value={group}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === group 
                        ? 'bg-noesis-purple text-white' 
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
                    } border border-purple-500/20 transition-all duration-300`}
                  >
                    {group} {group !== 'All' && `(${groupedTeamMembers[group]?.length || 0})`}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

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
          </>
        )}
      </div>
    </section>
  );
};

export default FilterableTeamSection;
