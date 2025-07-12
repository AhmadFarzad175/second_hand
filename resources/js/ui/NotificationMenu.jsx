import { useState, useEffect } from "react";
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Badge,
    Typography,
    Divider,
    CircularProgress,
    Box,
} from "@mui/material";
import {
    Notifications as NotificationsIcon,
    Receipt as TransactionIcon,
    Favorite as FavoriteIcon,
    AccountCircle as ProfileIcon,
    Warning as AlertIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AxiosSetup from "../repositories/AxiosSetup";

const notificationIcons = {
    transaction_request: <TransactionIcon color="primary" />,
    favorite: <FavoriteIcon color="error" />,
    profile_update: <ProfileIcon color="info" />,
    alert: <AlertIcon color="warning" />,
    default: <NotificationsIcon color="action" />,
};

function NotificationMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { t } = useTranslation();
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [hasUnread, setHasUnread] = useState(false);

    // Fetch notifications
    const { data: notifications, isPending } = useQuery({
        queryKey: ["notifications", userId],
        queryFn: async () => {
            try {
                const response = await AxiosSetup.get(`/notifications`, {
                    params: { user_id: userId },
                });
                return response.data;
            } catch (error) {
                throw new Error(
                    error.response?.data?.message ||
                        "Failed to fetch notifications"
                );
            }
        },
        enabled: !!userId,
        refetchInterval: 60000,
    });

    // Mark all as read mutation
    const markAllAsReadMutation = useMutation({
        mutationFn: async () => {
            await AxiosSetup.patch(`/notifications/mark-all-read`, {
                user_id: userId,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications", userId]);
            setHasUnread(false);
        },
    });

    // Check for unread notifications
    useEffect(() => {
        if (notifications) {
            const unread = notifications.some((n) => !n.is_read);
            setHasUnread(unread);
        }
    }, [notifications]);

    const handleMenuOpen = async (event) => {
        setAnchorEl(event.currentTarget);
        // Mark all as read when menu opens
        if (hasUnread) {
            await markAllAsReadMutation.mutateAsync();
        }
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (notification) => {
        handleMenuClose();
        switch (notification.type) {
            case "transaction_request":
                navigate(`/transactions/${notification.notifiable_id}`);
                break;
            case "favorite":
                navigate(`/products/${notification.notifiable_id}`);
                break;
            case "profile_update":
                navigate("/profile");
                break;
            default:
                break;
        }
    };

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                sx={{
                    position: "relative",
                    "&:hover": {
                        backgroundColor: "action.hover",
                    },
                }}
            >
                <Badge
                    badgeContent={
                        hasUnread
                            ? notifications?.filter((n) => !n.is_read).length
                            : 0
                    }
                    color="error"
                    overlap="circular"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <NotificationsIcon />
                </Badge>
                {hasUnread && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            width: 8,
                            height: 8,
                            bgcolor: "error.main",
                            borderRadius: "50%",
                        }}
                    />
                )}
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        width: 380,
                        maxHeight: 500,
                        borderRadius: 2,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                        mt: 1.5,
                        "& .MuiMenuItem-root": {
                            py: 1.5,
                            px: 2,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {t("navbar.Notifications")}
                    </Typography>
                </Box>
                <Divider />

                {isPending ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 3,
                        }}
                    >
                        <CircularProgress size={24} />
                    </Box>
                ) : notifications?.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 3 }}>
                        <NotificationsIcon
                            sx={{ fontSize: 40, color: "text.disabled", mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            {t("navbar.No notifications")}
                        </Typography>
                    </Box>
                ) : (
                    notifications?.map((notification) => (
                        <MenuItem
                            key={notification.id}
                            onClick={() =>
                                handleNotificationClick(notification)
                            }
                            sx={{
                                bgcolor: notification.is_read
                                    ? "background.paper"
                                    : "action.selected",
                                borderLeft: notification.is_read
                                    ? "none"
                                    : "3px solid",
                                borderLeftColor: "primary.main",
                                "&:hover": {
                                    bgcolor: "action.hover",
                                },
                                alignItems: "flex-start", // Align items to top
                                whiteSpace: "normal", // Allow text wrapping
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, mt: "4px" }}>
                                {" "}
                                {/* Add top padding to icon */}
                                {notificationIcons[notification.type] ||
                                    notificationIcons.default}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={
                                            notification.is_read
                                                ? "normal"
                                                : "bold"
                                        }
                                        sx={{
                                            flexGrow: 1,
                                            wordBreak: "break-word", // Break long words
                                            overflowWrap: "break-word", // Alternative for word-break
                                        }}
                                    >
                                        {notification.message}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: "block", mt: 0.5 }} // Add margin top
                                    >
                                        {notification.created_at}
                                    </Typography>
                                }
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden", // Prevent overflow
                                }}
                            />
                        </MenuItem>
                    ))
                )}
            </Menu>
        </>
    );
}

export default NotificationMenu;
