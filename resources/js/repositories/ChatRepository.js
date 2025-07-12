// api.js
import AxiosSetup from './AxiosSetup';

export async function fetchConversations() {
    try {
        const response = await AxiosSetup.get('/conversations');
        return response.data.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch conversations"
        );
    }
}

export async function createProductConversation(productId, sellerId) {
    try {
        const response = await AxiosSetup.post('/conversations', {
            user_id: sellerId,
            product_id: productId
        });
        return response.data.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to create conversation"
        );
    }
}

export async function fetchMessages(conversationId) {
    try {
        const response = await AxiosSetup.get(`/messages/${conversationId}`);
        return response.data.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch messages"
        );
    }
}

export async function sendMessage(messageData) {
    console.log('message data',messageData);
    try {
        const response = await AxiosSetup.post(
            `/messages/${messageData.id}`,
            messageData
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to send message"
        );
    }
}

export async function deleteMessage(messageId) {
    try {
        await AxiosSetup.delete(`/messages/${messageId}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to delete message"
        );
    }
}

export async function markMessagesAsRead(conversationId) {
    try {
        await AxiosSetup.post(`/messages/mark-read/${conversationId}`);
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to mark messages as read"
        );
    }
}


export async function getUnreadCount() {
    try {
        const response = await AxiosSetup.get('/messages/unread-count');
        return response.data.unread_count || 0;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to get unread count"
        );
    }
}