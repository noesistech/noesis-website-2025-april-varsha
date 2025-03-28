
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

    if (!requirements) {
      return new Response(
        JSON.stringify({ error: "No requirements provided" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Call OpenAI API to enhance the requirements
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error("OpenAI API error:", errorData);
      
      return new Response(
        JSON.stringify({ error: "Failed to enhance requirements" }),
        { 
          status: openAIResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const data = await openAIResponse.json();
    const enhancedRequirements = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ enhancedRequirements }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
