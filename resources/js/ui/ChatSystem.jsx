import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnreadCount } from "../repositories/ChatRepository";
import ChatButton from "./ChatButton";
import ChatDrawer from "./ChatDrawer";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useChat } from "../contexts/ChatContext";

const ChatSystem = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const queryClient = useQueryClient();
    const user = JSON.parse(localStorage.getItem("user"));
    const { chatState, closeChat } = useChat();
    const [productDetails, setProductDetails] = useState(
        chatState.productDetails
    );
    const echoRef = useRef(null);

    // Set initial chat if provided in chatState
    useEffect(() => {
        if (chatState.initialConversation) {
            setSelectedChat(chatState.initialConversation);
            setProductDetails(chatState.productDetails);
        }
    }, [chatState.initialConversation, chatState.productDetails]);

    // Get unread count - no polling by default
    const { data: unreadCount = 0 } = useQuery({
        queryKey: ["unreadCount"],
        queryFn: getUnreadCount,
    });

    // Handle chat close
    const handleClose = () => {
        setSelectedChat(null);
        closeChat();
    };

    // Handle chat selection
    const handleSelectChat = (chatId) => {
        setSelectedChat(chatId);
    };

    // Setup real-time connection
    // In your ChatSystem component
    useEffect(() => {
        if (!user?.id) return;

        const initializeRealTime = () => {
            window.Pusher = Pusher;

            // Add connection logging for debugging
            Pusher.logToConsole = true;

            const echo = new Echo({
                broadcaster: "pusher",
                key: import.meta.env.VITE_PUSHER_APP_KEY,
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
                forceTLS: true,
                encrypted: true,
                authEndpoint: `${
                    import.meta.env.VITE_API_URL
                }/broadcasting/auth`,
                auth: {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "X-Socket-ID": "", // Important for some browsers
                    },
                },
                disableStats: true,
                enabledTransports: ["ws", "wss"],
                wsHost: import.meta.env.VITE_PUSHER_APP_HOST || undefined,
                wsPort: import.meta.env.VITE_PUSHER_APP_PORT || undefined,
            });

            // Log connection events
            echo.connector.pusher.connection.bind("state_change", (states) => {
                console.log("Connection state changed:", states.current);
            });

            // Listen for unread count updates
            echo.private(`user.${user.id}`).listen(
                ".UnreadCountUpdated",
                ({ count }) => {
                    console.log("Received unread count update:", count);
                    queryClient.setQueryData(["unreadCount"], count);
                }
            );

            // Listen for new messages
            echo.private(`conversations.${user.id}`).listen(
                "MessageSent",
                (data) => {
                    console.log("New message received:", data);
                    queryClient.invalidateQueries({
                        queryKey: ["messages", data.message.conversation_id],
                    });
                    queryClient.invalidateQueries(["conversations"]);
                }
            );

            return echo;
        };

        const echoInstance = initializeRealTime();

        return () => {
            if (echoInstance) {
                echoInstance.disconnect();
            }
        };
    }, [user?.id, queryClient]);

    return (
        <>
            <ChatButton
                unreadCount={unreadCount}
                onClick={() => chatState.openChat()} // Use your chatState open function
            />
            <ChatDrawer
                open={chatState.open}
                onClose={handleClose}
                selectedChat={selectedChat}
                productDetails={productDetails}
                onSelectChat={handleSelectChat}
                onBackToList={() => setSelectedChat(null)}
                currentUserId={user?.id}
            />
        </>
    );
};

export default ChatSystem;
