import React, { useState, useRef } from 'react';
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
import ReCAPTCHA from "react-google-recaptcha";

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
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Get reCAPTCHA site key from environment variable
  const RECAPTCHA_SITE_KEY = "6Lf32wcsAAAAAOzaKASxV2aPVgbOAQ4lX8BUZM0p";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    if (value) {
      setCaptchaError(false);
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    // Validate captcha before submission
    if (!captchaValue) {
      setCaptchaError(true);
      toast({
        title: "Verification Required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
  
      const params = {
        from: "Noesis.tech <invites@brainstormer.io>",
        to: "sales@noesis.tech",
        subject: "New Contact Form Submission",
        html: `
          <div>
            <h1>New Contact Message Received</h1>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong><pre style="font: small/1.5 Arial, Helvetica, sans-serif; white-space: pre-wrap;">${data.message}</pre></p>
          </div>
        `,
        captchaToken: captchaValue // Include captcha token for backend verification
      };
  
      const response = await fetch("https://botnew.brainstormer.io/resendTesting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
  
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon."
      });
  
      setShowSuccessDialog(true);
      form.reset();
      setCaptchaValue(null);
      recaptchaRef.current?.reset();
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
    <section id="contact" className="py-8 sm:py-16 bg-gray-900/30 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card className="bg-gray-900/90 backdrop-blur-sm border border-gray-800/50 overflow-hidden h-full">
              <div className="p-4 sm:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-noesis-purple mb-8">
                  Start The Conversation
                </h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/80">Your Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field}
                                className="bg-gray-900/70 border-gray-700 text-white" 
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
                            <FormLabel className="text-white/80">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="john@example.com" 
                                {...field}
                                className="bg-gray-900/70 border-gray-700 text-white" 
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
                          <FormLabel className="text-white/80">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Project Inquiry" 
                              {...field}
                              className="bg-gray-900/70 border-gray-700 text-white" 
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
                          <FormLabel className="text-white/80">Project Requirements</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Briefly describe your project requirements..." 
                              {...field}
                              className="bg-gray-900/70 border-gray-700 text-white min-h-32" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* reCAPTCHA */}
                    <div className="flex flex-col">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={onCaptchaChange}
                        theme="dark"
                      />
                      {captchaError && (
                        <p className="text-sm text-red-500 mt-2">
                          Please complete the reCAPTCHA verification
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !captchaValue}
                      className="bg-noesis-purple hover:bg-noesis-purple/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Connect With Our Team
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </Card>
          </div>
          
          {/* Contact Information */}
          <div>
            <Card className="bg-gray-900/90 backdrop-blur-sm border border-gray-800/50 overflow-hidden h-full">
              <div className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-noesis-purple mb-8">
                  Reach Our AI-Human Team
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="rounded-full bg-noesis-purple/20 p-3 mr-4">
                      <Mail className="h-6 w-6 text-noesis-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <a href="mailto:singhsiddharth@noesis.tech" className="text-white/80 hover:text-noesis-purple transition-colors block">
                        singhsiddharth@noesis.tech
                      </a>
                      <a href="mailto:sales@noesis.tech" className="text-white/80 hover:text-noesis-purple transition-colors block">
                        sales@noesis.tech
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-noesis-purple/20 p-3 mr-4">
                      <Phone className="h-6 w-6 text-noesis-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                      <a href="tel:+918286126270" className="text-white/80 hover:text-noesis-purple transition-colors">
                        +91 8286126270
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="rounded-full bg-noesis-purple/20 p-3 mr-4">
                      <MapPin className="h-6 w-6 text-noesis-purple" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Address</h3>
                      <p className="text-white/80">
                        4th Floor, Block no 5,<br/>
                        Second Avenue, Atul Projects,<br/>
                        Road no 23, Subhash Nagar,<br/>
                        MIDC, Andheri (East),<br/>
                        Mumbai - 400093
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;