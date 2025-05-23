import React from 'react';
import { Button, Badge, styled } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

const FloatingButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  right: 20,
  bottom: '50%',
  transform: 'translateY(50%)',
  zIndex: theme.zIndex.speedDial,
  minWidth: 'auto',
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.shadows[6],
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[8],
    transform: 'translateY(50%) scale(1.1)',
  },
}));

const ChatButton = ({ unreadCount, onClick }) => {
  return (
    <FloatingButton onClick={onClick}>
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