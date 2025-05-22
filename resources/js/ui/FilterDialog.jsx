import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  Chip,
  Stack,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import TodayIcon from '@mui/icons-material/Today';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const dateOptions = [
  { label: "Today", value: "today", icon: <TodayIcon /> },
  { label: "Yesterday", value: "yesterday", icon: <EventIcon /> },
  { label: "This Week", value: "week", icon: <EventAvailableIcon /> },
  { label: "This Month", value: "month", icon: <CalendarMonthIcon /> },
  { label: "Custom Date", value: "custom" },
];

const distanceOptions = [
  // { label: "Any distance", value: "" },
  { label: "Within 5 km", value: "5" },
  { label: "Within 10 km", value: "10" },
  { label: "Within 25 km", value: "25" },
  { label: "Within 50 km", value: "50" },
  { label: "Within 100 km", value: "100" },
  { label: "Within 200 km", value: "200" },
  { label: "Custom distance", value: "custom" },
];

const conditionOptions = [
  { label: "New", value: "new", color: "success" },
  { label: "Used", value: "used", color: "warning" },
];

export default function FilterDialog({ open, onClose, filters, onApply }) {
  // These are internal state only, won't be sent to URL
  const [dateType, setDateType] = useState(
    filters.date ? "custom" : ""
  );
  const [distanceType, setDistanceType] = useState(
    filters.distance && !distanceOptions.some(opt => opt.value === filters.distance) 
      ? "custom" 
      : filters.distance || ""
  );
  const [customDistance, setCustomDistance] = useState(
    filters.distance && !distanceOptions.some(opt => opt.value === filters.distance) 
      ? filters.distance 
      : ""
  );
  
  // These values will be sent to URL
  const [localFilters, setLocalFilters] = useState({
    price: filters.price || "",
    condition: filters.condition || "",
    date: filters.date || "",
    distance: filters.distance || "",
  });

  const handlePriceChange = (event, newValue) => {
    setLocalFilters(prev => ({ ...prev, price: `${newValue[0]}-${newValue[1]}` }));
  };

  const handleDateTypeChange = (type) => {
    setDateType(type);
    if (type !== "custom") {
      setLocalFilters(prev => ({ ...prev, date: "" }));
    }
  };

  const handleCustomDateChange = (e) => {
    setLocalFilters(prev => ({ ...prev, date: e.target.value }));
  };

  const handleConditionChange = (condition) => {
    setLocalFilters(prev => ({
      ...prev,
      condition: prev.condition === condition ? "" : condition
    }));
  };

  const handleDistanceTypeChange = (type) => {
    setDistanceType(type);
    if (type !== "custom") {
      setLocalFilters(prev => ({ ...prev, distance: type }));
    }
  };

  const handleCustomDistanceChange = (e) => {
    const value = e.target.value;
    setCustomDistance(value);
    setLocalFilters(prev => ({ ...prev, distance: value }));
  };

  const handleApply = () => {
    const finalFilters = { ...localFilters };
    
    // Convert date type to actual date if needed
    if (dateType && dateType !== "custom") {
      const today = new Date();
      switch (dateType) {
        case "today":
          finalFilters.date = today.toISOString().split('T')[0];
          break;
        case "yesterday":
          today.setDate(today.getDate() - 1);
          finalFilters.date = today.toISOString().split('T')[0];
          break;
        case "week":
          today.setDate(today.getDate() - 7);
          finalFilters.date = today.toISOString().split('T')[0];
          break;
        case "month":
          today.setMonth(today.getMonth() - 1);
          finalFilters.date = today.toISOString().split('T')[0];
          break;
      }
    }
    
    // Handle distance filter
    if (distanceType === "custom") {
      finalFilters.distance = customDistance;
    } else {
      finalFilters.distance = distanceType;
    }
    
    // Clean up empty values
    Object.keys(finalFilters).forEach(key => {
      if (finalFilters[key] === "") {
        delete finalFilters[key];
      }
    });
    
    onApply(finalFilters);
    onClose();
  };

  const priceRange = localFilters.price 
    ? localFilters.price.split("-").map(Number) 
    : [0, 10000];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold">Product Filters</Typography>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {/* Price Range Section */}
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Price Range (ZAR)
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            step={100}
            valueLabelFormat={(value) => `R${value}`}
            sx={{ mt: 2 }}
          />
          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Typography variant="caption">R{priceRange[0]}</Typography>
            <Typography variant="caption">R{priceRange[1]}</Typography>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Condition Section */}
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Condition
          </Typography>
          <Stack direction="row" spacing={2}>
            {conditionOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                clickable
                variant={localFilters.condition === option.value ? "filled" : "outlined"}
                color={option.color}
                onClick={() => handleConditionChange(option.value)}
                sx={{
                  px: 2,
                  py: 1,
                  fontSize: '0.875rem',
                  borderWidth: 2,
                  ...(localFilters.condition === option.value && {
                    fontWeight: 'bold',
                    boxShadow: 1
                  })
                }}
              />
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Distance Section */}
        <Box mb={4}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Distance from you
          </Typography>
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
            {distanceOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                icon={option.value ? <LocationOnIcon /> : null}
                clickable
                variant={distanceType === option.value ? "filled" : "outlined"}
                color={distanceType === option.value ? "primary" : "default"}
                onClick={() => handleDistanceTypeChange(option.value)}
                sx={{
                  mb: 1,
                  ...(distanceType === option.value && {
                    fontWeight: 'bold'
                  })
                }}
              />
            ))}
          </Stack>
          
          {distanceType === "custom" && (
            <TextField
              fullWidth
              type="number"
              label="Custom distance (km)"
              value={customDistance}
              onChange={handleCustomDistanceChange}
              InputProps={{
                endAdornment: <Typography variant="body2">km</Typography>,
              }}
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Date Section */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Date Added
          </Typography>
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
            {dateOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                icon={option.icon}
                clickable
                variant={dateType === option.value ? "filled" : "outlined"}
                color={dateType === option.value ? "primary" : "default"}
                onClick={() => handleDateTypeChange(option.value)}
                sx={{
                  mb: 1,
                  ...(dateType === option.value && {
                    fontWeight: 'bold'
                  })
                }}
              />
            ))}
          </Stack>
          
          {dateType === "custom" && (
            <TextField
              fullWidth
              type="date"
              label="Select Date"
              InputLabelProps={{ shrink: true }}
              value={localFilters.date || ""}
              onChange={handleCustomDateChange}
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          sx={{ px: 3 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleApply} 
          variant="contained" 
          color="primary"
          sx={{ px: 3 }}
        >
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
}