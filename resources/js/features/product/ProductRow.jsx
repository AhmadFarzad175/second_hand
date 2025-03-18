import React, { useState } from "react";
import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    Menu,
    MenuItem,
    Chip,
    Box,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteProduct } from "./useDeleteProduct";

const ProductRow = ({ row, isSelected, handleClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { isDeleting, deletePro } = useDeleteProduct();

    const handleMenuClick = (event) => {
        event.stopPropagation(); // Stop row selection when clicking on the menu button
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.stopPropagation(); // Stop row selection when closing the menu
        setAnchorEl(null);
    };

    const handleDelete = async (event) => {
        event.stopPropagation(); // Prevent row selection when clicking delete
        deletePro(row.id);
        handleMenuClose(event);
    };

    const handleRowClick = (event) => {
        // Prevent row selection when clicking on the menu or its items
        if (anchorEl && anchorEl.contains(event.target)) {
            return;
        }
        handleClick(event, row.id);
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
            <TableCell align="left" sx={{ width: 80, height: 80 }}>
                {row.images.length > 0 ? (
                    <Box
                        component="img"
                        src={row.images[0].image_path}
                        alt="Product"
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
            <TableCell>{row.name}</TableCell>
            <TableCell align="left">{row.category?.name}</TableCell>
            <TableCell align="left">
                <Box display="flex" flexDirection="column">
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {row.price}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            textDecoration: "line-through",
                        }}
                    >
                        {row.previous_price}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell align="left">
                <Chip
                    label={row.condition}
                    color={row.condition === "New" ? "primary" : "secondary"}
                    size="small"
                    variant="outlined"
                />
            </TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell align="left">{row.favorites_count}</TableCell>
            <TableCell align="center">
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
                            handleMenuClose(event);
                        }}
                    >
                        <VisibilityIcon sx={{ mr: 1 }} />
                        Show
                    </MenuItem>
                    <MenuItem
                        onClick={(event) => {
                            event.stopPropagation();
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

export default ProductRow;
