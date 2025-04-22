
import { ClientsSection, Testimonial } from '@/types/contentTypes';

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

export const clientLogosData = [];
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
