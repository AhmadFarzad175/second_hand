import { Outlet } from "react-router-dom";
import { Container, Box } from '@mui/material';
import Navbar from "./NavBar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
    <Navbar />
    <Container maxWidth="xl">
        <Box component="main" sx={{padding: { xs: "20px 0", sm: 1, md: 2, xl: 3 }}}>
          <Outlet />
        </Box>
    </Container>
    <Footer />
    </>
  );
} 

export default AppLayout;

