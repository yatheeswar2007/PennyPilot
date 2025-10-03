
import ChatWindow from '@/components/chatbot/chat-window';
import React from 'react';

export default function AIBudgetingPage() {
  return (
    <div className="h-[calc(100vh-8rem)]">
        <ChatWindow isEmbedded={true} />
    </div>
  );
}
