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
  [theme.breakpoints.down('sm')]: {
    '& .MuiDrawer-paper': {
      width: '100%',
    },
  },
}));

const ChatDrawer = ({ 
  open, 
  onClose, 
  selectedChat, 
  productDetails,
  onSelectChat, 
  onBackToList,
  currentUserId
}) => {
  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      {!selectedChat ? (
        <ConversationList
          onClose={onClose}
          onSelectChat={onSelectChat}
        />
      ) : (
        <ChatWindow 
          selectedChat={selectedChat}
          productDetails={productDetails}
          onBack={onBackToList}
          onClose={onClose}
          currentUserId={currentUserId}
        />
      )}
    </StyledDrawer>
  );
};

export default ChatDrawer;