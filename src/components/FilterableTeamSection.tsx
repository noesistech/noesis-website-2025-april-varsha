
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useContent } from '../contexts/ContentContext';

const FilterableTeamSection = () => {
  const { teamSection, teamMembers } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Extract all unique departments/categories from team data
  useEffect(() => {
    if (teamMembers) {
      const categories = ['All', ...new Set(teamMembers.map(member => member.position))];
      setAllCategories(categories);
    }
  }, [teamMembers]);

  const filteredTeamMembers = teamMembers?.filter(member => 
    selectedCategory === 'All' || member.position === selectedCategory
  ) || [];

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{teamSection?.title || 'Our Team'}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{teamSection?.subtitle || 'Meet the talented people behind our success'}</p>
        </div>

        {/* Category Filter - Mobile */}
        <div className="md:hidden mb-6">
          <Button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outline"
            className="w-full flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter size={18} />
              Filter by: {selectedCategory}
            </span>
            {isFilterOpen ? <X size={18} /> : <Filter size={18} />}
          </Button>
          
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-md shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <Badge 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${selectedCategory === category ? 'bg-orange-500 hover:bg-orange-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Category Filter - Desktop */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 mb-10">
          {allCategories.map(category => (
            <Badge 
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer text-sm px-4 py-1 ${
                selectedCategory === category ? 'bg-orange-500 hover:bg-orange-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredTeamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-72 overflow-hidden">
                  <img 
                    src={member.image_url} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-2">{member.position}</p>
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {member.position}
                  </Badge>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FilterableTeamSection;
