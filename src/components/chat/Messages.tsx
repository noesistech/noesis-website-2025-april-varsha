
import React, { useEffect, useRef } from 'react';
import { useMessageContext } from '@/contexts/MessageContext';
import Typing from './Typing';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from "react-markdown";
import { oneDark, dracula, vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';

interface MessagesProps {
  handlePromptClick: (text: string) => void;
}

const Messages = ({ handlePromptClick }: MessagesProps) => {
  const { messages, isTyping, connectionStatus } = useMessageContext();
  const messageListRef = useRef(null);

    
  // Modified scroll function to prevent page scrolling
  const scrollToEnd = () => {
      if (messageListRef.current) {
        requestAnimationFrame(() => {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        });
      }
  };

  // Ensure scroll happens after messages update or typing indicator changes
  useEffect(() => {
      scrollToEnd();
      console.log("Messages updated or typing state changed, isTyping:", isTyping);
  }, [messages, isTyping]);

  const syntaxTheme = oneDark;

  const MarkdownComponents = {
      code({ node, inline, className, children, ...props }) {
          const hasLang = /language-(\w+)/.exec(className || '');

          return hasLang ? (
              <SyntaxHighlighter
                  style={syntaxTheme}
                  language={hasLang[1]}
                  PreTag="div"
                  className="codeStyle"
                  showLineNumbers={true}
                  useInlineStyles={true}
                  children={children}
              />
          ) : (
              <code className={className} {...props} children={children} />
          )
      },
      a({ node, ...props }) {
          return <a target="_blank" {...props} />;
      },
      table({ node, ...props }) {
          return (
              <div className='table-responsive'>
                  <table className="table table-bordered" {...props} />
              </div>
          );
      }
  }


  return (
    <div className="h-full flex flex-col !h-[450px] sm:!h-[550px] !overflow-auto thin-y-scrollbar pb-20" ref={messageListRef} >
      <div className="flex-1 p-4 "  >
        {connectionStatus === 'disconnected' && (
          <Alert variant="destructive" className="mb-4 bg-red-900/40 border-red-700 text-white">
            <WifiOff className="h-4 w-4 mr-2" />
            <AlertDescription>
              Connection lost. Attempting to reconnect...
            </AlertDescription>
          </Alert>
        )}
        {connectionStatus === 'connecting' && (
          <Alert className="mb-4 bg-amber-900/40 border-amber-700 text-white">
            <AlertDescription>
              Reconnecting to chat service...
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-6 pb-8" >
        {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`markdown-text max-w-[85%] p-3 rounded-lg shadow-md ${
                  msg.role === "user"
                    ? "bg-noesis-purple text-white rounded-tr-none"
                    : "bg-gray-800 text-white rounded-tl-none"
                }`}
              >
                <ReactMarkdown components={MarkdownComponents}>
                  {typeof msg.content === "object"
                    ? JSON.stringify(msg.content, null, 2)
                    : msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          
          {/* The Typing component now internally checks isTyping state */}
          <div className="flex justify-start mt-6">
            <Typing />
          </div>
          
          <div className="h-1" />
        </div>
      </div>
    </div>
  );
};

export default Messages;
