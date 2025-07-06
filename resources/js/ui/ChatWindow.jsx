import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Box,
    Typography,
    IconButton,
    TextField,
    InputAdornment,
    Paper,
    Stack,
    Avatar,
    CircularProgress,
} from "@mui/material";
import {
    Close as CloseIcon,
    Send as SendIcon,
    ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import {
    fetchMessages,
    sendMessage,
    markMessagesAsRead,
} from "../repositories/ChatRepository";

const ChatWindow = ({
    selectedChat,
    productDetails,
    onBack,
    onClose,
    currentUserId,
}) => {
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    // const { markMessagesAsRead } = useChat(); // Or import from your API
    const queryClient = useQueryClient();

    // Fetch messages
    const { data: messages, isLoading } = useQuery({
        queryKey: ["messages", selectedChat],
        queryFn: () => fetchMessages(selectedChat),
        enabled: !!selectedChat,
    });

    // ... other state and refs

    // Set default message when product details are available
    useEffect(() => {
        if (productDetails) {
            setNewMessage(
                `Hi, I'm interested in your ${productDetails.name} ($${productDetails.price})`
            );
        }
    }, [productDetails]);

    // Mark as read when opening chat
    useEffect(() => {
        if (selectedChat) {
            markMessagesAsRead(selectedChat);
        }
    }, [selectedChat]);

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: sendMessage,
        onMutate: async (newMessageData) => {
            // Optimistic update
            await queryClient.cancelQueries(["messages", selectedChat]);

            const previousMessages = queryClient.getQueryData([
                "messages",
                selectedChat,
            ]);

            queryClient.setQueryData(["messages", selectedChat], (old) => [
                ...old,
                {
                    id: Date.now(), // temporary ID
                    conversation_id: selectedChat,
                    sender_id: currentUserId,
                    message: newMessageData.message,
                    is_read: false,
                    created_at: new Date().toISOString(),
                    sender: {
                        id: currentUserId,
                        name: "You",
                        avatar: null,
                    },
                },
            ]);

            return { previousMessages };
        },
        onError: (err, newMessageData, context) => {
            queryClient.setQueryData(
                ["messages", selectedChat],
                context.previousMessages
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries(["messages", selectedChat]);
            queryClient.invalidateQueries(["conversations"]);
        },
    });

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        sendMessageMutation.mutate({
            conversation_id: selectedChat,
            message: newMessage,
            sender_id: currentUserId,
        });

        setNewMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
                <Box display="flex" alignItems="center">
                    <IconButton onClick={onBack} sx={{ mr: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {messages?.find(
                                (msg) => msg.sender_id !== currentUserId
                            )?.sender?.name || "Chat"}
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Product Info Section */}
            {productDetails && (
                <Box
                    sx={{
                        p: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                    >
                        About the product:
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                            component="img"
                            src={productDetails.image}
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1,
                                objectFit: "cover",
                            }}
                            alt={productDetails.name}
                        />
                        <Box>
                            <Typography variant="body1" fontWeight="bold">
                                {productDetails.name}
                            </Typography>
                            <Typography variant="body2">
                                ${productDetails.price}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            )}

            {/* Messages */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                }}
            >
                {messages?.map((message) => (
                    <Box
                        key={message.id}
                        sx={{
                            display: "flex",
                            justifyContent:
                                message.sender_id === currentUserId
                                    ? "flex-end"
                                    : "flex-start",
                            mb: 2,
                        }}
                    >
                        <Stack
                            direction={
                                message.sender_id === currentUserId
                                    ? "row-reverse"
                                    : "row"
                            }
                            spacing={1}
                            sx={{ maxWidth: "80%" }}
                        >
                            {message.sender_id !== currentUserId && (
                                <Avatar
                                    src={message.sender?.image}
                                    sx={{ width: 32, height: 32 }}
                                >
                                    {message.sender?.name?.charAt(0)}
                                </Avatar>
                            )}
                            <Stack>
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        borderRadius:
                                            message.sender_id === currentUserId
                                                ? "18px 18px 0 18px"
                                                : "18px 18px 18px 0",
                                        backgroundColor:
                                            message.sender_id === currentUserId
                                                ? "primary.main"
                                                : "background.paper",
                                        color:
                                            message.sender_id === currentUserId
                                                ? "primary.contrastText"
                                                : "text.primary",
                                        boxShadow: 1,
                                    }}
                                >
                                    <Typography variant="body1">
                                        {message.message}
                                    </Typography>
                                </Paper>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    textAlign={
                                        message.sender_id === currentUserId
                                            ? "right"
                                            : "left"
                                    }
                                    sx={{ px: 1 }}
                                >
                                    {message.created_at}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box
                sx={{
                    p: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
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
                    disabled={sendMessageMutation.isLoading}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    color="primary"
                                    onClick={handleSendMessage}
                                    disabled={
                                        !newMessage.trim() ||
                                        sendMessageMutation.isLoading
                                    }
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Box>
    );
};

export default ChatWindow;
