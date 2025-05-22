import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatDrawer from './ChatDrawer';

const ChatSystem = () => {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const toggleDrawer = () => {
    setOpen(!open);
    if (!open && unreadCount > 0) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      <ChatButton 
        unreadCount={unreadCount} 
        onClick={toggleDrawer} 
      />
      <ChatDrawer 
        open={open} 
        onClose={toggleDrawer}
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
      />
    </>
  );
};

export default ChatSystem;