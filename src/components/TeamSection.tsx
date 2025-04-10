
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  User
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface TeamSectionProps {
  title: string;
  subtitle?: string;
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, subtitle, teamMembers }) => {
  const isMobile = useIsMobile();
  const [expandedMember, setExpandedMember] = React.useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const toggleBio = (id: string) => {
    if (expandedMember === id) {
      setExpandedMember(null);
    } else {
      setExpandedMember(id);
    }
  };

  const handleImageError = (memberId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [memberId]: true
    }));
    console.error(`Failed to load image for team member: ${memberId}`);
  };

  return (
    <section id="team" className="bg-gradient-to-b from-noesis-dark to-noesis-darker py-[50px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="text-lg text-white/70 max-w-3xl mx-auto mt-4">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card 
              key={member.id} 
              className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:border-noesis-purple/50 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <AspectRatio ratio={1}>
                  <div className="w-full h-full bg-gradient-to-b from-noesis-darker to-noesis-purple/20 absolute inset-0 z-10 opacity-50"></div>
                  {imageErrors[member.id] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                      <Avatar className="h-32 w-32">
                        <AvatarFallback className="text-4xl bg-gray-800 text-gray-400">
                          <User size={60} />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ) : (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={() => handleImageError(member.id)}
                      loading="lazy"
                    />
                  )}
                </AspectRatio>
              </div>
              
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold gradient-text">{member.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <Briefcase size={14} className="text-noesis-purple" />
                  <p className="text-sm text-white/80">{member.position}</p>
                </div>
                
                <div className="relative">
                  <div className={`text-sm text-white/70 transition-all duration-300 overflow-hidden ${
                    expandedMember === member.id ? 'max-h-[500px]' : 'max-h-[80px]'
                  }`}>
                    {member.bio}
                  </div>
                  
                  {member.bio.length > 150 && (
                    <button 
                      onClick={() => toggleBio(member.id)}
                      className="flex items-center text-xs text-noesis-purple mt-2 hover:text-noesis-teal transition-colors"
                    >
                      {expandedMember === member.id ? (
                        <>
                          <span>Read Less</span>
                          <ChevronUp size={14} className="ml-1" />
                        </>
                      ) : (
                        <>
                          <span>Read More</span>
                          <ChevronDown size={14} className="ml-1" />
                        </>
                      )}
                    </button>
                  )}
                  
                  {expandedMember !== member.id && member.bio.length > 150 && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
