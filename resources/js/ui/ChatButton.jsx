import React from 'react';
import { Button, Badge, styled } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

const FloatingButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: 0,
  bottom: '40%',
  zIndex: theme.zIndex.modal,
  minWidth: 'auto',
  width: 56,
  height: 56,
  borderRadius: '28px 0 0 28px', // Half circle on left side
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[6],
  transform: 'translateX(44px)', // Default hidden state
  transition: theme.transitions.create(['transform', 'background-color'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeOut,
  }),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateX(0)', // Fully visible on hover
    boxShadow: theme.shadows[8],
  },
  '&.MuiButton-root': {
    padding: 0, // Remove default padding
    minWidth: 'auto', // Remove minimum width
  },
}));

const ChatButton = ({ unreadCount, onClick }) => {
  return (
    <FloatingButton 
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(0)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(44px)'}
    >
      <Badge
        badgeContent={unreadCount}
        color="error"
        overlap="circular"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ChatIcon fontSize="medium" />
      </Badge>
    </FloatingButton>
  );
};

export default ChatButton;