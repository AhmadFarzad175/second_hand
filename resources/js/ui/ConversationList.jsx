import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText 
} from '@mui/material';
import { Close as CloseIcon, Person as PersonIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const ConversationList = ({ onClose, onSelectChat, setUnreadCount }) => {
  const chats = [
    {
      id: 1,
      name: 'John Doe',
      lastMessage: 'Is this item still available?',
      time: '10:30 AM',
      unread: true,
      item: 'iPhone 13 Pro',
      itemImage: 'https://images.unsplash.com/photo-1633891120687-539a316f0e5c?w=200'
    },
    // Add more chats as needed
  ];

  const handleChatSelect = (chatId) => {
    onSelectChat(chatId);
    setUnreadCount(prev => prev - (chats.find(c => c.id === chatId)?.unread ? 1 : 0));
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h6" component="div">
          Your Messages
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {chats.map((chat) => (
          <React.Fragment key={chat.id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              onClick={() => handleChatSelect(chat.id)}
            >
              <ListItemAvatar>
                <Avatar src={chat.itemImage}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {chat.item}
                    </Typography>
                    <br />
                    <Box display="flex" alignItems="center">
                      {chat.unread && (
                        <CheckCircleIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
                      )}
                      {chat.lastMessage}
                    </Box>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default ConversationList;