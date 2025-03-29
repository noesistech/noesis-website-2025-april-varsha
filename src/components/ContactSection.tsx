import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle, Wand, ArrowRight, ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  requirements: z.string().min(10, { message: "Requirements must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface RequirementsStep {
  question: string;
  fieldName: keyof ContactFormValues | null;
  answerType: 'text' | 'textarea' | 'info';
  placeholder?: string;
  isComplete: boolean;
}

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedRequirements, setEnhancedRequirements] = useState<string | null>(null);
  const [showEnhancedDialog, setShowEnhancedDialog] = useState(false);
  const [userFeedback, setUserFeedback] = useState<'satisfied' | 'continue' | null>(null);
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  
  const [isTypeformMode, setIsTypeformMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [steps, setSteps] = useState<RequirementsStep[]>([
    {
      question: "What is your name?",
      fieldName: "name",
      answerType: "text",
      placeholder: "John Doe",
      isComplete: false,
    },
    {
      question: "What's your email address?",
      fieldName: "email",
      answerType: "text",
      placeholder: "john@example.com",
      isComplete: false,
    },
    {
      question: "Tell me briefly about your project requirements.",
      fieldName: "requirements",
      answerType: "textarea",
      placeholder: "I need a website for my jewelry business...",
      isComplete: false,
    }
  ]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      requirements: ""
    }
  });

  const enhanceRequirements = async (initialRequirements?: string) => {
    const message = initialRequirements || form.getValues("requirements");
    
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
      toast({
        title: "Enhancing requirements...",
        description: "This may take a few seconds.",
      });

      const conversationContext = { ...responses };
      
      if (currentStep >= 0 && currentStep <= 2) {
        conversationContext.name = conversationContext.name || responses.name || "";
        conversationContext.email = conversationContext.email || responses.email || "";
        conversationContext.requirements = conversationContext.requirements || responses.requirements || message;
      }
      
      if (currentStep > 2) {
        if (steps[currentStep] && steps[currentStep].question) {
          conversationContext[`question_${currentStep}`] = steps[currentStep].question;
        }
        
        if (currentAnswer) {
          conversationContext[`answer_${currentStep}`] = currentAnswer;
        }
      }
      
      console.log("Calling enhance-requirements function with:", { requirements: message, conversation: conversationContext, currentStep });
      
      const { data, error } = await supabase.functions.invoke('enhance-requirements', {
        body: { 
          requirements: message,
          conversation: conversationContext,
          currentStep: currentStep
        },
      });

      console.log("Function response:", { data, error });

      if (error) {
        throw new Error(error.message || "Error invoking enhance-requirements function");
      }

      if (data?.nextQuestion) {
        const newStep: RequirementsStep = {
          question: data.nextQuestion,
          fieldName: null,
          answerType: "textarea",
          placeholder: "Type your answer here...",
          isComplete: false
        };
        
        setSteps(prevSteps => {
          const updatedSteps = [...prevSteps];
          
          if (currentStep < updatedSteps.length) {
            updatedSteps[currentStep] = {
              ...updatedSteps[currentStep],
              isComplete: true
            };
          }
          
          if (currentStep >= 2) {
            if (currentStep >= updatedSteps.length) {
              return [...updatedSteps, newStep];
            } else {
              updatedSteps[currentStep + 1] = newStep;
              return updatedSteps.slice(0, currentStep + 2);
            }
          }
          
          return updatedSteps;
        });
        
        setCurrentStep(prevStep => prevStep + 1);
        setCurrentAnswer("");
      } else if (data?.enhancedRequirements) {
        setEnhancedRequirements(data.enhancedRequirements);
        form.setValue("requirements", data.enhancedRequirements);
        setShowEnhancedDialog(true);
        setShowFeedbackDialog(true);
        
        setSteps(prevSteps => {
          const updatedSteps = [...prevSteps];
          if (updatedSteps[currentStep]) {
            updatedSteps[currentStep] = {
              ...updatedSteps[currentStep],
              isComplete: true
            };
          }
          return updatedSteps;
        });
        
        const finalStep: RequirementsStep = {
          question: "Great! I've gathered all the information needed. Would you like to submit your requirements now?",
          fieldName: null,
          answerType: "info",
          isComplete: true
        };
        
        setSteps(prevSteps => [...prevSteps, finalStep]);
        setCurrentStep(prevSteps => prevSteps + 1);
      }
      
      toast({
        title: "Process Successful",
        description: data?.enhancedRequirements ? "Your requirements have been enhanced." : "Next question prepared.",
      });
    } catch (error) {
      console.error("Error enhancing requirements:", error);
      
      let errorMessage = "There was a problem processing your requirements. Please try again.";
      
      if (error instanceof Error) {
        console.error("Error details:", error.message);
        if (process.env.NODE_ENV === 'development') {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      toast({
        title: "Process Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleContinueConversation = async () => {
    setUserFeedback('continue');
    setShowFeedbackDialog(false);
    
    // Reset to start a new conversation but keep the context
    setCurrentStep(currentStep + 1);
    
    const continueStep: RequirementsStep = {
      question: "What additional information or changes would you like to see in the specification?",
      fieldName: null,
      answerType: "textarea",
      placeholder: "Please tell us what you'd like to change or add...",
      isComplete: false
    };
    
    setSteps(prevSteps => [...prevSteps, continueStep]);
    setCurrentAnswer("");
    setAdditionalFeedback("");
    setShowEnhancedDialog(false);
  };

  const handleSubmitFeedback = () => {
    setUserFeedback('satisfied');
    setShowFeedbackDialog(false);
    form.handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      const { error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          name: data.name,
          email: data.email,
          message: data.requirements,
          userFeedback: userFeedback || 'satisfied',
          additionalFeedback: additionalFeedback
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      setShowSuccessDialog(true);
      form.reset();
      
      setIsTypeformMode(false);
      setCurrentStep(0);
      setResponses({});
      setCurrentAnswer("");
      setUserFeedback(null);
      setAdditionalFeedback("");
      setSteps([
        {
          question: "What is your name?",
          fieldName: "name",
          answerType: "text",
          placeholder: "John Doe",
          isComplete: false,
        },
        {
          question: "What's your email address?",
          fieldName: "email",
          answerType: "text",
          placeholder: "john@example.com",
          isComplete: false,
        },
        {
          question: "Tell me briefly about your project requirements.",
          fieldName: "requirements",
          answerType: "textarea",
          placeholder: "I need a website for my jewelry business...",
          isComplete: false,
        }
      ]);
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

  const handleNextStep = async () => {
    if (!currentAnswer && steps[currentStep].answerType !== 'info') {
      toast({
        title: "Input required",
        description: "Please provide an answer to continue.",
        variant: "destructive"
      });
      return;
    }

    const updatedResponses = { ...responses };
    
    if (steps[currentStep].fieldName) {
      updatedResponses[steps[currentStep].fieldName] = currentAnswer;
      form.setValue(steps[currentStep].fieldName, currentAnswer);
    } else if (currentStep >= 2) {
      updatedResponses[`answer_${currentStep}`] = currentAnswer;
    }
    
    setResponses(updatedResponses);
    
    const updatedSteps = [...steps];
    updatedSteps[currentStep] = {
      ...updatedSteps[currentStep],
      isComplete: true
    };
    setSteps(updatedSteps);

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      setCurrentAnswer("");
    } else if (currentStep === 2) {
      form.setValue("requirements", currentAnswer);
      await enhanceRequirements(currentAnswer);
    } else if (steps[currentStep].answerType !== 'info') {
      await enhanceRequirements();
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      
      if (steps[currentStep - 1].fieldName) {
        setCurrentAnswer(responses[steps[currentStep - 1].fieldName] || "");
      } else if (currentStep > 2) {
        setCurrentAnswer(responses[`answer_${currentStep - 1}`] || "");
      } else {
        setCurrentAnswer("");
      }
    }
  };

  const startTypeformFlow = () => {
    setIsTypeformMode(true);
    setCurrentStep(0);
    setCurrentAnswer("");
    setResponses({});
    
    setSteps([
      {
        question: "What is your name?",
        fieldName: "name",
        answerType: "text",
        placeholder: "John Doe",
        isComplete: false,
      },
      {
        question: "What's your email address?",
        fieldName: "email",
        answerType: "text",
        placeholder: "john@example.com",
        isComplete: false,
      },
      {
        question: "Tell me briefly about your project requirements.",
        fieldName: "requirements",
        answerType: "textarea",
        placeholder: "I need a website for my jewelry business...",
        isComplete: false,
      }
    ]);
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
              
              {isTypeformMode ? (
                <div className="space-y-8">
                  <div className="relative min-h-[320px]">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white/50 text-sm">Step {currentStep + 1} of {steps.length}</div>
                        <div className="text-white/50 text-sm">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</div>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full">
                        <div 
                          className="bg-gradient-to-r from-noesis-purple to-noesis-blue h-1 rounded-full transition-all duration-500"
                          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-white mb-4">{steps[currentStep]?.question}</h4>
                      
                      {steps[currentStep]?.answerType === 'text' && (
                        <Input
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          placeholder={steps[currentStep]?.placeholder || ""}
                          className="bg-white/5 border-white/10 focus:border-noesis-purple text-white"
                          disabled={isEnhancing}
                        />
                      )}
                      
                      {steps[currentStep]?.answerType === 'textarea' && (
                        <Textarea
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          placeholder={steps[currentStep]?.placeholder || ""}
                          className="bg-white/5 border-white/10 focus:border-noesis-purple text-white h-32"
                          disabled={isEnhancing}
                        />
                      )}
                      
                      {steps[currentStep]?.answerType === 'info' && (
                        <div className="p-4 bg-white/5 rounded-md text-white/80">
                          <p>Your requirements have been gathered and enhanced with AI. Review and submit when ready.</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePreviousStep}
                        disabled={currentStep === 0 || isEnhancing || isSubmitting}
                        className="border-white/10 text-white"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      
                      <Button
                        type="button"
                        variant="noesis"
                        onClick={handleNextStep}
                        disabled={isEnhancing || isSubmitting}
                        className="min-w-[120px]"
                      >
                        {isEnhancing ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </div>
                        ) : isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {steps[currentStep]?.answerType === 'info' ? (
                              <>
                                <Send className="w-4 h-4" />
                                <span>Submit</span>
                              </>
                            ) : (
                              <>
                                <span>Continue</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 text-center">
                    <Button 
                      variant="ghost" 
                      className="text-white/50 text-sm hover:text-white"
                      onClick={() => setIsTypeformMode(false)}
                      disabled={isEnhancing || isSubmitting}
                    >
                      Switch to standard form
                    </Button>
                  </div>
                </div>
              ) : (
                <>
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
                        name="requirements"
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
                                onClick={() => enhanceRequirements()}
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
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={startTypeformFlow}
                          disabled={isSubmitting || isEnhancing}
                          className="border-white/10 text-white"
                        >
                          Switch to step-by-step mode
                        </Button>
                        
                        <Button 
                          type="submit" 
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
                      </div>
                    </form>
                  </Form>
                </>
              )}
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

      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="bg-noesis-dark border-noesis-purple sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">How would you like to proceed?</DialogTitle>
            <DialogDescription className="text-white/70">
              Are you satisfied with the generated specification or would you like to continue the conversation?
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={handleContinueConversation}
                className="flex flex-col items-center p-6 h-auto border-white/10 hover:bg-white/5"
              >
                <MessageSquare className="h-10 w-10 mb-2 text-noesis-blue" />
                <span className="text-lg font-medium">Continue Conversation</span>
                <span className="text-sm text-white/60 mt-1">I'd like to provide more feedback</span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleSubmitFeedback}
                className="flex flex-col items-center p-6 h-auto border-white/10 hover:bg-white/5"
              >
                <ThumbsUp className="h-10 w-10 mb-2 text-green-500" />
                <span className="text-lg font-medium">Submit Now</span>
                <span className="text-sm text-white/60 mt-1">I'm satisfied with the specification</span>
              </Button>
            </div>
            
            {userFeedback === 'continue' && (
              <div className="mt-2">
                <Textarea
                  placeholder="What additional information or changes would you like to see in the specification?"
                  className="bg-white/5 border-white/10 focus:border-noesis-purple text-white h-32"
                  value={additionalFeedback}
                  onChange={(e) => setAdditionalFeedback(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    onClick={handleContinueConversation}
                    variant="noesis"
                    className="mt-2"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
