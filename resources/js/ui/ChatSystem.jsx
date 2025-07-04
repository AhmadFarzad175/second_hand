import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnreadCount } from "../repositories/ChatRepository";
import ChatButton from "./ChatButton";
import ChatDrawer from "./ChatDrawer";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useChat } from "../contexts/ChatContext";
const ChatSystem = () => {
    const [open, setOpen] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const queryClient = useQueryClient();
    const user = JSON.parse(localStorage.getItem("user"));
    const { chatState, closeChat } = useChat();
    const [productDetails, setProductDetails] = useState(
        chatState.productDetails
    );

    useEffect(() => {
        if (chatState.initialConversation) {
            setSelectedChat(chatState.initialConversation);
            setProductDetails(chatState.productDetails);
        }
    }, [chatState.initialConversation, chatState.productDetails]);

    const handleClose = () => {
        setSelectedChat(null);
        closeChat();
    };

    // Fetch unread count
    const { data: unreadData } = useQuery({
        queryKey: ["unreadCount"],
        queryFn: getUnreadCount,
        refetchInterval: 30000, // Poll every 30 seconds
    });
    const unreadCount = unreadData || 0;

    // WebSocket setup
    useEffect(() => {
        if (!user) return;

        // Initialize Pusher and Echo
        window.Pusher = Pusher;

        const echo = new Echo({
            broadcaster: "pusher",
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
            encrypted: true,
            authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
        });

        // Listen for new messages
        echo.private(`conversations.${user.id}`).listen(
            "MessageSent",
            (data) => {
                queryClient.invalidateQueries([
                    "messages",
                    data.message.conversation_id,
                ]);
                queryClient.invalidateQueries(["unreadCount"]);
                queryClient.invalidateQueries(["conversations"]);
            }
        );

        // Listen for deleted messages
        echo.private(`conversations.${user.id}`).listen(
            "MessageDeleted",
            (data) => {
                queryClient.invalidateQueries([
                    "messages",
                    data.message.conversation_id,
                ]);
                queryClient.invalidateQueries(["conversations"]);
            }
        );

        return () => {
            echo.leave(`conversations.${user.id}`);
        };
    }, [user, queryClient]);

    const toggleDrawer = () => {
        setOpen(!open);
        if (!open && unreadCount > 0) {
            queryClient.invalidateQueries(["unreadCount"]);
        }
    };

    const handleSelectChat = (chatId) => {
        setSelectedChat(chatId);
    };

    const handleBackToList = () => {
        setSelectedChat(null);
    };

    return (
        <>
            <ChatButton
                unreadCount={unreadCount}
                onClick={() => setOpen(true)}
            />{" "}
            <ChatDrawer
                open={chatState.open}
                onClose={handleClose}
                selectedChat={selectedChat}
                productDetails={productDetails}
                onSelectChat={handleSelectChat}
                onBackToList={handleBackToList}
                currentUserId={user?.id}
            />
        </>
    );
};

export default ChatSystem;
