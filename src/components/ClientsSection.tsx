
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type ClientLogo = {
  name: string;
  logo: React.ReactNode;
};

type Testimonial = {
  quote: string;
  author: string;
  position: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "The Noesis team brought in a lot of deep thinking to design not only the registration phase but also the important 2nd phase of capturing the feedback from Beta Testers. Their detailed thinking on how to capture feedback (via Questionnaire & Chat integration) and how we at the back end get to see and process it fast (via a super easy Admin Panel) was very valuable and ensured effectiveness was delivered.",
    author: "Danny Nathani",
    position: "Chief Brand Officer",
    company: "Sharekhan (By BNP Paribas)"
  },
  {
    quote: "A lot of people can build you a good website, but what makes Noesis stand out for me is the ability of their senior team to understand your goals well and make recommendations tailored to them.",
    author: "Pratik Aggarwal",
    position: "Founder",
    company: "The Cube Club"
  },
  {
    quote: "Noesis worked on a very interesting tool to help our designers for our interior design services. The tool itself was delivered as per our design requirements, and they used our feedback towards the tool to design and develop an output that would improve our customer interaction and hopefully reduce the iterations required to design our customers home. As a digitally forward organization we are constantly experimenting with tools that can help the experience we leave our customers with and Noesis helped deliver that for us. We thank the team for their efforts.",
    author: "Ritesh Rathi",
    position: "Head of User Experience",
    company: "Asian Paints"
  }
];

const ClientsSection = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="clients" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-16">Our Clients & Partners</h2>
        
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold gradient-text">Trusted by leading brands</h3>
          </div>
          
          <div className="glass rounded-2xl p-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
              {/* Sample client logos - replace with actual client logos */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center h-16 w-full opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-full h-12 bg-white/10 rounded-md flex items-center justify-center text-white">
                    Client {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold gradient-text">Our Partnerships and Certifications</h3>
          </div>
          
          <div className="glass rounded-2xl p-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
              {/* Sample partner logos - replace with actual partner logos */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center h-16 w-full opacity-70 hover:opacity-100 transition-opacity">
                  <div className="w-full h-12 bg-white/10 rounded-md flex items-center justify-center text-white">
                    Partner {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold gradient-text">Testimonials</h3>
          </div>
          
          <div className="relative" ref={testimonialRef}>
            <div className="max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={cn(
                    "glass-card transition-all duration-1000 absolute top-0 left-0 right-0",
                    index === activeTestimonial ? "opacity-100 translate-x-0 z-10" : 
                    index < activeTestimonial ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"
                  )}
                  style={{
                    position: index === activeTestimonial ? 'relative' : 'absolute'
                  }}
                >
                  <div className="flex flex-col items-center text-center p-8">
                    <div className="text-7xl text-noesis-purple mb-4">"</div>
                    <p className="text-lg text-white/80 mb-8 italic">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold text-lg">{testimonial.author}</p>
                      <p className="text-white/60">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-3 w-3 rounded-full transition-all duration-300",
                    index === activeTestimonial ? "bg-noesis-purple w-6" : "bg-white/30 hover:bg-white/50"
                  )}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
