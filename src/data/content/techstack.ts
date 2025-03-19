
import { TechStackSection, TechCategory } from '@/types/contentTypes';

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
