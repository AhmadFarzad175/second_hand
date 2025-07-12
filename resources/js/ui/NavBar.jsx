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
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Logout } from "@mui/icons-material";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Can from "../repositories/Can";
import { getUser, logout } from "../repositories/AuthRepository";
import { useTranslation } from "react-i18next";
import AppDrawer from "./AppDrawer";
import SearchInput from "./SearchInput";
import NotificationMenu from "./NotificationMenu";



function NavBar({ onSearch }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isUser = Boolean(getUser());
    const { t, i18n } = useTranslation();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageMenuOpen = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageAnchorEl(null);
    };

    function toggleDrawer(open) {
        setDrawerOpen(open);
    }

    const toggleMobileSearch = () => {
        setMobileSearchOpen(!mobileSearchOpen);
    };

    const handleSearch = (term) => {
        const currentPath = location.pathname;
        if (term) {
            navigate(`${currentPath}?search=${encodeURIComponent(term)}`);
        } else {
            navigate(currentPath);
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

    const handleLogout = () => {
        handleMenuClose();
        logout();
        navigate("login");
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        handleLanguageMenuClose();
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: "#eee",
                boxShadow: "none",
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
                                src="/eliteValley.png"
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

                        {/* Notification Icon */}
                        {isUser && <NotificationMenu />}

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

                        {/* Language Dropdown */}
                        <IconButton
                            sx={{ display: { xs: "none", md: "flex" } }}
                            onClick={handleLanguageMenuOpen}
                        >
                            <LanguageIcon />
                        </IconButton>
                        <Menu
                            anchorEl={languageAnchorEl}
                            open={Boolean(languageAnchorEl)}
                            onClose={handleLanguageMenuClose}
                        >
                            <MenuItem onClick={() => changeLanguage("en")}>
                                <ListItemText>
                                    {t("navbar.languages.english")}
                                </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => changeLanguage("fa")}>
                                <ListItemText>
                                    {t("navbar.languages.dari")}
                                </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => changeLanguage("ps")}>
                                <ListItemText>
                                    {t("navbar.languages.pashto")}
                                </ListItemText>
                            </MenuItem>
                        </Menu>

                        {/* User dropdown or login button */}
                        {isUser ? (
                            <IconButton onClick={handleMenuOpen}>
                                <AccountCircleIcon />
                            </IconButton>
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/login")}
                                startIcon={<LoginIcon />}
                            >
                                {t("navbar.Login")}
                            </Button>
                        )}
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

            <Can permission="view product">
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={goProfile}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{t("navbar.Profile")}</ListItemText>
                    </MenuItem>

                    <Can permission="create product">
                        <MenuItem onClick={goDashboard}>
                            <ListItemIcon>
                                <DashboardIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                                {t("navbar.Admin Panel")}
                            </ListItemText>
                        </MenuItem>
                    </Can>

                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{t("navbar.logout")}</ListItemText>
                    </MenuItem>
                </Menu>
            </Can>
        </AppBar>
    );
}

export default NavBar;
