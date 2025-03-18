
export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  cta_primary_text: string;
  cta_secondary_text: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceCard {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  id: string;
  title: string;
  subtitle: string;
  description_1: string;
  description_2: string;
  description_3: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Stat {
  id: string;
  icon_name: string;
  value: string;
  label: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface MissionSection {
  id: string;
  mission_title: string;
  mission_description: string;
  vision_title: string;
  vision_description: string;
  promise_title: string;
  promise_text: string;
  created_at: string;
  updated_at: string;
}

export interface ServicesSection {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SolutionsSection {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface SolutionItem {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TechStackSection {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Technology {
  id: string;
  category_id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TechCategory {
  id: string;
  title: string;
  key: string;
  sort_order: number;
  is_cloud_stack: boolean;
  created_at: string;
  updated_at: string;
  technologies?: Technology[];
}

export interface ClientsSection {
  id: string;
  title: string;
  clients_subtitle: string;
  partners_subtitle: string;
  testimonials_subtitle: string;
  created_at: string;
  updated_at: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
