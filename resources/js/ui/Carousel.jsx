import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";

export default function CleanScrollableTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = [
    { name: "Art", icon: "/images/paint.jpg" },
    { name: "Design", icon: "/images/category.jpg" },
    { name: "Photo", icon: "/images/paint.jpg" },
    { name: "Fashion", icon: "/images/category.jpg" },
    { name: "Music", icon: "/images/paint.jpg" },
    { name: "Writing", icon: "/images/category.jpg" },
    { name: "Code", icon: "/images/paint.jpg" },
    { name: "Food", icon: "/images/category.jpg" },
  ];

  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      width: "100%",
      py: 3,
      mb:5,
      borderBottom: 1,
      borderColor: "divider"
    }}>
      <Box sx={{ 
        flexGrow: 1, 
        overflowX: "auto",
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "&::-webkit-scrollbar": { display: "none" } // Hide scrollbar for Chrome/Safari
      }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 48,
            "& .MuiTab-root": {
              minHeight: 48,
              padding: "6px 12px",
            },
            "& .MuiTabs-indicator": {
              height: 2,
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              icon={
                <img
                  src={category.icon}
                  alt={category.name}
                  style={{ 
                    width: 24, 
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
              }
              label={category.name}
            />
          ))}
        </Tabs>
      </Box>

      <Button
        variant="contained"
        startIcon={<TuneIcon />}
        sx={{ 
          ml: 2,
          minWidth: 90,
          borderRadius: 1,
        }}
      >
        Filter
      </Button>
    </Box>
  );
}