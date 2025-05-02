import React from 'react';
import { Briefcase, FileText, User, Mail } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
const applicationFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  position: z.string().min(2, {
    message: "Please specify a position you're applying for."
  }),
  message: z.string().min(10, {
    message: "Cover letter should be at least 10 characters."
  }).max(1000, {
    message: "Cover letter should not exceed 1000 characters."
  }),
  resume: z.string().optional()
});
type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
const CareersSection = () => {
  // Define default values for the form
  const defaultValues: Partial<ApplicationFormValues> = {
    fullName: "",
    email: "",
    position: "",
    message: "",
    resume: ""
  };

  // Initialize the form with react-hook-form
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues
  });

  // Handle form submission
  const onSubmit = (data: ApplicationFormValues) => {
    console.log("Form data submitted:", data);

    // Show success toast notification
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We'll review your application and get back to you soon.",
      variant: "default"
    });

    // Reset the form after submission
    form.reset();
  };

  // Career opportunities
  const opportunities = [{
    title: "AI Research Engineer",
    department: "Research & Development",
    type: "Full-time",
    description: "Join our R&D team to develop cutting-edge AI models and solutions for our clients."
  }, {
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    description: "Build beautiful, responsive interfaces for our AI-powered applications."
  }, {
    title: "AI Product Manager",
    department: "Product",
    type: "Full-time",
    description: "Bridge the gap between business needs and technical implementation of AI solutions."
  }];
  return <section className="bg-[#1A1F2C] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Join Our <span className="text-noesis-purple">Team</span>
          </h2>
          <div className="h-1 w-24 bg-noesis-purple/60 mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-gray-300">
            Explore opportunities to work with us and be part of our mission to transform businesses through AI innovation
          </p>
        </div>

        {/* Current Opportunities */}
        <div className="mb-16">
          
        </div>

        {/* General Application Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            
            
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/10 to-indigo-900/10 border border-purple-500/20 rounded-xl p-6 md:p-8">
            
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white flex items-center">
                          <User className="h-4 w-4 mr-2 inline" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} className="bg-[#242938] border-purple-500/20 focus:border-purple-500/50 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white flex items-center">
                          <Mail className="h-4 w-4 mr-2 inline" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email address" type="email" {...field} className="bg-[#242938] border-purple-500/20 focus:border-purple-500/50 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>
                
                <FormField control={form.control} name="position" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-white flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 inline" />
                        Position
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Which position are you interested in?" {...field} className="bg-[#242938] border-purple-500/20 focus:border-purple-500/50 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="message" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-white flex items-center">
                        <FileText className="h-4 w-4 mr-2 inline" />
                        Cover Letter
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about yourself and why you're interested in joining our team..." {...field} className="min-h-[120px] bg-[#242938] border-purple-500/20 focus:border-purple-500/50 text-white" />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Briefly describe your qualifications and why you'd be a good fit.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="resume" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-white flex items-center">
                        <FileText className="h-4 w-4 mr-2 inline" />
                        Resume Link
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Link to your resume (Google Drive, Dropbox, etc.)" {...field} className="bg-[#242938] border-purple-500/20 focus:border-purple-500/50 text-white" />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Provide a link to your resume or portfolio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>} />
                
                <div className="flex justify-end">
                  <Button type="submit" variant="noesis" className="px-8">
                    Submit Application
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>;
};
export default CareersSection;