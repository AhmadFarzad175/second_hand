import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import { useState, useEffect } from "react";
import { getCategories } from "../repositories/CategoryRepository";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterDialog from "./FilterDialog";
import { useTranslation } from "react-i18next";

export default function Carousel() {
    const [value, setValue] = useState(0); // Initialize with 0 instead of null
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const { t } = useTranslation();
    
    // Get category from URL if exists
    const urlCategory = searchParams.get("category");

    const currentFilters = {
        price: searchParams.get("price") || "",
        distance: searchParams.get("distance") || "",
        condition: searchParams.get("condition") || "",
        date: searchParams.get("date") || "",
    };

    // Fetch categories
    const {
        data: categories = [], // Default to empty array
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    // Sync tab selection with URL category
    useEffect(() => {
        if (categories.length > 0 && urlCategory) {
            const categoryIndex = categories.findIndex(cat => cat.id === urlCategory);
            if (categoryIndex !== -1) {
                setValue(categoryIndex);
            }
        }
    }, [categories, urlCategory]);

    const handleApplyFilters = (newFilters) => {
        const params = new URLSearchParams(searchParams);

        // Update all filters
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });

        navigate(`?${params.toString()}`);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const selectedCategory = categories[newValue];

        if (selectedCategory?.id) {
            const params = new URLSearchParams();
            params.set("category", selectedCategory.id);

            // Preserve existing filters
            Object.entries(currentFilters).forEach(([key, value]) => {
                if (value) params.set(key, value);
            });

            navigate(`?${params.toString()}`);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (categories.length === 0) return <div>No categories available</div>;

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
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                <Tabs
                    value={Math.min(value, categories.length - 1)} // Ensure value is within bounds
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
                            key={category.id} // Better to use category.id instead of index
                            sx={{
                                backgroundColor: "transparent",
                                background: "transparent",
                            }}
                            icon={
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "cover",
                                        borderRadius: 5,
                                        backgroundColor: "transparent",
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
                {t('home.Filter')}
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