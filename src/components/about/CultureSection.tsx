
import React from 'react';
import { 
  Award, 
  Users, 
  Building, 
  Laptop,
  GalleryVertical 
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const CultureSection = () => {
  // Gallery images with captions
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      caption: 'Team collaboration session'
    },
    {
      src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
      caption: 'Our annual team meetup'
    },
    {
      src: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
      caption: 'Office brainstorming'
    },
    {
      src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
      caption: 'Remote work setup'
    }
  ];

  return (
    <section className="bg-[#1A1F2C] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-noesis-purple">Culture</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover what makes Noesis a unique place to work and grow professionally
          </p>
        </div>

        {/* Culture highlights cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Culture Highlights</h3>
              <p className="text-gray-300">
                Our culture is built on innovation, trust, and continuous learning. 
                We celebrate diverse perspectives and encourage everyone to bring their 
                authentic selves to work.
              </p>
            </div>
          </div>

          <div className="glass-card">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                <Building className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Work Culture</h3>
              <p className="text-gray-300">
                We value work-life balance and provide flexible schedules. 
                Our collaborative environment supports both individual excellence 
                and team success.
              </p>
            </div>
          </div>

          <div className="glass-card">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-900/30 p-3 rounded-full mb-4">
                <Laptop className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Remote/Hybrid Work</h3>
              <p className="text-gray-300">
                We embrace a flexible approach to work, supporting both in-office 
                and remote team members. Our digital infrastructure ensures 
                everyone stays connected and productive.
              </p>
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
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-0 bg-transparent">
                    <CardContent className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src={image.src} 
                          alt={image.caption} 
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="bg-[#1A1F2C]/80 p-3 text-center">
                          <p className="text-gray-300">{image.caption}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative inset-auto translate-y-0" />
              <CarouselNext className="relative inset-auto translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Team values statement */}
        <div className="flex flex-col md:flex-row items-center gap-8 glass-card">
          <div className="md:w-1/3 flex justify-center">
            <Users className="h-24 w-24 text-purple-400" />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">Our Team Values</h3>
            <p className="text-gray-300 mb-4">
              At Noesis, our team is our greatest asset. We foster a supportive environment 
              where creativity thrives and innovation is celebrated. We believe that diverse 
              perspectives lead to better solutions, and we're committed to creating an inclusive 
              workplace where everyone can contribute their unique talents.
            </p>
            <p className="text-gray-300">
              Whether working remotely or in our offices, we maintain strong connections through 
              regular team events, collaborative projects, and a shared commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
