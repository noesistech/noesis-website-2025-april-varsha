
import { 
  HeroSection, 
  ServiceCard, 
  AboutSection, 
  Stat, 
  MissionSection, 
  ServicesSection, 
  ServiceItem, 
  SolutionsSection, 
  SolutionItem, 
  TechStackSection, 
  TechCategory, 
  ClientsSection, 
  ClientLogo, 
  PartnerLogo, 
  Testimonial 
} from '@/types/contentTypes';

export const heroSectionData: HeroSection = {
  id: 'hero-1',
  title: 'Where AI and human talent create breakthrough solutions.',
  subtitle: 'As an AI-native agency, we combine cutting-edge artificial intelligence with human expertise to deliver digital solutions that transform businesses and exceed expectations.',
  cta_primary_text: 'Get in Touch',
  cta_secondary_text: 'Our Services',
  created_at: '',
  updated_at: '',
};

export const serviceCardsData: ServiceCard[] = [
  {
    id: 'service-card-1',
    icon_name: 'BrainCircuit',
    title: 'AI Solutions',
    description: 'Next-gen intelligent experiences',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-card-2',
    icon_name: 'Code',
    title: 'Web Development',
    description: 'AI-powered digital experiences',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-card-3',
    icon_name: 'PaletteIcon',
    title: 'UI/UX Design',
    description: 'Human-centered, AI-enhanced',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-card-4',
    icon_name: 'Server',
    title: 'Cloud Services',
    description: 'AI-optimized infrastructure',
    sort_order: 4,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-card-5',
    icon_name: 'Palette',
    title: 'Creative Design',
    description: 'Human creativity, AI precision',
    sort_order: 5,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-card-6',
    icon_name: 'Globe',
    title: 'Digital Marketing',
    description: 'Data-driven, AI-powered growth',
    sort_order: 6,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-card-7',
    icon_name: 'Users',
    title: 'Staff Augmentation',
    description: 'AI-enhanced talent solutions',
    sort_order: 7,
    created_at: '',
    updated_at: '',
  },
];

export const aboutSectionData: AboutSection = {
  id: 'about-1',
  title: 'About',
  subtitle: 'Enabling businesses through technology, since 2009.',
  description_1: 'Our 40+ member team combines talented human experts with cutting-edge AI tools to deliver solutions that blend the best of human creativity and artificial intelligence.',
  description_2: 'With over a decade of experience in digital innovation, we have grown alongside emerging technologies to establish ourselves as leaders in AI-enhanced digital services.',
  description_3: 'Our 95% client retention rate and 4+ year average relationships demonstrate how our unique AI-human partnership approach consistently delivers breakthrough solutions that exceed expectations.',
  image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  created_at: '',
  updated_at: '',
};

export const statsData: Stat[] = [
  {
    id: 'stat-1',
    icon_name: 'Users',
    value: '40',
    label: 'Human + AI Experts',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'stat-2',
    icon_name: 'Trophy',
    value: '15+',
    label: 'Innovation Awards',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'stat-3',
    icon_name: 'Calendar',
    value: '4+',
    label: 'Avg. Client Relationship',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'stat-4',
    icon_name: 'Award',
    value: '95%',
    label: 'Client Retention Rate',
    sort_order: 4,
    created_at: '',
    updated_at: '',
  },
];

export const missionSectionData: MissionSection = {
  id: 'mission-1',
  mission_title: 'Mission',
  mission_description: 'Harness the synergy of AI capabilities and human expertise to create digital solutions that deliver exceptional business results and transform industries.',
  vision_title: 'Vision',
  vision_description: 'To lead the AI revolution in digital solutions, pioneering the perfect balance of artificial intelligence and human creativity for the world most innovative organizations.',
  promise_title: 'Our Promise',
  promise_text: 'Human creativity, AI precision.',
  created_at: '',
  updated_at: '',
};

export const servicesSectionData: ServicesSection = {
  id: 'services-section-1',
  title: 'Our Services',
  created_at: '',
  updated_at: '',
};

