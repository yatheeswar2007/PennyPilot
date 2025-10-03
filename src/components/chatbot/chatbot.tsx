
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import ChatWindow from './chat-window';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform transform hover:scale-110"
          aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <MessageSquare className="w-8 h-8" />
          )}
        </Button>
      </div>

      {isOpen && <ChatWindow closeChat={() => setIsOpen(false)} />}
    </>
  );
};

export default Chatbot;
