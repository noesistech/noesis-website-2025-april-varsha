
import { useEffect } from 'react';
import { useMessageContext } from '@/contexts/MessageContext';
import { toast } from 'sonner';

// Constants
const BOT_ID = '69e0cdcc_7477_4179_99e9_876e48adba3b';
const API_URL = 'https://bot.brainstormer.dev';
const BOT_API_KEY = 'Vyhn1VFWqwM2LLvnaPpG';
const ASSETS_URL = 'https://studio.brainstormer.dev';

// Define a proper type for prompt objects
type Prompt = string | { Question?: string; question?: string; [key: string]: any };

export const useChatSetup = () => {
  const {
    messages,
    setMessages,
    setBot,
    setPrompts,
    chatId,
    setChatId,
    setConnectWebsocket,
    hasInteracted
  } = useMessageContext();

  // Initialize bot and fetch information
  useEffect(() => {
    const fetchBotInfo = async () => {
      try {
        console.log("Attempting to fetch bot info");
        // Get stored chatId if exists
        const storedChatId = localStorage.getItem('chatId');
        console.log("Stored chat ID:", storedChatId);
        
        const requestData = {
          domain: '*',
          language: 'en'
        };
        
        if (storedChatId) {
          Object.assign(requestData, { chat_id: storedChatId });
        }
        
        console.log("Sending request to API:", `${API_URL}/bot_by_id/bot_${BOT_ID}`);
        const response = await fetch(`${API_URL}/bot_by_id/bot_${BOT_ID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Api-token': BOT_API_KEY
          },
          body: JSON.stringify(requestData)
        });
        
        const responseData = await response.json();
        console.log("Bot info response:", responseData);
        
        if (responseData?.data?.length > 0) {
          const bot = responseData.data[0].attributes;
          const botImage = bot?.ProfileImage?.data?.attributes?.url;
          
          // Save new chat ID if provided
          if (responseData.chat_id) {
            console.log("New chat ID received:", responseData.chat_id);
            localStorage.setItem('chatId', responseData.chat_id);
            setChatId(responseData.chat_id);
          } else if (storedChatId) {
            console.log("Using stored chat ID:", storedChatId);
            setChatId(storedChatId);
          }
          
          // Set bot info
          setBot({
            name: bot.Name || "Noesis AI Assistant",
            description: bot.Description || "How can I help you today?",
            image: botImage ? `${ASSETS_URL}${botImage}` : ''
          });
          
          // Only set messages from chat history if user has already interacted
          // or if they have a chat history from before
          if (responseData.chat && responseData.chat.chat_history && 
              responseData.chat.chat_history.length > 0 && 
              (hasInteracted || responseData.chat.chat_history.length > 1)) {
            console.log("Setting messages from chat history:", responseData.chat.chat_history);
            setMessages([...responseData.chat.chat_history]);
          }
          
          // Set starter prompts if available and make sure they're processed correctly
          if (bot.StarterPrompts && bot.StarterPrompts.length > 0) {
            console.log("Setting starter prompts:", bot.StarterPrompts);
            
            // Ensure prompts are in the correct format regardless of what the API returns
            const formattedPrompts: Prompt[] = bot.StarterPrompts.map((prompt: any) => {
              if (typeof prompt === 'string') {
                return prompt;
              } else if (typeof prompt === 'object' && prompt) {
                // Return the original object, our helper functions will extract the right property
                return prompt;
              }
              return "What can you help me with?";
            });
            
            setPrompts(formattedPrompts);
          } else {
            // Set default prompts if none returned from API
            setPrompts([
              "What services does Noesis offer?",
              "How can I join the Noesis team?",
              "I'm interested in partnering with Noesis",
              "Tell me about your AI & Cloud solutions",
              "How can I contact the team?",
              "What makes Noesis different?",
              "Show me recent success stories"
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching bot info:", error);
        toast.error("Could not connect to the chat bot. Please try again later.");
      }
    };
    
    fetchBotInfo();
  }, [hasInteracted]);
  
  // Enable websocket connection when we have a chatId
  useEffect(() => {
    if (chatId) {
      console.log("Chat ID available, enabling WebSocket:", chatId);
      setConnectWebsocket(true);
    }
  }, [chatId, setConnectWebsocket]);
};

export default useChatSetup;
