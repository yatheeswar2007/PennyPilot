
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, Send, X, Loader2, Image as ImageIcon } from 'lucide-react';
import ChatMessage from './chat-message';
import { chat, type ChatInput, type ChatOutput } from '@/ai/flows/chat-flow';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  closeChat: () => void;
  isEmbedded?: boolean;
}

type Message = {
  role: 'user' | 'bot';
  text: string;
  data?: ChatOutput['transactions'];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ closeChat, isEmbedded = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm Penny. Please paste your spending data or upload a transaction screenshot, and I'll categorize it and show you a visual summary.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !imagePreview) return;

    const userMessageText = inputValue || 'Analyzing image...';
    const newUserMessage: Message = { role: 'user', text: userMessageText };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    const chatInput: ChatInput = { text: userMessageText, image: imagePreview || undefined };
    setImagePreview(null); // Clear preview after sending

    try {
      const result = await chat(chatInput);
      const botMessage: Message = {
        role: 'bot',
        text: result.response,
        data: result.transactions,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (e) {
      console.error('Chat API error:', e);
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(`Failed to get response from AI: ${errorMessage}`);
      const errorBotMessage: Message = {
        role: 'bot',
        text: `Sorry, I ran into a problem. Please try again. (${errorMessage})`,
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "bg-card shadow-2xl rounded-xl border flex flex-col transition-all duration-300",
      isEmbedded 
        ? "w-full h-full"
        : "fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm h-[70vh] max-h-[600px] animate-in slide-in-from-bottom-5"
    )}>
      {/* Header */}
      {!isEmbedded && (
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-lg font-semibold text-primary">Penny Assistant</h3>
          <Button variant="ghost" size="icon" onClick={closeChat}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start items-start gap-3 my-4">
             <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
             </div>
             <div className="bg-card text-card-foreground rounded-xl px-4 py-3 shadow max-w-sm rounded-tl-none">
                <p className="text-sm">Penny is thinking...</p>
             </div>
          </div>
        )}
      </ScrollArea>
      
      {error && (
        <div className='p-4 pt-0'>
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t bg-background/50 rounded-b-xl">
        {imagePreview && (
          <div className="relative mb-2 w-24 h-24 rounded-md overflow-hidden border">
            <img src={imagePreview} alt="Selected attachment" className="w-full h-full object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 rounded-full"
              onClick={() => {
                setImagePreview(null);
                if(imageInputRef.current) imageInputRef.current.value = "";
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => imageInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            type="text"
            placeholder="Paste spending data or attach an image..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && !isLoading && handleSendMessage()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || (!inputValue.trim() && !imagePreview)} aria-label="Send message">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
