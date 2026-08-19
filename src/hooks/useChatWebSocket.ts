import { useState, useEffect, useCallback, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useMessageContext } from '@/contexts/MessageContext';
import { toast } from 'sonner';

// Constants
const BOT_ID = 'c59b7102_209e_4047_994d_1d40efdfff3f';
const WEBSOCKET_URL = 'botnew.brainstormer.io';
const BOT_API_KEY = 'a5yq99EA07SxF9k4qmqC';

export const useChatWebSocket = () => {
  const { 
    setMessages, 
    setIsTyping, 
    setMessageStreaming, 
    setPrompts,
    chatId,
    connectWebsocket,
    setConnectionStatus,
    lastActiveTimestamp,
    reconnectionAttempts,
    setReconnectionAttempts,
    setConnectWebsocket  // Fixed: Added the missing property from context
  } = useMessageContext();
  
  const [wsConnected, setWsConnected] = useState(false);
  const lastPongRef = useRef<number>(Date.now());
  const connectionCheckInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const pingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  
  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (connectionCheckInterval.current) clearInterval(connectionCheckInterval.current);
      if (pingInterval.current) clearInterval(pingInterval.current);
    };
  }, []);

  // Set up WebSocket connection with improved reliability
  const { sendJsonMessage, readyState, lastMessage, getWebSocket } = useWebSocket(
    chatId ? `wss://${WEBSOCKET_URL}/socket/widget_handler/${chatId}?token=${BOT_API_KEY}` : null,
    {
      onOpen: (event) => {
        console.log("WebSocket connection established", event);
        setWsConnected(true);
        setConnectionStatus('connected');
        toast.success("Connected to chat service");
      },
      onMessage: (event) => {
        if (event.data === 'pong') {
          return;
        }
        
        try {
          const response = JSON.parse(event.data);
          console.log("WebSocket message received:", response);
          
          if (response.questions) {
            setPrompts(response.questions);
            return;
          }
          
          if (response.message) {
            setMessages((prevMessages) => {
              // If the last message is from assistant, append to it
              if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].role === 'assistant') {
                return [
                  ...prevMessages.slice(0, -1),
                  { 
                    ...prevMessages[prevMessages.length - 1], 
                    content: prevMessages[prevMessages.length - 1].content + response.message 
                  }
                ];
              }
              // Otherwise add as new message
              return [...prevMessages, { role: 'assistant', content: response.message }];
            });
          }
          
          // Check for finish in different possible response formats
          if (response?.data?.finish_reason === "stop" || response.finish_reason === "stop") {
            setMessageStreaming(false);
            setIsTyping(false);
            console.log("Message complete, hiding typing indicator");
          }
          
          // Additional check to ensure typing indicator is hidden after response
          if (response.message && !response.continue) {
            // If there's no 'continue' flag, assume it's the end of the message
            // setMessageStreaming(false);
            setIsTyping(false);
            console.log("Response received without continue flag, hiding typing indicator");
          }
        } catch (error) {
          console.error("Error processing message:", error);
          setIsTyping(false);
          setMessageStreaming(false);
        }
      },
      onError: (event) => {
        console.error("WebSocket error:", event);
        toast.error("Connection error. Please try again.");
        setIsTyping(false);
      },
      onClose: () => {
        console.log("WebSocket connection closed");
      },
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 100,
      retryOnError: true,
      heartbeat: {
          interval: 55000
      },
    },
    chatId && connectWebsocket
  );

  useEffect(() => {
      if(chatId){
          setConnectWebsocket(true);
      }
  }, [chatId])

  const sendMessage = useCallback((text: string): boolean => {
    if (!text.trim()) {
      console.log("Cannot send message: Empty message");
      return false;
    }
    
    if (readyState !== ReadyState.OPEN) {
      console.log("Cannot send message: WebSocket not connected", { readyState });
      toast.error("Not connected to chat service. Please try again when connection is restored.");
      
      setConnectionStatus('connecting');
      if (getWebSocket()) {
        try {
          getWebSocket()?.close();
          setReconnectionAttempts(prev => prev + 1);
        } catch (err) {
          console.error("Error closing WebSocket:", err);
        }
      }
      return false;
    }

    // Send message via WebSocket
    try {
      console.log("Sending message via WebSocket:", text);
      sendJsonMessage({
        query: text,
        bot_id: `bot_${BOT_ID}`,
        language: 'en'
      });
      
      // Set typing state immediately for better UX
      setIsTyping(true);
      setMessageStreaming(true);
      lastPongRef.current = Date.now(); // Reset pong timer on user message
      
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      return false;
    }
  }, [
    readyState, 
    sendJsonMessage, 
    setIsTyping, 
    setMessageStreaming, 
    getWebSocket, 
    reconnectionAttempts, 
    setConnectionStatus,
    setReconnectionAttempts
  ]);

  return {
    sendMessage,
    readyState,
    wsConnected,
    setWsConnected
  };
};

export default useChatWebSocket;
