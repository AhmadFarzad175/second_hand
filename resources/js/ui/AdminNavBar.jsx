import { useState } from "react";
import React from "react";
import { AppBar, Toolbar, IconButton, Switch, Box } from "@mui/material";

import { Brightness4, Brightness7 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminNavBar = ({ toggleSidebar }) => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { xs: "100%", md: `calc(100% - 240px)` },
                ml: { xs: 0, md: `240px` },
                backgroundColor: "#eee", // Use the custom background color
                color: "#555", // Set text color to black for better contrast
                boxShadow: "none", //
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: {xs: "space-between", md:"end"} }}>
                {/* Left Side: Menu Icon */}
                <IconButton
                    color="inherit"
                    onClick={toggleSidebar}
                    sx={{ display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Right Side: User, Feedback, Dark Mode */}
                <Box>
                    {/* Feedback Notification Icon */}
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>

                    {/* Dark Mode Toggle */}
                    <Switch
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        icon={<Brightness7 />}
                        checkedIcon={<Brightness4 />}
                    />
                    {/* User Icon */}
                    <IconButton color="inherit">
                        <PersonIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminNavBar;
