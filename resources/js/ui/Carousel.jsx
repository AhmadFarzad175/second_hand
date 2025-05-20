import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import { getCategories } from "../repositories/CategoryRepository";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterDialog from "./FilterDialog";

export default function Carousel() {
    const [value, setValue] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);

    const currentFilters = {
        price: searchParams.get("price") || "",
        distance: searchParams.get("distance") || "",
        condition: searchParams.get("condition") || "",
        date: searchParams.get("date") || "",
    };

    const handleApplyFilters = (newFilters) => {
        const params = new URLSearchParams(searchParams);

        // Update all filters
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });

        navigate(`?${params.toString()}`);
    };

    // when user click on the category
    const handleChange = (event, newValue) => {
        setValue(newValue);
        const selectedCategory = categories[newValue];
    
        if (selectedCategory?.id) {
            // Create a NEW searchParams instance with only the category
            const params = new URLSearchParams();
            params.set("category", selectedCategory.id);
    
            navigate(`?${params.toString()}`);
        }
    };
    

    //fetching categories
    const {
        data: categories,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                py: 3,
                mb: 5,
                borderBottom: 1,
                borderColor: "divider",
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    overflowX: "auto",
                    scrollbarWidth: "none", // Hide scrollbar for Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Chrome/Safari
                }}
            >
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
                                    src={category.image}
                                    alt={category.name}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        // borderRadius: "50%",
                                        objectFit: "cover",
                                        borderRadius: 5,
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
                onClick={() => setFilterOpen(true)}
                sx={{ ml: 2, minWidth: 90, borderRadius: 1 }}
            >
                Filter
            </Button>

            <FilterDialog
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                filters={currentFilters}
                setFilters={handleApplyFilters}
                onApply={handleApplyFilters}
            />
        </Box>
    );
}
