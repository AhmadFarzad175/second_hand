import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const SearchInput = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleClear = () => {
        setSearchValue("");
        if (onSearch) onSearch(""); // Clear search
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && onSearch) {
            onSearch(searchValue); // Trigger search when Enter is pressed
        }
    };

    return (
        <TextField
            variant="standard"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                ),
                endAdornment: searchValue && (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClear}
                            size="small"
                            sx={{ color: "text.secondary" }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                ),
                disableUnderline: false,
                sx: {
                    "&:before": {
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    },
                    "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "2px solid rgba(0, 0, 0, 0.6)",
                    },
                    "&:after": {
                        borderBottom: "2px solid rgba(0, 0, 0, 0.6)",
                    },
                },
            }}
            sx={{
                "& .MuiInputBase-input": {
                    py: 1,
                    fontSize: "0.95rem",
                    "&::placeholder": {
                        opacity: 0.8,
                    },
                },
            }}
        />
    );
};

export default SearchInput;
