import React, { useState, useRef } from 'react';
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
  resume: z.string().min(1, {
    message: "Please upload your resume."
  })
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const CareersSection = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Define default values for the form
  const defaultValues: Partial<ApplicationFormValues> = {
    fullName: "",
    email: "",
    position: "",
    message: "",
    resume: ""
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues
  });

  // Handle file drop and file input change
  const handleFileDrop = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Add file size validation (5MB = 5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        form.setError('resume', { 
          type: 'manual',
          message: 'File size must be less than 5MB' 
        });
        setResumeFile(null);
        form.setValue("resume", "");
        return;
      }
      
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        form.setError('resume', { 
          type: 'manual',
          message: 'Please upload a PDF, DOC, or DOCX file' 
        });
        setResumeFile(null);
        form.setValue("resume", "");
        return;
      }
      
      setResumeFile(file);
      form.setValue("resume", file.name);
      form.clearErrors('resume');
      
      toast({
        title: "Resume uploaded",
        description: `File "${file.name}" is ready to be submitted with your application.`,
        variant: "default"
      });
    }
  };

  // Function to handle file input change
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileDrop(Array.from(files));
    }
  };

  // Function to trigger file picker
  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    if (!resumeFile) {
      form.setError('resume', { 
        type: 'manual',
        message: 'Please upload your resume before submitting.' 
      });
      toast({
        title: "Resume Required",
        description: "Please upload your resume before submitting.",
        variant: "destructive"
      });
      return;
    }
  
    // Convert resume file to base64
    const fileBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Strip off the "data:...base64," prefix
        const base64Content = result.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = reject;
      reader.readAsDataURL(resumeFile);
    });
  
    const filename = resumeFile.name;
  
    const params = {
      from: "Noesis.tech <invites@brainstormer.io>",
      to: "sales@noesis.tech",
      subject: `New Career Application for ${data.position}`,
      html: `
        <div style="margin:0;padding:0">
          <h1 style="text-align:center;">New Application Received</h1>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Position:</strong> ${data.position}</p>
          <p><strong>Cover Letter:</strong> <pre style="font: small/1.5 Arial, Helvetica, sans-serif; white-space: pre-wrap;">${data.message}</pre></p>
          <p><strong>Resume:</strong> ${filename}</p>
          <p>The resume has been attached as a downloadable file.</p>
        </div>
      `,
      attachments: [
        {
          filename: filename,
          content: fileBase64
        }
      ]
    };
  
    try {
      setIsSubmitting(true);
      const response = await fetch("https://botnew.brainstormer.io/resendTesting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
  
      // if (response.ok) {
        toast({
          title: "Application Submitted",
          description: "We've received your application. Thank you!",
          variant: "default"
        });
        form.reset();
        setResumeFile(null);
      // } else {
      //   throw new Error("Email sending failed");
      // }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your application.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
                        <div>
                          {/* Hidden file input */}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileInputChange}
                            style={{ display: 'none' }}
                          />
                          
                          {/* Dropzone with click handler */}
                          <Dropzone onDrop={handleFileDrop}>
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors text-center bg-[#242938] ${
                                form.formState.errors.resume 
                                  ? 'border-red-500/50 hover:border-red-500/70' 
                                  : 'border-purple-500/30 hover:border-purple-500/50'
                              }`}
                              onClick={triggerFilePicker}
                            >
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
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Upload your resume or CV
                      </FormDescription>
                      <FormMessage />
                    </FormItem>} />
                
                <div className="flex justify-end">
                  <Button type="submit" variant="noesis" className="px-8" disabled={isSubmitting}>
                     {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"></div>
                          Sending...
                        </div>
                      ) : 'Submit Application'
                    }
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