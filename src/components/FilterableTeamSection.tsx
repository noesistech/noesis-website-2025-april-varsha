import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import { Card } from './ui/card';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import TeamSection from './TeamSection';
import FounderSection from './founder/FounderSection';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
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

  return <section id="team" className="bg-gradient-to-b from-noesis-dark to-noesis-darker pt-16">
      <div className="container px-4 mx-auto my-0">
        <div className="text-center mb-12">
          <h2 className="section-title">
            <span className="text-white">Our&nbsp;</span>
            <span className="gradient-text">{teamSection?.title?.replace(/^Our\s*/, '') || 'Team'}</span>
          </h2>
          <p className="text-standard max-w-3xl mx-auto">
            {teamSection?.subtitle || 'Meet the talented professionals behind our success'}
          </p>
        </div>

        <FounderSection />

        {isMobile ? <Accordion type="single" collapsible className="w-full mb-8">
            {departmentGroups.map(group => <AccordionItem key={group} value={group}>
                <AccordionTrigger className="text-white hover:no-underline">
                  {group}
                </AccordionTrigger>
                <AccordionContent>
                  {group === 'All' ? <TeamSection title="" subtitle="" teamMembers={teamMembers || []} /> : <TeamSection title="" subtitle="" teamMembers={groupedTeamMembers[group] || []} />}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion> : <>
            <div className="flex justify-center mb-12">
              <Card className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-1 overflow-hidden w-full max-w-3xl">
                <ScrollArea className="w-full">
                  <div className={`flex ${isMobile ? 'px-4 py-2' : ''}`}>
                    <ToggleGroup type="single" value={selectedCategory} onValueChange={value => value && setSelectedCategory(value)} className="flex-nowrap">
                      {departmentGroups.map(group => <ToggleGroupItem key={group} value={group} aria-label={`Filter by ${group}`} className="px-4 py-2 text-white/80 data-[state=on]:bg-noesis-purple data-[state=on]:text-white transition-colors whitespace-nowrap">
                          {group}
                        </ToggleGroupItem>)}
                    </ToggleGroup>
                  </div>
                </ScrollArea>
              </Card>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={selectedCategory} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.3
          }}>
                <TeamSection title="" subtitle="" teamMembers={selectedCategory === 'All' ? teamMembers || [] : groupedTeamMembers[selectedCategory] || []} />
              </motion.div>
            </AnimatePresence>
          </>}
      </div>
    </section>;
};

export default FilterableTeamSection;
