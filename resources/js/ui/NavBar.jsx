import { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Box,
    Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import SearchInput from "./SearchInput";
import AppDrawer from "../../../public/images/Drawer";

function NavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function toggleDrawer(open) {
        setDrawerOpen(open);
    }

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={1}
            sx={{
                bgcolor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(10px)",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    {/* Left Section */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            onClick={() => toggleDrawer(true)}
                            sx={{ display: { md: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/">
                            <Box
                                component="img"
                                src="/images/eliteValley.png"
                                alt="EliteValley"
                                sx={{
                                    display: { xs: "none", md: "block" },
                                    width: 112,
                                }}
                            />
                        </Link>
                        <Box
                            sx={{
                                display: { xs: "none", sm: "block" },
                                width: { lg: 320, xl: 384 },
                                ml: 2,
                            }}
                        >
                            <SearchInput />
                        </Box>
                    </Box>

                    {/* Right Section */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton>
                            <AddBusinessIcon />
                        </IconButton>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton
                            sx={{ display: { xs: "none", md: "flex" } }}
                        >
                            <Brightness4Icon />
                        </IconButton>
                        <IconButton
                            sx={{ display: { xs: "none", md: "flex" } }}
                        >
                            <LanguageIcon />
                        </IconButton>
                        <IconButton onClick={handleMenuOpen}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>

            {/* Drawer */}
            <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

            {/* User Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>

            {/* Search Input in Mobile View */}
            <Box sx={{ display: { sm: "none" }, px: 2, pb: 2 }}>
                <SearchInput />
            </Box>
        </AppBar>
    );
}

export default NavBar;
