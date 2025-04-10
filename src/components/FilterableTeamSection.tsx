
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useContentContext } from '../contexts/ContentContext';

const FilterableTeamSection = () => {
  const { teamContent } = useContentContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Extract all unique departments/categories from team data
  useEffect(() => {
    if (teamContent?.members) {
      const categories = ['All', ...new Set(teamContent.members.map(member => member.department))];
      setAllCategories(categories);
    }
  }, [teamContent]);

  const filteredTeamMembers = teamContent?.members?.filter(member => 
    selectedCategory === 'All' || member.department === selectedCategory
  ) || [];

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{teamContent?.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{teamContent?.description}</p>
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
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-72 overflow-hidden">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-2">{member.title}</p>
                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {member.department}
                  </Badge>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">{member.bio}</p>
                  
                  {member.socialMedia && (
                    <div className="mt-4 flex gap-3">
                      {member.socialMedia.map(social => (
                        <a 
                          key={social.platform} 
                          href={social.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-orange-500 transition-colors"
                          aria-label={`${member.name}'s ${social.platform}`}
                        >
                          {social.platform === 'Twitter' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          )}
                          {social.platform === 'LinkedIn' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                            </svg>
                          )}
                          {social.platform === 'GitHub' && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
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
