
import React from 'react';
import { Building, GraduationCap, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FounderSection = () => {
  return (
    <div className="container mx-auto px-4 mb-20">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="lg:w-1/3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-noesis-purple/20 to-transparent rounded-2xl"></div>
            <img 
              src="/lovable-uploads/83d6e966-1792-4d06-8a94-2e4840a6f17a.png"
              alt="Sidd - Founder of Noesis.tech"
              className="rounded-2xl w-full object-cover shadow-xl"
            />
          </div>
        </div>

        <div className="lg:w-2/3">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">Meet Our Founder</h3>
          
          <Card className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Building className="w-6 h-6 text-noesis-purple flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Founder & CEO</h4>
                  <p className="text-white/80 leading-relaxed">
                    Sidd is a dynamic technology entrepreneur and seasoned consultant, combining deep expertise in AI, digital transformation, and software engineering. As the founder of Noesis.tech, he leads a team focused on building impactful tech solutions that drive growth for startups and mid-sized enterprises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <GraduationCap className="w-6 h-6 text-noesis-purple flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Education & Expertise</h4>
                  <p className="text-white/80 leading-relaxed">
                    Holding a Bachelor of Science from USC's Marshall School of Business and an advanced software engineering certification from IIT Madras, Sidd specializes in Cloud, Blockchain, and IoT technologies. His expertise has been instrumental in developing innovative AI solutions like Brainstormer Studio and Brainstormer Teams.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Briefcase className="w-6 h-6 text-noesis-purple flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Vision & Innovation</h4>
                  <p className="text-white/80 leading-relaxed">
                    Through Noesis.tech, Sidd has pioneered solutions like Brainstormer Studio, a low-code platform for creating AI agents, and Brainstormer Teams, a groundbreaking solution for internal AI deployment. His experience with Core Jewellery demonstrates his ability to merge technology with tradition, making him uniquely qualified to guide companies in leveraging AI for innovation and growth.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FounderSection;