export const serviceItemsData: ServiceItem[] = [
  {
    id: 'service-item-1',
    icon_name: 'Palette',
    title: 'UI/UX',
    description: 'Create exceptional user experiences through the perfect blend of human-centered design principles and AI-powered insights.',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-item-2',
    icon_name: 'Globe',
    title: 'Web and Application Development',
    description: 'Build cutting-edge digital solutions with our AI-enhanced development process that combines human creativity with machine efficiency.',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-item-3',
    icon_name: 'Image',
    title: 'Graphics and Content Creation',
    description: 'AI-assisted content creation balanced with human editorial expertise for compelling website copy and articles. Human creativity enhanced by AI tools to design captivating visuals and infographics that resonate with audiences.',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-item-4',
    icon_name: 'Cloud',
    title: 'Cloud Services & DevOps',
    description: 'AI-optimized hosting solutions managed by experienced human engineers. Intelligent performance tuning that leverages machine learning for predictive scaling while maintaining human oversight.',
    sort_order: 4,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-item-5',
    icon_name: 'BrainCircuit',
    title: 'AI Customized Solutions',
    description: 'Human-guided AI systems that extract meaningful insights from complex data. Content generation that combines AI efficiency with human creativity for brand-perfect messaging.',
    sort_order: 5,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'service-item-6',
    icon_name: 'Users',
    title: 'AI-Enhanced Staff Solutions',
    description: 'Access to 500+ high-quality professionals trained in AI-human collaboration methodologies. Teams skilled in AI integration across Frontend, Backend, Fullstack, ML, DevOps and cloud technologies.',
    sort_order: 6,
    created_at: '',
    updated_at: '',
  },
];

export const solutionsSectionData: SolutionsSection = {
  id: 'solutions-section-1',
  title: 'Our Solutions',
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
];

export const techStackSectionData: TechStackSection = {
  id: 'tech-stack-section-1',
  title: 'Our Technology Stack',
  created_at: '',
  updated_at: '',
};

