import * as React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateProduct() {
  const [images, setImages] = React.useState([]);

  const handleAddImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>
      <Grid container spacing={3}>
        {/* Left Side - Form Fields */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField fullWidth label="Name" variant="outlined" />
            </Grid>

            {/* Categories */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Categories</InputLabel>
                <Select label="Categories">
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                  <MenuItem value="category3">Category 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Write */}
            <Grid item xs={12}>
              <TextField fullWidth label="Write" variant="outlined" />
            </Grid>

            {/* Net Price and Discount */}
            <Grid item xs={6}>
              <TextField fullWidth label="Net Price" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Discount" type="number" variant="outlined" />
            </Grid>

            {/* Color */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Color</InputLabel>
                <Select label="Color">
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Quantity and Condition */}
            <Grid item xs={6}>
              <TextField fullWidth label="Quantity" type="number" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Condition</InputLabel>
                <Select label="Condition">
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="used">Used</MenuItem>
                  <MenuItem value="refurbished">Refurbished</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            {/* Use by Location */}
            <Grid item xs={12}>
              <TextField fullWidth label="Use by Location" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side - Image Upload Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="subtitle1">Product Images</Typography>
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "100%", // Square aspect ratio
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
              {images.length < 6 && (
                <Grid item xs={4}>
                  <Button
                    component="label"
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AddPhotoAlternateIcon />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleAddImage}
                    />
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}