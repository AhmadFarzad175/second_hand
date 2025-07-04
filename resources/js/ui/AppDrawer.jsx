import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
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
      <Box sx={{ width: 260 }} role="presentation">
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Box
            component="img"
            src="/images/eliteValley.png"
            alt="EliteValley"
            sx={{ width: 128, height: "auto", mb: 2 }}
          />
        </Box>
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
            component={Link}
            to="/favorite"
            onClick={() => toggleDrawer(false)}
            button
          >
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>

          <ListItem
            key="add-business"
            component={Link}
            to="/add-business"
            onClick={() => toggleDrawer(false)}
            button
          >
            <ListItemIcon>
              <AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Add Business" />
          </ListItem>

          <ListItem
            key="profile"
            component={Link}
            to="/profile"
            onClick={() => toggleDrawer(false)}
            button
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem key="dark-mode" onClick={() => toggleDrawer(false)} button>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
          </ListItem>

          <ListItem key="language" onClick={() => toggleDrawer(false)} button>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default AppDrawer;
