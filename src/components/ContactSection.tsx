
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  subject: z.string().min(2, {
    message: "Subject is required"
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters"
  })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
      
      const brevoResult = await supabase.functions.invoke('submit-contact-form', {
        body: {
          name: data.name,
          email: data.email,
          message: data.message
        }
      });
      
      if (brevoResult.error) {
        throw new Error(`Error saving to Brevo: ${brevoResult.error.message}`);
      }
      
      console.log("Successfully saved to Brevo:", brevoResult);
      
      const emailResult = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        }
      });
      
      if (emailResult.error) {
        throw new Error(`Error sending email: ${emailResult.error.message}`);
      }
      
      console.log("Email sent successfully:", emailResult);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon."
      });
      
      setShowSuccessDialog(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="page-section py-16 sm:py-24 bg-gray-900/30 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300/80">
            Ready to transform your business with AI-powered solutions?
          </p>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
          <div className="lg:w-1/3 space-y-6">
            <Card className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-noesis-purple/20 p-3 mr-4">
                    <Mail className="h-6 w-6 text-noesis-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <a href="mailto:info@noesis.tech" className="text-noesis-purple hover:text-noesis-purple/90 transition-colors">
                      info@noesis.tech
                    </a>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-noesis-purple/20 p-3 mr-4">
                    <Phone className="h-6 w-6 text-noesis-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Phone</h3>
                    <a href="tel:+91-8080135738" className="text-noesis-purple hover:text-noesis-purple/90 transition-colors">
                      +91-8080135738
                    </a>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="rounded-full bg-noesis-purple/20 p-3 mr-4">
                    <MapPin className="h-6 w-6 text-noesis-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Location</h3>
                    <p className="text-gray-300/80">Mumbai, India</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:w-2/3">
            <Card className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Send us a message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field}
                                className="bg-gray-900/50 border-gray-700" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                {...field}
                                className="bg-gray-900/50 border-gray-700" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What is this about?" 
                              {...field}
                              className="bg-gray-900/50 border-gray-700" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message..." 
                              {...field}
                              className="bg-gray-900/50 border-gray-700 min-h-32" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-noesis-purple hover:bg-noesis-purple/90 text-white w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </Card>
          </div>
        </div>
        
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent className="bg-gray-800 border border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center text-white">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Message Sent Successfully
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Thank you for contacting us! We'll get back to you as soon as possible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowSuccessDialog(false)}
                className="bg-noesis-purple hover:bg-noesis-purple/90"
              >
                Close
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default ContactSection;
