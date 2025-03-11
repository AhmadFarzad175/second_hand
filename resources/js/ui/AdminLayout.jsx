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
            <Sidebar
                isMobile={isMobile}
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <AdminNavBar toggleSidebar={toggleSidebar} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: "100px 10px 20px 10px", // Padding for uniform spacing
                    pr: { md: "20px" },
                    backgroundColor: "#eee",
                }}
            >
                <Card
                    sx={{
                        padding: { xs: "20px 10px", sm: 1, md: 2, lg:3 },
                        borderRadius: "20px",
                        minHeight: "calc(100vh - 200px)", // Adjust based on your navbar height
                    }}
                >
                    <Outlet />
                </Card>
            </Box>
        </Box>
    );
}

export default AdminLayout;
