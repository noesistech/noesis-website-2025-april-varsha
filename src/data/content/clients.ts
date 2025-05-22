
import { ClientsSection, Testimonial, ClientLogo, PartnerLogo } from '@/types/contentTypes';

export const clientsSectionData: ClientsSection = {
  id: 'clients-section-1',
  title: 'Testimonials',
  subtitle: 'What our clients say about us',
  clients_subtitle: 'Trusted by industry leaders',
  partners_subtitle: 'Our trusted partners',
  testimonials_subtitle: 'Client success stories',
  created_at: '',
  updated_at: '',
};

export const clientLogosData: ClientLogo[] = [
  {
    id: 'client-logo-1',
    name: 'NowYouKnow',
    image_url: '/lovable-uploads/nowyouknow.png',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-2',
    name: 'Hindware',
    image_url: '/lovable-uploads/hindware.png',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-3',
    name: 'Cathedral and John Connon School',
    image_url: '/lovable-uploads/cathedral.png',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-4',
    name: 'Origem',
    image_url: '/lovable-uploads/origem.png',
    sort_order: 4,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-5',
    name: 'RevitalH',
    image_url: '/lovable-uploads/revital.png',
    sort_order: 5,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-6',
    name: 'Education Above All',
    image_url: '/lovable-uploads/EAA.png',
    sort_order: 6,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-7',
    name: 'Poshan Atlas',
    image_url: '/lovable-uploads/poshanatlas.png',
    sort_order: 7,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-8',
    name: 'Indibid',
    image_url: '/lovable-uploads/indibid.png',
    sort_order: 8,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'client-logo-9',
    name: 'Indibid',
    image_url: '/lovable-uploads/brainstormer.png',
    sort_order: 8,
    created_at: '',
    updated_at: '',
  }
];

export const partnerLogosData = [];

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
