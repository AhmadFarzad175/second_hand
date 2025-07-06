// components/ChatButton.jsx
import { Badge, IconButton, Tooltip } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { useChat } from '../contexts/ChatContext';

function ChatButton({ unreadCount = 0 }) {
  const { openChat } = useChat();
  
  return (
    <Tooltip title={unreadCount > 0 ? 
      `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 
      "Open chat"
    }>
      <IconButton
        color="inherit"
        onClick={() => openChat(null, null)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          width: 56,
          height: 56,
          boxShadow: 3,
        }}
        size="large"
      >
        <Badge 
          badgeContent={unreadCount} 
          color="error"
          overlap="circular"
          invisible={unreadCount === 0}
        >
          <MessageIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

export default ChatButton;