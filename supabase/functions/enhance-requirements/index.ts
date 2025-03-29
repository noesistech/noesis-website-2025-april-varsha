
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requirements, conversation = {}, currentStep = 0 } = await req.json();

    console.log("Received requirements:", requirements);
    console.log("Conversation context:", conversation);
    console.log("Current step:", currentStep);

    if (!requirements) {
      console.error("No requirements provided");
      return new Response(
        JSON.stringify({ error: "No requirements provided" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    console.log("Calling OpenAI API...");
    
    // Prepare the conversation history for OpenAI
    const messages = [
      {
        role: "system",
        content: currentStep >= 5 
          ? "You are an AI assistant that helps enhance project requirements for a tech consulting company. Based on the conversation so far, create a comprehensive, well-structured project specification. Format your response with Markdown. Do not ask any more questions."
          : "You are an AI assistant that helps gather project requirements. Based on the conversation so far, generate exactly ONE specific follow-up question that will help you better understand the project requirements. The question should be concise and direct. Do not include any other text besides the question."
      },
      {
        role: "user",
        content: requirements
      }
    ];
    
    // Add previous conversation context - make sure to add them in the correct order
    // Process all entries, both direct field values and question_X entries
    const orderedConversation = [];
    
    // First add the basic fields
    if (conversation.name) {
      orderedConversation.push({
        step: -2,
        role: "user",
        content: `My name is ${conversation.name}`
      });
    }
    
    if (conversation.email) {
      orderedConversation.push({
        step: -1,
        role: "user",
        content: `My email is ${conversation.email}`
      });
    }
    
    // Add the initial requirements if they exist
    if (conversation.requirements) {
      orderedConversation.push({
        step: 0,
        role: "user",
        content: conversation.requirements
      });
    }
    
    // Then add all question_X entries
    Object.entries(conversation).forEach(([key, value]) => {
      if (key.startsWith("question_")) {
        const stepNum = parseInt(key.split("_")[1]);
        orderedConversation.push({
          step: stepNum,
          role: "user",
          content: value as string
        });
      }
    });
    
    // Sort by step number and add to messages
    orderedConversation
      .sort((a, b) => a.step - b.step)
      .forEach(item => {
        messages.push({
          role: item.role,
          content: item.content
        });
      });
    
    console.log("OpenAI messages payload:", JSON.stringify(messages));
    
    const isLastStep = currentStep >= 5; // Assuming we want at most 6 questions (0-5)
    
    const systemPrompt = isLastStep 
      ? "You are an AI assistant that helps enhance project requirements for a tech consulting company. Based on the conversation so far, create a comprehensive, well-structured project specification. Format your response with Markdown. Do not ask any more questions."
      : "You are an AI assistant that helps gather project requirements. Based on the conversation so far, generate exactly ONE specific follow-up question that will help you better understand the project requirements. The question should be concise and direct. Do not include any other text besides the question.";
      
    console.log("OpenAI system prompt:", systemPrompt);
    
    const requestBody = {
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    };
    
    console.log("OpenAI request payload:", JSON.stringify(requestBody));

    // Call OpenAI API
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Log the raw response for debugging
    console.log("OpenAI API status:", openAIResponse.status);
    
    const responseText = await openAIResponse.text();
    console.log("OpenAI API raw response:", responseText);

    if (!openAIResponse.ok) {
      let errorMessage = "Failed to enhance requirements";
      
      try {
        const errorData = JSON.parse(responseText);
        console.error("OpenAI API error:", errorData);
        
        if (errorData.error) {
          errorMessage = `OpenAI error: ${errorData.error.message || errorData.error.type || "Unknown error"}`;
        }
      } catch (parseError) {
        console.error("Error parsing OpenAI error response:", parseError);
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { 
          status: openAIResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    try {
      const data = JSON.parse(responseText);
      console.log("Parsed OpenAI response:", data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error("Unexpected response format from OpenAI API");
      }
      
      const content = data.choices[0].message.content;
      
      if (isLastStep) {
        // Final step - return enhanced requirements
        console.log("Enhanced requirements successfully generated");
        return new Response(
          JSON.stringify({ enhancedRequirements: content }),
          { 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      } else {
        // Return the next question
        console.log("Next question generated:", content);
        return new Response(
          JSON.stringify({ nextQuestion: content }),
          { 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    } catch (parseError) {
      console.error("Error parsing successful OpenAI response:", parseError);
      return new Response(
        JSON.stringify({ error: "Error processing OpenAI response" }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: `Unexpected error: ${error.message}` }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
