import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Divider,
    Avatar,
    Box,
} from "@mui/material";
import {
    Dashboard,
    ShoppingCart,
    Group,
    Settings,
    BlurOn,
    ExitToApp,
    Person,
    Public,
    ExpandMore,
    ExpandLess,
} from "@mui/icons-material";

const menuItems = [
    {
        name: "Dashboard",
        icon: <Dashboard />,
        key: "dashboard",
        path: "/admin/dashboard",
    },
    {
        name: "Product",
        icon: <ShoppingCart />,
        key: "product",
        subItems: [
            { name: "Create Product", path: "/admin/create-product" },
            { name: "Products", path: "/admin/products" },
            { name: "Categories", path: "/admin/categories" },
        ],
    },
    {
        name: "User",
        icon: <Group />,
        key: "user",
        subItems: [
            { name: "Create User", path: "/admin/create-user" },
            { name: "Users", path: "/admin/users" },
        ],
    },
    {
        name: "Setting",
        icon: <Settings />,
        key: "setting",
        subItems: [
            { name: "Create Setting", path: "/settings/create" },
            { name: "Settings", path: "/settings" },
        ],
    },
];

const userMenuItems = [
    { name: "Go to Website", icon: <Public />, path: "/" },
    // { name: "Profile", icon: <Person />, path: "/profile" },
    { name: "Logout", icon: <ExitToApp />, path: "/logout" },
];

const Sidebar = ({ isMobile, sidebarOpen, toggleSidebar }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = (menu, path) => {
        if (path) {
            navigate(path);
            return;
        }
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    return (
        <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? sidebarOpen : true}
            onClose={toggleSidebar}
            sx={{
                width: 240,
                flexShrink: 0,
                borderRadius: 4,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "#eee",
                    color: "black",
                    border: 0,
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <div>
                <div style={{ padding: "30px", textAlign: "center" }}>
                    <Typography variant="h6">Admin Panel</Typography>
                </div>
                <List
                    sx={{
                        p: { xs: "17px 10px 10px 10px", md: "17px 0px 10px 10px" },
                        cursor: "pointer",
                    }}
                >
                    {menuItems.map((item) => (
                        <React.Fragment key={item.key}>
                            <ListItem
                                button
                                onClick={() => handleMenuClick(item.key, item.path)}
                                sx={{
                                    "&:hover": {
                                        borderRadius: 2,
                                        backgroundColor: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "inherit" }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                            {item.subItems && (
                                <Collapse
                                    in={openMenu === item.key}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        {item.subItems.map((subItem, index) => (
                                            <ListItem
                                                key={index}
                                                button
                                                onClick={() => navigate(subItem.path)}
                                                sx={{
                                                    pl: 5,
                                                    "&:hover": {
                                                        borderRadius: 2,
                                                        backgroundColor: "inherit",
                                                        color: "#666",
                                                    },
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color: "inherit",
                                                        minWidth: "30px",
                                                    }}
                                                >
                                                    <BlurOn sx={{ fontSize: "12px" }} />
                                                </ListItemIcon>
                                                <ListItemText primary={subItem.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </div>

            {/* User Profile Section at the bottom with menu expanding upwards */}
            <Box sx={{ mt: "auto" }}>
                <Collapse 
                    in={userMenuOpen} 
                    timeout="auto" 
                    unmountOnExit
                    sx={{
                        transformOrigin: 'bottom', // Makes the collapse expand upwards
                        "& .MuiCollapse-wrapper": {
                            display: 'flex',
                            flexDirection: 'column-reverse' // Reverses the items so they appear above
                        }
                    }}
                >
                    <List component="div" disablePadding>
                        {userMenuItems.map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                onClick={() => navigate(item.path)}
                                sx={{
                                    pl: 5,
                                    "&:hover": {
                                        borderRadius: 2,
                                        backgroundColor: "inherit",
                                        cursor: 'pointer',
                                        color: "#666",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "inherit",
                                        minWidth: "30px",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                
                <Divider />
                <ListItem
                    button
                    onClick={toggleUserMenu}
                    sx={{
                        "&:hover": {
                            borderRadius: 2,
                            cursor:'pointer',
                            backgroundColor: "white",
                        },
                    }}
                >
                    <ListItemIcon>
                        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                    </ListItemIcon>
                    <ListItemText 
                        primary="Admin User"
                        secondary="admin@example.com" 
                    />
                    </ListItem>
            </Box>
        </Drawer>
    );
};

export default Sidebar;