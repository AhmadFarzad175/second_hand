import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
} from "@mui/material";
import {
    Dashboard,
    ShoppingCart,
    Group,
    Settings,
    BlurOn,
} from "@mui/icons-material";

const menuItems = [
    { name: "Dashboard", icon: <Dashboard />, key: "dashboard" },
    {
        name: "Product",
        icon: <ShoppingCart />,
        key: "product",
        subItems: ["Create Product", "Products"],
    },
    {
        name: "User",
        icon: <Group />,
        key: "user",
        subItems: ["Create User", "Users"],
    },
    {
        name: "Setting",
        icon: <Settings />,
        key: "setting",
        subItems: ["Create Setting", "Settings"],
    },
];

const Sidebar = ({ isMobile, sidebarOpen, toggleSidebar }) => {
    const [openMenu, setOpenMenu] = useState(null); // Track the currently open menu

    const handleMenuClick = (menu) => {
        setOpenMenu((prev) => (prev === menu ? null : menu)); // Toggle the clicked menu, close others
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
                },
            }}
        >
            <div style={{ padding: "16px", textAlign: "center" }}>
                <Typography variant="h6">Admin Panel</Typography>
            </div>
            <List sx={{ p: {xs:"17px 10px 10px 10px", md:"17px 0px 10px 10px"}, cursor: "pointer" }}>
                {/* Menu Items */}
                {menuItems.map((item) => (
                    <React.Fragment key={item.key}>
                        <ListItem
                            button
                            onClick={() => handleMenuClick(item.key)}
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
                                            sx={{
                                                pl: 6, // Reduced padding to make space smaller
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
                                                <BlurOn
                                                    sx={{ fontSize: "12px" }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={subItem} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
