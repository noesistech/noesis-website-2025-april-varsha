
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
    const { requirements } = await req.json();

    console.log("Received requirements:", requirements);

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
    
    const requestBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI assistant that helps enhance project requirements for a tech consulting company. You need to take brief requirements and expand them into comprehensive, well-structured project specifications. Ask up to 3 clarifying questions if the requirements are too vague. Format your response with Markdown."
        },
        {
          role: "user",
          content: requirements
        }
      ],
      temperature: 0.7,
    };
    
    console.log("OpenAI request payload:", JSON.stringify(requestBody));

    // Call OpenAI API to enhance the requirements
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
      
      const enhancedRequirements = data.choices[0].message.content;
      console.log("Enhanced requirements successfully generated");

      return new Response(
        JSON.stringify({ enhancedRequirements }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
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
