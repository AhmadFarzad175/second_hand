import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminNavBar = ({ toggleSidebar }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { xs: "100%", md: `calc(100% - 240px)` },
                ml: { xs: 0, md: `240px` },
                backgroundColor: "#eee", // Use the custom background color
                color: "#555", // Set text color to black for better contrast
                boxShadow: "none",
                py: 2,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: { xs: "space-between", md: "end" },
                }}
            >
                {/* Left Side: Menu Icon */}
                <IconButton
                    color="inherit"
                    onClick={toggleSidebar}
                    sx={{ display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Right Side: User, Feedback, Dark Mode */}
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "15px",
                        display: "flex",
                        overflow: "hidden", // Ensures child elements respect the border radius
                        
                    }}
                >
                    {/* Feedback Notification Icon */}
                    <IconButton
                        color="inherit"
                        sx={{
                            borderRadius: "0px",
                            p: 2,
                            overflow: "hidden", // Prevents overflow effects
                            "&:hover": {
                                backgroundColor: "#eee",
                            },
                        }}
                    >
                        <NotificationsIcon />
                    </IconButton>

                    {/* Dark Mode Toggle */}
                    <IconButton
                        color="inherit"
                        sx={{
                            borderRadius: "0px",
                            p: 2,
                            overflow: "hidden", // Prevents overflow effects
                            "&:hover": {
                                backgroundColor: "#eee",
                            },
                        }}
                    >
                        <Brightness4Icon />
                    </IconButton>

                    {/* User Icon */}
                    <IconButton
                        color="inherit"
                        sx={{
                            borderRadius: "0px",
                            p: 2,
                            overflow: "hidden", // Prevents overflow effects
                            "&:hover": {
                                backgroundColor: "#eee",
                            },
                            
                        }}
                    >
                        <PersonIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminNavBar;
