
import { supabase } from "@/integrations/supabase/client";

/**
 * Utility function to test the contact form by sending a test email
 */
export const sendTestEmail = async (testEmail: string) => {
  console.log(`Sending test email to ${testEmail}...`);
  
  try {
    // Call the edge function directly
    const { data, error } = await supabase.functions.invoke('send-contact-email', {
      body: {
        name: "Test User",
        email: testEmail,
        subject: "Test Email from Noesis.tech",
        message: "This is a test message to verify the contact form email functionality is working correctly. If you received this, the email system is working as expected!"
      },
    });
    
    if (error) {
      console.error("Error calling edge function:", error);
      return { success: false, error };
    }
    
    console.log("Edge function response:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error };
  }
};
