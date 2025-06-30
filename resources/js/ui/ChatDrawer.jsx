import  { useState } from 'react';
import { Drawer, styled } from '@mui/material';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const ChatDrawer = ({ open, onClose, unreadCount, setUnreadCount }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      {!selectedChat ? (
        <ConversationList
          onClose={onClose} 
          onSelectChat={setSelectedChat}
          setUnreadCount={setUnreadCount}
        />
      ) : (
        <ChatWindow 
          selectedChat={selectedChat} 
          onBack={() => setSelectedChat(null)}
          onClose={onClose}
        />
      )}
    </StyledDrawer>
  );
};

export default ChatDrawer;