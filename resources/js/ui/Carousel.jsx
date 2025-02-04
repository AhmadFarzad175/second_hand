import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";

export default function ScrollableTabsWithImagesAndFilterButton() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{width: '100%', padding: { xs: "15px 0px", sm: 1, md: 2, xl: 3 }}}>

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        bgcolor: "background.paper",
        overflow: "hidden",
        paddingBottom:3
      }}
    >
      <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {[...Array(40)].map((_, index) => (
            <Tab
              key={index}
              icon={
                <img
                  src={
                    index % 2 === 0
                      ? "/images/paint.jpg"
                      : "/images/category.jpg"
                  }
                  alt={`Item ${index + 1}`}
                  style={{ width: 25, height: 25 }}
                />
              }
              label={`Item ${index + 1}`}
            />
          ))}
        </Tabs>
        
      </Box>
      <Button
        variant="contained"
        color="warning"
        size="large"
        startIcon={<TuneIcon />}
        sx={{ marginLeft: 2, whiteSpace: "nowrap", minWidth: 100 }}
      >
        Filter
      </Button>
    </Box>
  );
}
