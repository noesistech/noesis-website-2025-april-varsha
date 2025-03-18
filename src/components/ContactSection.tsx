
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      // 1. Save form submission to Supabase
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (dbError) throw new Error(`Database error: ${dbError.message}`);

      // 2. Send notification emails via edge function
      const response = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (!response.data?.success) {
        throw new Error('Email sending failed');
      }

      // 3. Show success message and reset form
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was a problem sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-white/70">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="bg-white/5 border-white/10 focus:border-noesis-purple text-white"
                              placeholder="John Doe"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-white/70">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              className="bg-white/5 border-white/10 focus:border-noesis-purple text-white"
                              placeholder="john@example.com"
                              type="email"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            className="bg-white/5 border-white/10 focus:border-noesis-purple text-white"
                            placeholder="How can we help you?"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            className="bg-white/5 border-white/10 focus:border-noesis-purple text-white h-32"
                            placeholder="Tell us about your project..."
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-noesis-purple hover:bg-noesis-darkpurple text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Connect With Our Team"}
                  </Button>
                </form>
              </Form>
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
