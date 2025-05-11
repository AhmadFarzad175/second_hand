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
        // AdminLayout.jsx

        <Box sx={{ display: "flex", overflowX: "hidden" }}>
            {" "}
            {/* <-- add overflowX */}
            <Sidebar
                isMobile={isMobile}
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: "30px 10px 20px 10px",
                    pr: { md: "20px" },
                    backgroundColor: "#eee",
                    overflowX: "hidden", // <-- important
                }}
            >
                <Card
                    sx={{
                        padding: { xs: "20px 10px", sm: 1, md: 2, lg: 3 },
                        borderRadius: "10px",
                        minHeight: "calc(100vh - 100px)",
                        maxWidth: "100%", // <-- important
                        overflowX: "hidden", // <-- optional but safer
                    }}
                >
                    <Outlet />
                </Card>
            </Box>
        </Box>
    );
}

export default AdminLayout;
