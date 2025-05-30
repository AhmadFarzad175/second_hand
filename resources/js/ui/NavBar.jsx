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
    Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import SearchInput from "./SearchInput";
import AppDrawer from "../../../public/images/Drawer";

function NavBar({ onSearch }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function toggleDrawer(open) {
        setDrawerOpen(open);
    }

    const toggleMobileSearch = () => {
        setMobileSearchOpen(!mobileSearchOpen);
    };

    const handleSearch = (term) => {
        // Get current path without search params
        const currentPath = location.pathname;

        if (term) {
            navigate(`${currentPath}?search=${encodeURIComponent(term)}`);
        } else {
            navigate(currentPath); // Clear search if term is empty
        }
    };
    const goProfile = () => {
        handleMenuClose();
        navigate("profile");
    };

    const goDashboard = () => {
        handleMenuClose();
        navigate("admin/dashboard");
    };

    return (
        <AppBar
            position="sticky"
            // color="default"
            // elevation={1}
            sx={{
                bgcolor: "#eee",
                boxShadow: "none",
                // backdropFilter: "blur(10px)",
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
                            <SearchInput onSearch={handleSearch} />
                        </Box>
                    </Box>

                    {/* Right Section */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Mobile Search Icon */}
                        <IconButton
                            onClick={toggleMobileSearch}
                            sx={{ display: { sm: "none" } }}
                        >
                            <SearchIcon />
                        </IconButton>

                        <IconButton
                            sx={{ display: { xs: "none", sm: "flex" } }}
                            onClick={() => navigate("add-product")}
                        >
                            <AddBusinessIcon />
                        </IconButton>
                        <IconButton
                            sx={{ display: { xs: "none", sm: "flex" } }}
                            onClick={() => navigate("favorite")}
                        >
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

            {/* Mobile Search Expansion */}
            <Collapse in={mobileSearchOpen}>
                <Box sx={{ px: 2, pb: 2, display: { sm: "none" } }}>
                    <SearchInput onSearch={handleSearch} />
                </Box>
            </Collapse>

            {/* Drawer */}
            <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

            {/* User Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={goProfile}
                >
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={goDashboard}
                >
                    <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Admin Panel</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </AppBar>
    );
}

export default NavBar;
