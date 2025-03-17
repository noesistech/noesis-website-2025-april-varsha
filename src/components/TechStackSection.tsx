
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TechCategory = {
  title: string;
  key: string;
  technologies: string[];
};

const techStack: TechCategory[] = [
  {
    title: 'Interface and Front End Development',
    key: 'frontend',
    technologies: ['React', 'Angular', 'Vue.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']
  },
  {
    title: 'Serverless, Server-side and Back End Development',
    key: 'backend',
    technologies: ['Node.js', 'Python', 'Java', 'PHP', 'ASP.NET', 'Firebase', 'AWS Lambda', 'Express.js', 'Django']
  },
  {
    title: 'Mobile App Development',
    key: 'mobile',
    technologies: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'Xamarin']
  },
  {
    title: 'Databases',
    key: 'databases',
    technologies: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase Realtime DB', 'Redis', 'Elasticsearch', 'DynamoDB']
  },
  {
    title: 'Content/Commerce Management Systems',
    key: 'cms',
    technologies: ['WordPress', 'Shopify', 'Magento', 'WooCommerce', 'Contentful', 'Strapi', 'Sanity']
  },
  {
    title: 'Frameworks',
    key: 'frameworks',
    technologies: ['Laravel', 'Flask', '.NET Core', 'Spring Boot', 'Ruby on Rails', 'Django']
  },
];

const cloudStack: TechCategory[] = [
  {
    title: 'Cloudstack',
    key: 'cloudstack',
    technologies: ['AWS', 'Google Cloud Platform', 'Microsoft Azure', 'Digital Ocean', 'Heroku', 'Vercel', 'Netlify']
  },
  {
    title: 'DevOps',
    key: 'devops',
    technologies: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'CircleCI', 'Terraform', 'Ansible', 'Prometheus', 'Grafana']
  }
];

const TechStackSection = () => {
  const [activeTab, setActiveTab] = useState('tech');
  
  return (
    <section id="tech-stack" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-purple/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title mb-16">Our Technology Stack</h2>
        
        <Tabs defaultValue="tech" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="glass">
              <TabsTrigger 
                value="tech" 
                className="data-[state=active]:bg-noesis-purple data-[state=active]:text-white"
                onClick={() => setActiveTab('tech')}
              >
                Tech Stack
              </TabsTrigger>
              <TabsTrigger 
                value="cloud"
                className="data-[state=active]:bg-noesis-blue data-[state=active]:text-white"
                onClick={() => setActiveTab('cloud')}
              >
                Cloud Stack
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="tech" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {techStack.map((category) => (
                <div key={category.key} className="glass-card">
                  <h3 className="text-xl font-bold mb-4 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 hover:bg-noesis-purple/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cloudStack.map((category) => (
                <div key={category.key} className="glass-card">
                  <h3 className="text-xl font-bold mb-4 gradient-text">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/80 hover:bg-noesis-blue/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TechStackSection;
