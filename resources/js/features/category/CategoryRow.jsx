import React, { useState } from "react";
import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteCategory } from "./useDeleteCategory";

const CategoryRow = ({ category, handleOpen, isSelected, handleClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { isDeleting, deleteCat } = useDeleteCategory();

    const handleMenuClick = (event) => {
        event.stopPropagation(); // Stop category selection when clicking on the menu button
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.stopPropagation(); // Stop category selection when closing the menu
        setAnchorEl(null);
    };

    const handleDelete = async (event) => {
        event.stopPropagation(); // Prevent category selection when clicking delete
        deleteCat(category.id);
        handleMenuClose(event);
    };

    const handleRowClick = (event) => {
        // Prevent category selection when clicking on the menu or its items
        if (anchorEl && anchorEl.contains(event.target)) {
            return;
        }
        handleClick(event, category.id);
    };

    return (
        <TableRow
            hover
            onClick={handleRowClick} // Use the updated click handler
            role="checkbox"
            aria-checked={isSelected}
            selected={isSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox checked={isSelected} />
            </TableCell>
            <TableCell align="left" sx={{ width: 100, height: 60 }}>
                {category.image.length > 0 ? (
                    <Box
                        component="img"
                        src={category.image}
                        alt="Category"  
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 1,
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "action.disabledBackground",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            No Image
                        </Typography>
                    </Box>
                )}
            </TableCell>
            <TableCell align="left">{category.name}</TableCell>
            <TableCell align="right">
                <IconButton
                    className="menu-button"
                    onClick={handleMenuClick}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem
                        onClick={(event) => {
                            event.stopPropagation();
                            handleOpen(category);
                            handleMenuClose(event);
                        }}
                    >
                        <EditIcon sx={{ mr: 1 }} />
                        Edit
                    </MenuItem>
                        <MenuItem onClick={handleDelete} disabled={isDeleting}>
                        <DeleteIcon sx={{ mr: 1 }} />
                        Delete
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default CategoryRow;
