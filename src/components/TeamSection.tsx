
import React, { useState } from 'react';
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

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1400px]">
        {teamMembers.map((member) => (
          <Card 
            key={member.id} 
            className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:border-noesis-purple/50 transition-all duration-300 group h-full"
          >
            <div className="relative overflow-hidden h-48 sm:h-40">
              <AspectRatio ratio={1/1}>
                <div className="w-full h-full bg-gradient-to-b from-noesis-darker to-noesis-purple/20 absolute inset-0 z-10 opacity-50"></div>
                {imageErrors[member.id] ? (
                  <img
                    src={getStockImage(member.id)}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={member.image_url || getStockImage(member.id)}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(member.id)}
                    loading="lazy"
                  />
                )}
              </AspectRatio>
            </div>
            
            <CardContent className="p-4 flex-1 flex flex-col justify-between text-center">
              <div>
                <h3 className="text-base font-semibold gradient-text">{member.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Briefcase size={12} className="text-noesis-purple" />
                  <p className="text-xs text-white/80">{member.position}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-xs text-white/70">{member.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
