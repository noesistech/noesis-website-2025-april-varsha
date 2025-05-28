import React, { useEffect, useRef } from 'react';
import { Award, Users, Building, Laptop, GalleryVertical } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const CultureSection = () => {
  // Gallery images with captions - Using direct paths to the uploaded images
  const galleryImages = [{
    src: '/lovable-uploads/team_pic_5.jpg',
    caption: 'Team Boat Party'
  }, {
    src: '/lovable-uploads/team_pic_1.jpg',
    caption: 'Office Meet & Greet'
  }, {
    src: '/lovable-uploads/team_pic_2.jpg',
    caption: 'Team Party Night'
  }, {
    src: '/lovable-uploads/team_pic_4.jpg',
    caption: 'Diwali Celebration'
  }, {
    src: '/lovable-uploads/team_pic_3.jpg',
    caption: 'Festive Team Gathering'
  }, 
  // {
  //   src: '/lovable-uploads/09fdbbec-b316-401c-956a-03b7302519ee.png',
  //   caption: 'Restaurant Team Dinner'
  // }, 
  {
    src: '/lovable-uploads/team_pic_6.jpeg',
    caption: 'Beach Retreat'
  }];

  // Reference for the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Animation effect for team values section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas || !canvasContainerRef.current) return;
      const container = canvasContainerRef.current;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      console.log('Canvas dimensions set:', canvas.width, canvas.height);
    };

    // Particles configuration
    const particlesArray: Particle[] = [];
    const numberOfParticles = 50;
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;

        // Use purple theme colors with transparency
        const colors = ['rgba(155, 135, 245, 0.6)', 'rgba(130, 87, 230, 0.5)', 'rgba(214, 188, 250, 0.3)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize particles
    const init = () => {
      particlesArray.length = 0; // Clear existing particles
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    // Animate particles
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 135, 245, ${0.2 - distance / 500})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Ensure the container is properly sized and visible
    setTimeout(() => {
      setCanvasDimensions();
      init();
      // Start the animation
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }, 300); // Longer delay to ensure DOM is ready

    // Handle resize
    const handleResize = () => {
      setCanvasDimensions();
      init();
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <section className="bg-[#1A1F2C] py-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our <span className="text-noesis-purple">Culture</span>
          </h2>
          <p className="section-subtitle mt-4">
            Creating an environment where innovation thrives and people grow
          </p>
        </div>

        {/* Culture highlights cards - adjusted for better responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Culture Highlights Card */}
          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <Award className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Culture Highlights</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Our culture is built on innovation, trust, and continuous learning. 
              We celebrate diverse perspectives and encourage everyone to bring their 
              authentic selves to work.
            </p>
          </div>

          {/* Work Culture Card */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/20 rounded-xl p-6 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-xl">
                <Building className="h-6 w-6 text-indigo-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Work Culture</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We value work-life balance and provide flexible schedules. 
              Our collaborative environment supports both individual excellence 
              and team success.
            </p>
          </div>

          {/* Remote/Hybrid Work Card - Modified to force the title to two lines on iPad Mini */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex flex-col mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl w-fit mb-2">
                <Laptop className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Remote/Hybrid<br className="md:hidden" /> Work</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We embrace a flexible approach to work, supporting both in-office 
              and remote team members. Our digital infrastructure ensures 
              everyone stays connected and productive.
            </p>
          </div>
        </div>

        {/* Team Values Section */}
        <div className="backdrop-blur-sm bg-[#1A1F2C]/40 rounded-xl border border-purple-500/10 overflow-hidden mb-12 relative">
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent pointer-events-none opacity-60"></div>
          
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left side - Animated canvas replacing static icon */}
              <div ref={canvasContainerRef} className="md:w-1/3 flex justify-center relative w-full aspect-square md:aspect-auto">
                <div className="w-full aspect-square max-w-[240px] rounded-2xl overflow-hidden border border-purple-500/20 relative">
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10"></canvas>
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <Users className="h-12 w-12 text-purple-400/70" />
                  </div>
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4 inline-flex items-center border-b border-purple-500/30 pb-2">
                  <span>Our Team Values</span>
                  <div className="h-1 w-12 bg-purple-500/40 ml-3 rounded-full"></div>
                </h3>
                
                <p className="text-gray-300 mb-6">
                  At Noesis, our team is our greatest asset. We foster a supportive environment 
                  where creativity thrives and innovation is celebrated. We believe that diverse 
                  perspectives lead to better solutions.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center justify-center">
                    <p className="text-purple-300 font-medium text-xs">Collaboration</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center justify-center">
                    <p className="text-purple-300 font-medium text-xs">Innovation</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center justify-center">
                    <p className="text-purple-300 font-medium text-xs">Respect</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/10 px-3 py-1 rounded-full border border-purple-500/20 flex items-center justify-center">
                    <p className="text-purple-300 font-medium text-xs">Growth Mindset</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Gallery */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GalleryVertical className="h-6 w-6 text-purple-400" />
            <h3 className="text-2xl font-bold">Team Gallery</h3>
          </div>
          
          <Carousel className="w-full" autoplay={true} interval={5000}>
            <CarouselContent>
              {galleryImages.map((image, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-0 bg-transparent">
                    <CardContent className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img src={image.src} alt={image.caption} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" loading="lazy" onError={e => {
                      console.error('Image failed to load:', image.src);
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }} />
                        <div className="bg-[#1A1F2C]/80 p-3 text-center">
                          <p className="text-gray-300">{image.caption}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative inset-auto translate-y-0" />
              <CarouselNext className="relative inset-auto translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>;
};

export default CultureSection;
