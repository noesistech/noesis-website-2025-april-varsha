import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-blue/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience the <span className="gradient-text">AI-Human Partnership</span>
          </h2>
          <p className="text-xl text-white/70">Let's combine our expertise with cutting-edge AI to solve your challenges</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-8">
              <h3 className="text-2xl font-bold gradient-text mb-6">Start the conversation</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      className="bg-white/5 border-white/10 focus:border-noesis-purple text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      className="bg-white/5 border-white/10 focus:border-noesis-purple text-white"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-1">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    className="bg-white/5 border-white/10 focus:border-noesis-purple text-white"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    className="bg-white/5 border-white/10 focus:border-noesis-purple text-white h-32"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button className="w-full bg-noesis-purple hover:bg-noesis-darkpurple text-white">
                  Connect With Our Team
                </Button>
              </form>
            </div>
          </Card>
          
          <Card className="glass-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="p-8">
              <h3 className="text-2xl font-bold gradient-text mb-6">Reach Our AI-Human Team</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-noesis-purple/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-noesis-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a href="mailto:yukti@noesis.tech" className="text-white/70 hover:text-white transition-colors">yukti@noesis.tech</a>
                    <br />
                    <a href="mailto:sales@noesis.tech" className="text-white/70 hover:text-white transition-colors">sales@noesis.tech</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-noesis-blue/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-noesis-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a href="tel:+916378652266" className="text-white/70 hover:text-white transition-colors">+91 6378652266</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-400/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="text-white/70">
                      C, Wing, 209, Floral Deck Plaza, 23rd Rd, M.I.D.C, Santacruz Electronic Export Processing Zone, Andheri East, Mumbai, Maharashtra 400093
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
