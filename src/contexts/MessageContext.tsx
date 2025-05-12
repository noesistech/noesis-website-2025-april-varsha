
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Bot {
  name: string;
  description: string;
  image: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Define a proper type for prompt objects
type Prompt = string | { Question?: string; question?: string; [key: string]: any };

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

interface MessageContextProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  messageStreaming: boolean;
  setMessageStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  bot: Bot | null;
  setBot: React.Dispatch<React.SetStateAction<Bot | null>>;
  prompts: Prompt[];
  setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
  chatId: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  connectWebsocket: boolean;
  setConnectWebsocket: React.Dispatch<React.SetStateAction<boolean>>;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: React.Dispatch<React.SetStateAction<ConnectionStatus>>;
  lastActiveTimestamp: number;
  setLastActiveTimestamp: React.Dispatch<React.SetStateAction<number>>;
  reconnectionAttempts: number;
  setReconnectionAttempts: React.Dispatch<React.SetStateAction<number>>;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageStreaming, setMessageStreaming] = useState(false);
  const [bot, setBot] = useState<Bot | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [chatId, setChatId] = useState("");
  const [connectWebsocket, setConnectWebsocket] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [lastActiveTimestamp, setLastActiveTimestamp] = useState(Date.now());
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);

  // Initialize chat if we have a stored chatId
  useEffect(() => {
    const storedChatId = localStorage.getItem('chatId');
    if (storedChatId) {
      setChatId(storedChatId);
    }
  }, []);

  // Enable websocket connection when we have a chatId
  useEffect(() => {
    if (chatId) {
      setConnectWebsocket(true);
    }
  }, [chatId]);

  // Set last active timestamp when user interacts with the chat
  useEffect(() => {
    const handleUserInteraction = () => {
      setLastActiveTimestamp(Date.now());
    };
    
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        isTyping,
        setIsTyping,
        messageStreaming,
        setMessageStreaming,
        bot,
        setBot,
        prompts,
        setPrompts,
        chatId,
        setChatId,
        connectWebsocket,
        setConnectWebsocket,
        connectionStatus,
        setConnectionStatus,
        lastActiveTimestamp,
        setLastActiveTimestamp,
        reconnectionAttempts,
        setReconnectionAttempts
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