export const techCategoriesData: TechCategory[] = [
  {
    id: 'tech-category-1',
    title: 'Interface and Front End Development',
    key: 'frontend',
    sort_order: 1,
    is_cloud_stack: false,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: 'tech-1', name: 'React', sort_order: 1, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-2', name: 'Angular', sort_order: 2, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-3', name: 'Vue.js', sort_order: 3, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-4', name: 'Next.js', sort_order: 4, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-5', name: 'TypeScript', sort_order: 5, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-6', name: 'JavaScript', sort_order: 6, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-7', name: 'HTML5', sort_order: 7, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-8', name: 'CSS3', sort_order: 8, category_id: 'tech-category-1', created_at: '', updated_at: '' },
      { id: 'tech-9', name: 'Tailwind CSS', sort_order: 9, category_id: 'tech-category-1', created_at: '', updated_at: '' },
    ]
  },
  {
    id: 'tech-category-2',
    title: 'Serverless, Server-side and Back End Development',
    key: 'backend',
    sort_order: 2,
    is_cloud_stack: false,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: 'tech-10', name: 'Node.js', sort_order: 1, category_id: 'tech-category-2', created_at: '', updated_at: '' },
      { id: 'tech-11', name: 'Python', sort_order: 2, category_id: 'tech-category-2', created_at: '', updated_at: '' },
      { id: 'tech-12', name: 'Java', sort_order: 3, category_id: 'tech-category-2', created_at: '', updated_at: '' },
      { id: 'tech-13', name: 'PHP', sort_order: 4, category_id: 'tech-category-2', created_at: '', updated_at: '' },
      { id: 'tech-14', name: 'ASP.NET', sort_order: 5, category_id: 'tech-category-2', created_at: '', updated_at: '' },
      { id: 'tech-15', name: 'Firebase', sort_order: 6, category_id: 'tech-category-2', created_at: '', updated_at: '' },
    ]
  },
  {
    id: 'tech-category-3',
    title: 'Mobile App Development',
    key: 'mobile',
    sort_order: 3,
    is_cloud_stack: false,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: 'tech-16', name: 'React Native', sort_order: 1, category_id: 'tech-category-3', created_at: '', updated_at: '' },
      { id: 'tech-17', name: 'Flutter', sort_order: 2, category_id: 'tech-category-3', created_at: '', updated_at: '' },
      { id: 'tech-18', name: 'iOS (Swift)', sort_order: 3, category_id: 'tech-category-3', created_at: '', updated_at: '' },
      { id: 'tech-19', name: 'Android (Kotlin)', sort_order: 4, category_id: 'tech-category-3', created_at: '', updated_at: '' },
    ]
  },
  {
    id: 'tech-category-7',
    title: 'Cloudstack',
    key: 'cloudstack',
    sort_order: 7,
    is_cloud_stack: true,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: 'tech-30', name: 'AWS', sort_order: 1, category_id: 'tech-category-7', created_at: '', updated_at: '' },
      { id: 'tech-31', name: 'Google Cloud Platform', sort_order: 2, category_id: 'tech-category-7', created_at: '', updated_at: '' },
      { id: 'tech-32', name: 'Microsoft Azure', sort_order: 3, category_id: 'tech-category-7', created_at: '', updated_at: '' },
      { id: 'tech-33', name: 'Digital Ocean', sort_order: 4, category_id: 'tech-category-7', created_at: '', updated_at: '' },
      { id: 'tech-34', name: 'Heroku', sort_order: 5, category_id: 'tech-category-7', created_at: '', updated_at: '' },
    ]
  },
  {
    id: 'tech-category-8',
    title: 'DevOps',
    key: 'devops',
    sort_order: 8,
    is_cloud_stack: true,
    created_at: '',
    updated_at: '',
    technologies: [
      { id: 'tech-35', name: 'Docker', sort_order: 1, category_id: 'tech-category-8', created_at: '', updated_at: '' },
      { id: 'tech-36', name: 'Kubernetes', sort_order: 2, category_id: 'tech-category-8', created_at: '', updated_at: '' },
      { id: 'tech-37', name: 'Jenkins', sort_order: 3, category_id: 'tech-category-8', created_at: '', updated_at: '' },
      { id: 'tech-38', name: 'GitHub Actions', sort_order: 4, category_id: 'tech-category-8', created_at: '', updated_at: '' },
      { id: 'tech-39', name: 'CircleCI', sort_order: 5, category_id: 'tech-category-8', created_at: '', updated_at: '' },
    ]
  },
];

export const clientsSectionData: ClientsSection = {
  id: 'clients-section-1',
  title: 'Our Clients & Partners',
  clients_subtitle: 'Trusted by leading brands',
  partners_subtitle: 'Our Partnerships and Certifications',
  testimonials_subtitle: 'Testimonials',
  created_at: '',
  updated_at: '',
};

export const clientLogosData: ClientLogo[] = [
  // Empty for now
];

export const partnerLogosData: PartnerLogo[] = [
  // Empty for now
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'The Noesis team brought in a lot of deep thinking to design not only the registration phase but also the important 2nd phase of capturing the feedback from Beta Testers. Their detailed thinking on how to capture feedback (via Questionnaire & Chat integration) and how we at the back end get to see and process it fast (via a super easy Admin Panel) was very valuable and ensured effectiveness was delivered.',
    author: 'Danny Nathani',
    position: 'Chief Brand Officer',
    company: 'Sharekhan (By BNP Paribas)',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'testimonial-2',
    quote: 'A lot of people can build you a good website, but what makes Noesis stand out for me is the ability of their senior team to understand your goals well and make recommendations tailored to them.',
    author: 'Pratik Aggarwal',
    position: 'Founder',
    company: 'The Cube Club',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'testimonial-3',
    quote: 'Noesis worked on a very interesting tool to help our designers for our interior design services. The tool itself was delivered as per our design requirements, and they used our feedback towards the tool to design and develop an output that would improve our customer interaction and hopefully reduce the iterations required to design our customers home.',
    author: 'Ritesh Rathi',
    position: 'Head of User Experience',
    company: 'Asian Paints',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
];
