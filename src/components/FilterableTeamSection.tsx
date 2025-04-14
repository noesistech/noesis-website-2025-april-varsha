
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Users } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import TeamSection from './TeamSection';
import { ScrollArea } from './ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

const FilterableTeamSection = () => {
  const { teamSection, teamMembers } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [departmentGroups, setDepartmentGroups] = useState<string[]>([]);
  const isMobile = useIsMobile();

  // Extract unique department groups from team member positions
  useEffect(() => {
    if (teamMembers && teamMembers.length > 0) {
      // Group similar positions together
      const positionGroups: Record<string, string> = {
        'Sr. Project Manager': 'Management',
        'Manager': 'Management',
        'Project Coordinator': 'Management',
        'UI/UX Manager': 'Design',
        'Sr. DevOps Engineer': 'Engineering',
        'Senior QA Engineer': 'Quality Assurance',
        'Senior Quality Assurance Tester': 'Quality Assurance',
        'Jr. QA Tester': 'Quality Assurance',
        'SR. IT Executive': 'IT & Operations',
        'Jr. Finance Executive': 'Finance'
      };

      // Get unique department groups
      const uniqueGroups = new Set(['All']);
      
      teamMembers.forEach(member => {
        const group = positionGroups[member.position] || 'Other';
        uniqueGroups.add(group);
      });
      
      setDepartmentGroups(Array.from(uniqueGroups));
    }
  }, [teamMembers]);

  const filteredTeamMembers = teamMembers?.filter(member => {
    if (selectedCategory === 'All') return true;
    
    // Map positions to department groups
    const positionGroups: Record<string, string> = {
      'Sr. Project Manager': 'Management',
      'Manager': 'Management',
      'Project Coordinator': 'Management',
      'UI/UX Manager': 'Design',
      'Sr. DevOps Engineer': 'Engineering',
      'Senior QA Engineer': 'Quality Assurance',
      'Senior Quality Assurance Tester': 'Quality Assurance',
      'Jr. QA Tester': 'Quality Assurance',
      'SR. IT Executive': 'IT & Operations',
      'Jr. Finance Executive': 'Finance'
    };
    
    return positionGroups[member.position] === selectedCategory;
  }) || [];

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-noesis-dark to-noesis-darker">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="gradient-text">{teamSection?.title || 'Our Team'}</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            {teamSection?.subtitle || 'Meet the talented people behind our success'}
          </p>
        </div>

        {/* Department Filter - Scrollable on mobile */}
        <div className="flex justify-center mb-12">
          <Card className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-1 overflow-hidden w-full max-w-3xl">
            <ScrollArea className="w-full">
              <div className={`flex ${isMobile ? 'px-4 py-2' : ''}`}>
                <ToggleGroup 
                  type="single" 
                  value={selectedCategory} 
                  onValueChange={(value) => value && setSelectedCategory(value)}
                  className="flex-nowrap"
                >
                  {departmentGroups.map((group) => (
                    <ToggleGroupItem 
                      key={group} 
                      value={group}
                      aria-label={`Filter by ${group}`}
                      className="px-4 py-2 text-white/80 data-[state=on]:bg-noesis-purple data-[state=on]:text-white transition-colors whitespace-nowrap"
                    >
                      {group}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </ScrollArea>
          </Card>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <TeamSection 
              title=""
              subtitle=""
              teamMembers={filteredTeamMembers}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FilterableTeamSection;
