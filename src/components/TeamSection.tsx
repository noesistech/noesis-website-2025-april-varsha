
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

  // Stock images to use as fallbacks
  const stockImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80"
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
          
          <CardContent className="p-5">
            <h3 className="text-lg font-semibold gradient-text">{member.name}</h3>
            <div className="flex items-center gap-1 mb-3">
              <Briefcase size={14} className="text-noesis-purple" />
              <p className="text-sm text-white/80">{member.position}</p>
            </div>
            
            <div className="relative">
              <div className="text-sm text-white/70">
                {member.bio}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamSection;
