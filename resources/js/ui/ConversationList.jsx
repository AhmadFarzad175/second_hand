import { useQuery } from "@tanstack/react-query";
import {
    List,
    ListItem,
    Avatar,
    Typography,
    Box,
    CircularProgress,
    IconButton,
    Divider,
    Badge,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { fetchConversations } from "../repositories/ChatRepository";

const ConversationList = ({ onClose, onSelectChat }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { data: conversations, isLoading } = useQuery({
        queryKey: ["conversations"],
        queryFn: fetchConversations,
    });

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Messages
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <List sx={{ flex: 1, overflowY: "auto" }}>
                {conversations?.length > 0 ? (
                    conversations.map((conversation) => {
                        const otherUser =
                            conversation.user_one.id === user.id
                                ? conversation.user_two
                                : conversation.user_one;
                        return (
                            <div key={conversation.id}>
                                <ListItem
                                    button
                                    onClick={() =>
                                        onSelectChat(conversation.id)
                                    }
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "action.hover",
                                        },
                                        py: 2,
                                    }}
                                >
                                    <Avatar
                                        src={otherUser.image}
                                        sx={{ width: 48, height: 48 }}
                                    >
                                        {otherUser.name.charAt(0)}
                                    </Avatar>
                                    <Box ml={2} sx={{ flex: 1 }}>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                        >
                                            <Typography fontWeight="bold">
                                                {otherUser.name}
                                            </Typography>
                                            {conversation.last_message && (
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        conversation
                                                            .last_message.time
                                                    }
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                noWrap
                                                sx={{
                                                    maxWidth: "100%",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {conversation.last_message
                                                    ?.content ||
                                                    "No messages yet"}
                                            </Typography>

                                            {conversation.unread_count > 0 && (
                                                <Badge
                                                    badgeContent={
                                                        conversation.unread_count
                                                    }
                                                    color="primary"
                                                    overlap="circular"
                                                    sx={{ mt: 1, mr:1 }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })
                ) : (
                    <Box p={4} textAlign="center">
                        <Typography color="text.secondary">
                            No conversations yet
                        </Typography>
                    </Box>
                )}
            </List>
        </Box>
    );
};

export default ConversationList;
