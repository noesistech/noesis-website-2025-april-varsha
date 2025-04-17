
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Briefcase, 
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
  grayscale?: boolean;
}

interface TeamSectionProps {
  title: string;
  subtitle?: string;
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ title, subtitle, teamMembers }) => {
  const isMobile = useIsMobile();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Stock images of people to use as fallbacks
  const stockImages = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80", 
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80"
  ];

  const handleImageError = (memberId: string) => {
    console.log(`Image error for member ${memberId}`);
    setImageErrors(prev => ({
      ...prev,
      [memberId]: true
    }));
  };

  // Function to get a stock image based on team member ID
  const getStockImage = (id: string) => {
    // Use the last character of the ID as a numeric hash
    const lastChar = id.slice(-1);
    const index = parseInt(lastChar, 36) % stockImages.length;
    return stockImages[index];
  };
  
  useEffect(() => {
    console.log("TeamSection rendering with members:", teamMembers);
    // Reset image errors when team members change
    setImageErrors({});
  }, [teamMembers]);

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1400px]">
        {teamMembers.map((member) => (
          <Card 
            key={member.id} 
            className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:border-noesis-purple/50 transition-all duration-300 group h-full"
          >
            <div className="relative overflow-hidden h-48 sm:h-40">
              <AspectRatio ratio={1/1} className="bg-gradient-to-b from-noesis-darker to-noesis-purple/30">
                {/* Enhanced cyberpunk background styling */}
                <div className="w-full h-full bg-gradient-to-b from-noesis-darker to-noesis-purple/30 absolute inset-0 z-10 opacity-60"></div>
                
                {/* Apply consistent styling for all team members */}
                <div className="relative w-full h-full flex justify-center items-start overflow-hidden">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className={`max-w-full max-h-full object-contain object-top transition-transform duration-500 group-hover:scale-105 relative z-[1] ${
                      member.grayscale ? 'grayscale' : ''
                    }`}
                    onError={() => handleImageError(member.id)}
                    loading="lazy"
                  />
                  
                  {imageErrors[member.id] && (
                    <div className="absolute inset-0 flex items-center justify-center z-[2]">
                      <Avatar className="h-24 w-24 bg-noesis-purple/20 border border-noesis-purple/40">
                        <AvatarFallback className="bg-noesis-purple/20 text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  
                  {/* Enhanced cyberpunk effects for all team members */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-noesis-darkpurple/50 via-noesis-blue/30 to-noesis-teal/40 mix-blend-overlay z-[2]"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_2px] animate-pulse opacity-40 z-[3]"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-noesis-purple/30 to-transparent opacity-80 z-[2] mix-blend-screen"></div>
                  
                  {/* Subtle digital noise texture */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMjAwdjIwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-25 z-[3]"></div>
                </div>
              </AspectRatio>
            </div>
            
            <CardContent className="p-4 flex-1 flex flex-col justify-between text-left">
              <div>
                <h3 className="text-base font-semibold gradient-text">{member.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Briefcase size={12} className="text-noesis-purple" />
                  <p className="text-xs text-white/80">{member.position}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-white/70">{member.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
