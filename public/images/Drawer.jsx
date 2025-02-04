import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@mui/icons-material/Language";

function AppDrawer({ open, toggleDrawer }) {
  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      <div className="w-64" role="presentation">
        <div className="p-4">
          <img
            src="/images/eliteValley.png"
            alt="EliteValley"
            className="h-auto w-32 mx-auto mb-4"
          />
        </div>
        <Divider />
        <List>
          <ListItem
            key="home"
            component={Link}
            to="/"
            onClick={() => toggleDrawer(false)}
            button
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            key="favorite"
            button
            component={Link}
            to="/favorite"
            onClick={() => toggleDrawer(false)}
          >
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem
            key="add-business"
            button
            component={Link}
            to="/add-business"
            onClick={() => toggleDrawer(false)}
          >
            <ListItemIcon>
              <AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Add Business" />
          </ListItem>
          <ListItem
            key="profile"
            button
            component={Link}
            to="/profile"
            onClick={() => toggleDrawer(false)}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem key="dark-mode" button onClick={() => toggleDrawer(false)}>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
          </ListItem>
          <ListItem key="language" button onClick={() => toggleDrawer(false)}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default AppDrawer;
