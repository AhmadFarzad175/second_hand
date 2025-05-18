import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import { getCategories } from "../repositories/CategoryRepository";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CleanScrollableTabs() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();


    const handleChange = (event, newValue) => {
        setValue(newValue);
        const selectedCategory = categories[newValue];
        console.log('search param ')
        console.log(searchParams)
        if (selectedCategory?.id) {
          // 1. Create a copy of current URL params
          const params = new URLSearchParams(searchParams);
          
          // 2. Update the category param
          params.set('category', selectedCategory.id);
          
          // 3. Update the URL
          navigate(`?${params.toString()}`);
        }
      };

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
