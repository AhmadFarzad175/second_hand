import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, YouTube, Instagram, Android, Apple } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        padding: 4,
        marginTop: 4,
      }}
    >
      <Grid container spacing={4}>
        {/* Support Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Box>
            <Typography variant="body2">About Us</Typography>
            <Typography variant="body2">Contact Us</Typography>
            <Typography variant="body2">Help Center</Typography>
            <Typography variant="body2">How to Sell</Typography>
            <Typography variant="body2">How to Purchase</Typography>
          </Box>
        </Grid>

        {/* We Accept Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            We Accept
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {/* Replace these icons with actual payment method icons */}
            <img src="https://via.placeholder.com/40" alt="Payment Method 1" />
            <img src="https://via.placeholder.com/40" alt="Payment Method 2" />
            <img src="https://via.placeholder.com/40" alt="Payment Method 3" />
            <img src="https://via.placeholder.com/40" alt="Payment Method 4" />
          </Box>
        </Grid>

        {/* Find Us On Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Find Us On
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton href="https://facebook.com" target="_blank" color="primary">
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="primary">
              <Twitter />
            </IconButton>
            <IconButton href="https://youtube.com" target="_blank" color="primary">
              <YouTube />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="primary">
              <Instagram />
            </IconButton>
          </Box>
        </Grid>

        {/* Get the App Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Get the App
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <IconButton href="https://play.google.com" target="_blank" color="primary">
              <Android />
            </IconButton>
            <IconButton href="https://www.apple.com/app-store/" target="_blank" color="primary">
              <Apple />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
