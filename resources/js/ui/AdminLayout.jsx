import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Card, useMediaQuery } from "@mui/material";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar isMobile={isMobile} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <AdminNavBar toggleSidebar={toggleSidebar} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: {xs:"64px 10px 20px 10px", md: "64px 20px 20px 10px"}, // Padding for uniform spacing
                    backgroundColor: "#eee",
                }}
            >
                <Card sx={{ p: 3, borderRadius: 2, height: "100vh" }}>
                    <Outlet />
                </Card>
            </Box>
        </Box>
    );
}

export default AdminLayout;