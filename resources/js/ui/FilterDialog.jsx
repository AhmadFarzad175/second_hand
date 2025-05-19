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
  
  const dateOptions = [
    { label: "Today", value: "today", icon: <TodayIcon /> },
    { label: "Yesterday", value: "yesterday", icon: <EventIcon /> },
    { label: "This Week", value: "week", icon: <EventAvailableIcon /> },
    { label: "This Month", value: "month", icon: <CalendarMonthIcon /> },
    { label: "Custom Date", value: "custom" },
  ];
  
  // Rest of your component remains the same...
  
  const conditionOptions = [
    { label: "New", value: "new", color: "success" },
    { label: "Used", value: "used", color: "warning" },
  ];
  
  export default function FilterDialog({ open, onClose, filters, onApply }) {
    const [localFilters, setLocalFilters] = useState({
      ...filters,
      dateType: filters.date ? "custom" : "",
    });
  
    const handlePriceChange = (event, newValue) => {
      setLocalFilters(prev => ({ ...prev, price: `${newValue[0]}-${newValue[1]}` }));
    };
  
    const handleDateTypeChange = (type) => {
      if (type === "custom") {
        setLocalFilters(prev => ({ ...prev, dateType: type }));
      } else {
        setLocalFilters(prev => ({ ...prev, dateType: type, date: "" }));
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
  
    const handleApply = () => {
      const finalFilters = { ...localFilters };
      
      // Convert date type to actual date if needed
      if (finalFilters.dateType && finalFilters.dateType !== "custom") {
        const today = new Date();
        switch (finalFilters.dateType) {
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
                  variant={localFilters.dateType === option.value ? "filled" : "outlined"}
                  color={localFilters.dateType === option.value ? "primary" : "default"}
                  onClick={() => handleDateTypeChange(option.value)}
                  sx={{
                    mb: 1,
                    ...(localFilters.dateType === option.value && {
                      fontWeight: 'bold'
                    })
                  }}
                />
              ))}
            </Stack>
            
            {localFilters.dateType === "custom" && (
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