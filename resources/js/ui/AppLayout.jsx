import { Outlet } from "react-router-dom";
import { Container, Box, Button } from "@mui/material";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import ChatSystem from "./ChatSystem";
import Can from "../repositories/Can";

function AppLayout() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            <Navbar onSearch={setSearchTerm} />
            {/* <Can permission="create product">
                <Button variant="contained">Create Product</Button>
            </Can> */}
            <Container maxWidth="xl">
                <Box
                    component="main"
                    sx={{ padding: { xs: "20px 0", sm: 1, md: 2, xl: 3 } }}
                >
                    <Outlet context={{ searchTerm }} />
                </Box>
                <ChatSystem />{" "}
            </Container>
            <Footer />
        </>
    );
}

export default AppLayout;
