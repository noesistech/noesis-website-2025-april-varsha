
import React from 'react';
import { Building, GraduationCap, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FounderSectionProps {
  showCta?: boolean;
}

const FounderSection = ({ showCta = false }: FounderSectionProps) => {
  return (
    <div className="container mx-auto px-4 mb-4 sm:mb-20">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="lg:w-1/3">
          <h2 className="section-title text-left gradient-text mb-6">
            Meet Our Founder
          </h2>
          <div className="relative mb-4 overflow-hidden rounded-2xl">
            {/* Base image */}
            <img src="/lovable-uploads/af4dc9fd-e708-4fc8-b6e5-d4dee4f5961d.png" alt="Sidd - Founder of Noesis.tech" className="w-full h-auto relative z-[1]" />
            
            {/* Color overlay with blend mode */}
            <div className="absolute inset-0 bg-gradient-to-tr from-noesis-purple/60 via-noesis-blue/40 to-noesis-teal/50 mix-blend-overlay z-[2]"></div>
            
            {/* Cyberpunk scan lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_2px] animate-pulse opacity-30 z-[3]"></div>
            
            {/* Enhanced glow effect around borders */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-noesis-purple via-noesis-blue to-noesis-teal rounded-2xl blur opacity-50 z-[0]"></div>
          </div>
          <div className="text-center lg:text-left">
            <h4 className="text-xl font-semibold text-white mb-1">Siddharth Bhansali</h4>
            <p className="text-noesis-purple">Founder & CEO</p>
          </div>

          {showCta && (
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link to="/about">
                <Button variant="rainbow" className="px-6 py-2 text-base">
                  Meet Our Full Team
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="lg:w-2/3">
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
