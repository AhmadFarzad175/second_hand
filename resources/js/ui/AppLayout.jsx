import { Outlet } from "react-router-dom";
import { Container, Box } from '@mui/material';
import Navbar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import ChatSystem from "./ChatSystem";

function AppLayout() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchTerm}/>
      <Container maxWidth="xl">
          <Box component="main" sx={{padding: { xs: "20px 0", sm: 1, md: 2, xl: 3 }}}>
            <Outlet context={{ searchTerm }}/>
          </Box>
          <ChatSystem />      </Container>
      <Footer />
    </>
  );
} 

export default AppLayout;