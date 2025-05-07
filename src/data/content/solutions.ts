
import { SolutionsSection, SolutionItem } from '@/types/contentTypes';

export const solutionsSectionData: SolutionsSection = {
  id: 'solutions-section-1',
  title: 'Our Solutions',
  subtitle: 'Tailored AI solutions for your industry challenges',
  created_at: '',
  updated_at: '',
};

export const solutionItemsData: SolutionItem[] = [
  {
    id: 'solution-item-1',
    icon_name: 'GraduationCap',
    title: 'AI-Powered Learning Management',
    description: 'Human-centered interface enhanced by AI for intuitive course creation and management',
    color: 'from-blue-500/20 to-blue-600/20',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'solution-item-2',
    icon_name: 'Cpu',
    title: 'Brainstormer',
    description: 'Our proprietary AI platform developed by human AI experts',
    color: 'from-purple-500/20 to-purple-600/20',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'solution-item-3',
    icon_name: 'ShoppingBag',
    title: 'eCommerce',
    description: 'Expert human designers directing AI tools for optimized website design and platform development',
    color: 'from-pink-500/20 to-pink-600/20',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'solution-item-4',
    icon_name: 'MessageSquare',
    title: 'Human-Directed AI Chatbots',
    description: 'Bespoke AI solutions crafted by human experts for your specific business needs',
    color: 'from-green-500/20 to-green-600/20',
    sort_order: 4,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'solution-item-5',
    icon_name: 'Wand2',
    title: 'Creative Technology',
    description: 'Chatbots that blend AI capabilities with human warmth for social media and website integration',
    color: 'from-yellow-500/20 to-yellow-600/20',
    sort_order: 5,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'solution-item-6',
    icon_name: 'Code2',
    title: 'App & Web Development',
    description: 'We build custom full-stack web apps with a mobile-first, responsive design approach. Powered by modern frameworks and AI-driven features like chatbots, personalization, and smart recommendations.',
    color: 'from-orange-500/20 to-orange-600/20',
    sort_order: 6,
    created_at: '',
    updated_at: '',
  }
];

// Industry-specific solutions data
export const industrySpecificSolutionsData = {
  title: "Industry-Specific Solutions",
  subtitle: "AI-powered solutions tailored for your industry's unique challenges",
  industries: [
    {
      id: 'industry-healthcare',
      title: 'Healthcare',
      description: 'Intelligent solutions that improve patient care, streamline operations, and enhance diagnostics.',
      icon_name: 'Heart',
      color: 'from-red-500/20 to-red-600/20',
      features: [
        'Predictive analytics for personalized patient care',
        'Automated medical record management',
        'Smart scheduling and resource allocation',
        'AI-powered diagnostic assistance tools'
      ]
    },
    {
      id: 'industry-finance',
      title: 'Finance & Banking',
      description: 'Secure, intelligent solutions that optimize operations and deliver exceptional service.',
      icon_name: 'Briefcase',
      color: 'from-blue-500/20 to-blue-600/20',
      features: [
        'Fraud detection and prevention systems',
        'Automated risk assessment',
        'Personalized financial recommendations',
        'AI-driven trading and investment platforms'
      ]
    },
    {
      id: 'industry-retail',
      title: 'Retail & eCommerce',
      description: 'Transform customer experiences and optimize sales with AI-enhanced shopping journeys.',
      icon_name: 'ShoppingCart',
      color: 'from-purple-500/20 to-purple-600/20',
      features: [
        'Intelligent product recommendation engines',
        'Dynamic pricing optimization',
        'Visual search capabilities',
        'Customer behavior analytics'
      ]
    },
    {
      id: 'industry-manufacturing',
      title: 'Manufacturing',
      description: 'Optimize production processes and maintain equipment efficiency with AI insights.',
      icon_name: 'Factory',
      color: 'from-green-500/20 to-green-600/20',
      features: [
        'Predictive maintenance solutions',
        'Quality control automation',
        'Supply chain optimization',
        'Production scheduling enhancements'
      ]
    },
    {
      id: 'industry-education',
      title: 'Education',
      description: 'Personalized learning experiences and streamlined administration for educational institutions.',
      icon_name: 'GraduationCap',
      color: 'from-yellow-500/20 to-yellow-600/20',
      features: [
        'Adaptive learning platforms',
        'Automated grading systems',
        'Student performance analytics',
        'Personalized learning path creation'
      ]
    },
    {
      id: 'industry-government',
      title: 'Government & Public Sector',
      description: 'Enhance public service delivery and operational efficiency for government organizations.',
      icon_name: 'Building',
      color: 'from-orange-500/20 to-orange-600/20',
      features: [
        'Smart city infrastructure management',
        'Citizen service automation',
        'Data-driven policy development',
        'Public resource optimization'
      ]
    }
  ]
};
