// contexts/ChatContext.jsx
import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chatState, setChatState] = useState({
    open: false,
    initialConversation: null,
    productDetails: null
  });

  const openChat = (initialConversation, productDetails) => {
    setChatState({
      open: true,
      initialConversation,
      productDetails
    });
  };

  const closeChat = () => {
    setChatState(prev => ({ ...prev, open: false }));
  };

  return (
    <ChatContext.Provider value={{ chatState, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}