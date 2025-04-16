
import React from 'react';
import { Building, GraduationCap, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FounderSection = () => {
  return (
    <div className="container mx-auto px-4 mb-20">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="lg:w-1/3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gradient-text text-left">
            Meet Our Founder
          </h2>
          <div className="relative mb-4 group">
            {/* Enhanced cyberpunk background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-noesis-purple via-noesis-blue to-noesis-teal opacity-20 rounded-2xl blur-md"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-noesis-darkpurple via-transparent to-noesis-teal/30 rounded-2xl"></div>
            
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 rounded-2xl"></div>
            
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-noesis-purple via-noesis-blue to-noesis-teal rounded-2xl blur-sm group-hover:blur opacity-75 transition duration-1000 group-hover:opacity-100"></div>
            
            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm">
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-noesis-purple/30 via-noesis-blue/20 to-transparent mix-blend-overlay"></div>
              
              <img 
                src="/lovable-uploads/83d6e966-1792-4d06-8a94-2e4840a6f17a.png"
                alt="Sidd - Founder of Noesis.tech"
                className="rounded-2xl w-full object-cover shadow-xl relative z-[1] transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Enhanced scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-noesis-purple/5 to-transparent bg-[length:100%_4px] animate-pulse opacity-30"></div>
              
              {/* Cyberpunk noise texture */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 mix-blend-overlay"></div>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h4 className="text-xl font-semibold text-white mb-1">Siddharth Bhansali</h4>
            <p className="text-noesis-purple">Founder & CEO</p>
          </div>
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
