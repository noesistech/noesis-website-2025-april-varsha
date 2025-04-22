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
  return <section id="contact" className="py-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-blue/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="text-center animate-fade-in">
          <h2 className="section-title py-[39px]">
            Experience the <span className="gradient-text">AI-Human Partnership</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          <Card className="glass-card animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-4 sm:mb-6">Start The Conversation</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({
                    field
                  }) => <FormItem>
                            <FormLabel className="text-sm font-medium text-white/70">Your Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 focus:border-noesis-purple text-white" placeholder="John Doe" disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>} />
                    
                    <FormField control={form.control} name="email" render={({
                    field
                  }) => <FormItem>
                            <FormLabel className="text-sm font-medium text-white/70">Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/5 border-white/10 focus:border-noesis-purple text-white" placeholder="john@example.com" type="email" disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>} />
                  </div>
                  
                  <FormField control={form.control} name="subject" render={({
                  field
                }) => <FormItem>
                          <FormLabel className="text-sm font-medium text-white/70">Subject</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-white/5 border-white/10 focus:border-noesis-purple text-white" placeholder="Project Inquiry" disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>} />
                  
                  <FormField control={form.control} name="message" render={({
                  field
                }) => <FormItem>
                          <FormLabel className="text-sm font-medium text-white/70">Project Requirements</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="bg-white/5 border-white/10 focus:border-noesis-purple text-white h-24 sm:h-32" placeholder="Briefly describe your project requirements..." disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>} />
                  
                  <Button type="submit" disabled={isSubmitting} size="lg" variant="noesis" className="w-full sm:w-auto">
                    {isSubmitting ? <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div> : <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Connect With Our Team</span>
                      </div>}
                  </Button>
                </form>
              </Form>
            </div>
          </Card>
          
          <Card className="glass-card animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
            <div className="p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold gradient-text mb-4 sm:mb-6">Reach Our AI-Human Team</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-noesis-purple/20 p-2 sm:p-3 rounded-full">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-noesis-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a href="mailto:yukti@noesis.tech" className="text-white/70 hover:text-white transition-colors">yukti@noesis.tech</a>
                    <br />
                    <a href="mailto:sales@noesis.tech" className="text-white/70 hover:text-white transition-colors">sales@noesis.tech</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-noesis-blue/20 p-2 sm:p-3 rounded-full">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-noesis-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a href="tel:+916378652266" className="text-white/70 hover:text-white transition-colors">+91 6378652266</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-400/20 p-2 sm:p-3 rounded-full">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="text-white/70">
                      C, Wing, 209, Floral Deck Plaza, 23rd Rd, M.I.D.C, Santacruz Electronic Export Processing Zone, <br />
                      Andheri East, Mumbai, Maharashtra 400093
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-noesis-dark border-noesis-purple">
          <AlertDialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-xl text-white">Message Sent Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Thank you for reaching out to us. Our team will review your message and get back to you soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessDialog(false)} variant="noesis">
              Close
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </section>;
};
export default ContactSection;