import { useState } from "react";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Logout } from "@mui/icons-material";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow rounded bg-opacity-10 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between py-1 px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="/eliteValley.png"
              alt="EliteValley"
              className="h-auto w-28" // Adjust width as needed
            />
          </Link>
          <div className="hidden sm:block lg:w-80 xl:w-96">
            <SearchInput className="" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <IconButton>
            <AddBusinessIcon className="text-gray-800" />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon className="text-gray-800" />
          </IconButton>
          <IconButton sx={{ display: { xs: "none", md: "block" } }}>
            <Brightness4Icon className="text-gray-800" />
          </IconButton>
          <IconButton sx={{ display: { xs: "none", md: "block" } }}>
            <LanguageIcon className="text-gray-800" />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <AccountCircleIcon className="text-gray-800" />
          </IconButton>
        </div>

        {/* User Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
      </div>

      {/* Search Input in Mobile View */}
      <div className="sm:hidden px-4 pb-3">
        <SearchInput />
      </div>
    </nav>
  );
}
export default Navbar;