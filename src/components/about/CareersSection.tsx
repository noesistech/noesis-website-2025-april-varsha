
import React, { useState } from 'react';
import { Briefcase, FileText, User, Mail, Upload } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import Dropzone from "@/components/chat/Dropzone";

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
  const [resumeFile, setResumeFile] = useState<File | null>(null);

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

  // Handle file drop
  const handleFileDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setResumeFile(file);
      
      // You could also update the form value if needed
      form.setValue("resume", file.name);
      
      toast({
        title: "Resume uploaded",
        description: `File "${file.name}" is ready to be submitted with your application.`,
        variant: "default"
      });
    }
  };

  // Handle form submission
  const onSubmit = (data: ApplicationFormValues) => {
    // Include the file in the submission data
    const submissionData = {
      ...data,
      resumeFile
    };
    
    console.log("Form data submitted:", submissionData);

    // Show success toast notification
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We'll review your application and get back to you soon.",
      variant: "default"
    });

    // Reset the form and file after submission
    setResumeFile(null);
    form.reset();
  };
  
  return <section className="bg-[#1A1F2C] py-0">
      <div className="container mx-auto px-4 my-0 py-0">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Join Our <span className="text-noesis-purple">Team</span>
          </h2>
          <p className="section-subtitle mt-4">
            Build your career with us and shape the future of AI
          </p>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto">          
          <div className="bg-gradient-to-br from-purple-900/10 to-indigo-900/10 border border-purple-500/20 rounded-xl p-6 md:p-8 py-[30px] my-[70px]">
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
                        <Upload className="h-4 w-4 mr-2 inline" />
                        Resume
                      </FormLabel>
                      <FormControl>
                        <Dropzone onDrop={handleFileDrop}>
                          <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 cursor-pointer hover:border-purple-500/50 transition-colors text-center bg-[#242938]">
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-300">
                              {resumeFile ? (
                                <span className="text-green-400">{resumeFile.name} selected</span>
                              ) : (
                                <>
                                  <span className="font-medium">Click to upload</span> or drag and drop your resume
                                </>
                              )}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              Supported formats: PDF, DOC, DOCX (Max 5MB)
                            </p>
                          </div>
                        </Dropzone>
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Upload your resume or CV
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
