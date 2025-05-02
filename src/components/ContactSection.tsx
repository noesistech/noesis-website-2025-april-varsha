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
  return;
};
export default ContactSection;