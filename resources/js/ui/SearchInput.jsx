import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.05)",
        borderRadius: 2,
        "& .MuiOutlinedInput-root": {
          py: 1.5,
          px: 2,
        },
      }}
    />
  );
};

export default SearchInput;



