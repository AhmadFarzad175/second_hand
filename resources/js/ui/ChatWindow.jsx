
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  InputAdornment, 
  Paper, 
  Stack, 
  Avatar
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Person as PersonIcon, 
  Send as SendIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
// import { formatDistanceToNow } from 'date-fns';

const ChatWindow = ({ selectedChat, onBack, onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Sample data
  const chatData = {
    1: {
      name: 'John Doe',
      item: 'iPhone 13 Pro',
      messages: [
        {
          id: 101,
          sender: 1,
          text: 'Hi, is this iPhone still available?',
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: 102,
          sender: 0,
          text: 'Yes, it is! Are you interested?',
          timestamp: new Date(Date.now() - 1800000),
        },
      ]
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(chatData[selectedChat]?.messages || []);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 0,
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Box display="flex" alignItems="center">
          <IconButton onClick={onBack} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {chatData[selectedChat]?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {chatData[selectedChat]?.item}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 0 ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Stack direction={message.sender === 0 ? 'row-reverse' : 'row'} spacing={1}>
              {message.sender !== 0 && (
                <Avatar sx={{ width: 32, height: 32 }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
              )}
              <Stack>
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: message.sender === 0
                      ? '18px 18px 0 18px'
                      : '18px 18px 18px 0',
                    backgroundColor: message.sender === 0
                      ? 'primary.main'
                      : 'background.paper',
                    color: message.sender === 0
                      ? 'primary.contrastText'
                      : 'text.primary',
                    maxWidth: '70%',
                    boxShadow: 1
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign={message.sender === 0 ? 'right' : 'left'}
                  sx={{ px: 1 }}
                >
                  {/* {formatDistanceToNow(message.timestamp, { addSuffix: true })} */}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper'
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default ChatWindow;