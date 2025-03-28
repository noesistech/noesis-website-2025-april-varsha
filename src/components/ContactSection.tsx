
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle, Wand } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedRequirements, setEnhancedRequirements] = useState<string | null>(null);
  const [showEnhancedDialog, setShowEnhancedDialog] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const enhanceRequirements = async () => {
    const message = form.getValues("message");
    
    if (!message || message.length < 10) {
      toast({
        title: "Requirements too short",
        description: "Please enter at least 10 characters for your requirements before enhancing.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsEnhancing(true);

      const { data, error } = await supabase.functions.invoke('enhance-requirements', {
        body: { requirements: message },
      });

      if (error) {
        throw new Error(error.message);
      }

      setEnhancedRequirements(data.enhancedRequirements);
      setShowEnhancedDialog(true);
      form.setValue("message", data.enhancedRequirements);
    } catch (error) {
      console.error("Error enhancing requirements:", error);
      toast({
        title: "Enhancement Failed",
        description: "There was a problem enhancing your requirements. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      // Send data to Brevo via edge function
      const { error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          name: data.name,
          email: data.email,
          message: data.message
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Show success message and reset form
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
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
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-noesis-dark/0 via-noesis-blue/5 to-noesis-dark/0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title">
            Experience the <span className="gradient-text">AI-Human Partnership</span>
          </h2>
          <p className="text-xl text-white/70">Let's combine our expertise with cutting-edge AI to solve your challenges</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-8">
              <h3 className="text-2xl font-bold gradient-text mb-6">Start The Conversation</h3>
              
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/70">Project Requirements</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Textarea 
                              {...field}
                              className="bg-white/5 border-white/10 focus:border-noesis-purple text-white h-32 pr-12"
                              placeholder="Briefly describe your project requirements..."
                              disabled={isSubmitting || isEnhancing}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={enhanceRequirements}
                            disabled={isSubmitting || isEnhancing}
                          >
                            {isEnhancing ? (
                              <div className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                            ) : (
                              <Wand className="h-4 w-4 text-noesis-purple" />
                            )}
                          </Button>
                        </div>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting || isEnhancing}
                    size="lg"
                    variant="noesis"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Connect With Our Team</span>
                      </div>
                    )}
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

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-noesis-dark border-noesis-purple">
          <AlertDialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <AlertDialogTitle className="text-xl text-white">Message Sent Successfully!</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Thank you for reaching out to us. Our team will review your message and get back to you soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => setShowSuccessDialog(false)} 
              variant="noesis"
            >
              Close
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Enhanced Requirements Dialog */}
      <AlertDialog open={showEnhancedDialog} onOpenChange={setShowEnhancedDialog}>
        <AlertDialogContent className="bg-noesis-dark border-noesis-purple max-w-3xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Wand className="h-16 w-16 text-noesis-purple" />
            </div>
            <AlertDialogTitle className="text-xl text-white">Enhanced Requirements</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              Your requirements have been enhanced and added to the message field. You can continue editing them before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-4 p-4 bg-white/5 rounded-md text-white overflow-auto whitespace-pre-wrap">
            {enhancedRequirements && (
              <div dangerouslySetInnerHTML={{ __html: enhancedRequirements.replace(/\n/g, '<br/>') }} />
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Button 
              onClick={() => setShowEnhancedDialog(false)} 
              variant="noesis"
            >
              Back to Form
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ContactSection;
