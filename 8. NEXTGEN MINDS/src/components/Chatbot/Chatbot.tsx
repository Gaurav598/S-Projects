import React from 'react';
import { FloatingChatButton } from './FloatingChatButton';
import { ChatWindow } from './ChatWindow';

export const Chatbot: React.FC = () => {
  return (
    <>
      <FloatingChatButton />
      <ChatWindow />
    </>
  );
};