
import { AICapability, AIProduct } from '@/components/AICapabilitiesSection';

export const aiCapabilitiesSectionData = {
  id: 'ai-capabilities-section-1',
  title: 'Our AI Capabilities',
  created_at: '',
  updated_at: '',
};

export const aiCapabilitiesData: AICapability[] = [
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    icon: 'brain',
    description: 'We develop sophisticated NLP solutions that understand, interpret, and generate human language, enabling intelligent interactions between humans and machines.',
    tools: ['GPT-4o', 'LLaMA', 'BERT', 'Transformer Models', 'Langchain', 'Semantic Search', 'RAG'],
    color: 'from-purple-500/20 to-purple-600/20'
  },
  {
    id: 'ml',
    title: 'Machine Learning & Deep Learning',
    icon: 'brain-circuit',
    description: 'Our team creates custom machine learning models that learn from data patterns to make predictions, decisions, and solve complex problems across industries.',
    tools: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Neural Networks', 'CNN', 'RNN', 'GANs', 'Reinforcement Learning'],
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    icon: 'microscope',
    description: 'We build systems that can interpret and understand visual information from the world, enabling applications from facial recognition to autonomous vehicles.',
    tools: ['OpenCV', 'YOLO', 'Object Detection', 'Image Segmentation', 'Face Recognition', 'Visual SLAM'],
    color: 'from-pink-500/20 to-pink-600/20'
  },
  {
    id: 'aiops',
    title: 'AI Operations & Engineering',
    icon: 'settings',
    description: 'Our expertise in AI operations ensures efficient development, deployment, and management of AI systems at scale with industry best practices.',
    tools: ['MLOps', 'Model Optimization', 'Feature Engineering', 'Data Preprocessing', 'Model Evaluation'],
    color: 'from-yellow-500/20 to-yellow-600/20'
  },
  {
    id: 'deploy-cloud',
    title: 'AI Cloud Deployment',
    icon: 'zap',
    description: 'We deploy AI systems on major cloud platforms, ensuring scalability, reliability, and efficient resource utilization for production environments.',
    tools: ['AWS SageMaker', 'Google Vertex AI', 'Azure Machine Learning', 'Docker', 'Kubernetes', 'CI/CD for ML'],
    color: 'from-green-500/20 to-green-600/20'
  },
  {
    id: 'deploy-edge',
    title: 'Edge AI & Embedded Systems',
    icon: 'bot', 
    description: 'We implement AI capabilities directly on edge devices, enabling real-time processing without cloud connectivity for IoT, mobile, and embedded systems.',
    tools: ['TensorFlow Lite', 'ONNX', 'Edge TPU', 'Model Compression', 'Quantization', 'IoT Integration'],
    color: 'from-orange-500/20 to-orange-600/20'
  },
];

export const aiProductsSectionData = {
  id: 'ai-products-section-1',
  title: 'Brainstormer Suite',
  subtitle: 'Our AI Products',
  created_at: '',
  updated_at: '',
};

export const aiProductsData: AIProduct[] = [
  {
    id: 'brainstormer-pro',
    title: 'Brainstormer Pro',
    description: 'Our advanced AI engine for content, marketing, and business process automation tailored for enterprise needs. Leverage Brainstormer Pro to enhance workflow and drive productivity within a secure, collaborative environment.',
    icon: 'brain',
    logoUrl: '/images/brainstormer-pro-logo.png',
    ctaUrl: '/brainstormer-pro',
    ctaText: 'Explore Pro'
  },
  {
    id: 'brainstormer-studio',
    title: 'Brainstormer Studio',
    description: 'Brainstormer Studio empowers you to create AI agents effortlessly. Our intuitive low-code/no-code platform is ideal for creative and enterprise environments, simplifying AI development and deployment.',
    icon: 'sparkles',
    logoUrl: '/images/brainstormer-studio-logo.png',
    ctaUrl: '/brainstormer-studio',
    ctaText: 'Try Studio'
  }
];
