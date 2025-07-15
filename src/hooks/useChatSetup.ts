
import { useEffect } from 'react';
import { useMessageContext } from '@/contexts/MessageContext';
import { toast } from 'sonner';

// Constants
const BOT_ID = 'c59b7102_209e_4047_994d_1d40efdfff3f';
const API_URL = 'https://botnew.brainstormer.io';
const BOT_API_KEY = 'a5yq99EA07SxF9k4qmqC';
const ASSETS_URL = 'https://studio.brainstormer.io';

export const useChatSetup = () => {
  const {
    messages,
    setMessages,
    setBot,
    setPrompts,
    chatId,
    setChatId,
    setConnectWebsocket
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
            name: bot.Name || "Neo AI Assistant",
            description: bot.Description || "How can I help you today?",
            image: botImage ? `${ASSETS_URL}${botImage}` : ''
          });
          
          // Set messages from chat history if available
          if (responseData.chat && responseData.chat.chat_history && responseData.chat.chat_history.length > 0) {
            console.log("Setting messages from chat history:", responseData.chat.chat_history);
            setMessages([...responseData.chat.chat_history]);
          } else if (bot.WelcomeMessage && messages.length === 0) {
            console.log("Setting welcome message:", bot.WelcomeMessage);
            setMessages([{ role: 'assistant', content: bot.WelcomeMessage }]);
          }
          
          // Set starter prompts if available
          if (bot.StarterPrompts && bot.StarterPrompts.length > 0) {
            console.log("Setting starter prompts:", bot.StarterPrompts);
            setPrompts(bot.StarterPrompts);
          }
        }
      } catch (error) {
        console.error("Error fetching bot info:", error);
        toast.error("Could not connect to the chat bot. Please try again later.");
      }
    };
    
    fetchBotInfo();
  }, []);
  
  // Enable websocket connection when we have a chatId
  useEffect(() => {
    if (chatId) {
      console.log("Chat ID available, enabling WebSocket:", chatId);
      setConnectWebsocket(true);
    }
  }, [chatId, setConnectWebsocket]);
};

export default useChatSetup;
