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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUser } from "./useDeleteUser";

const UserRow = ({ row, isSelected, handleClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { isDeleting, deleteUse } = useDeleteUser();

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
        deleteUse(row.id);
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
                {row.image?.length > 0 ? (
                    <Box
                        component="img"
                        src={row.image}
                        alt="User Image"
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
            <TableCell align="left">{row.phone}</TableCell>
            <TableCell align="left">{row.province}</TableCell>
            <TableCell align="left">{row.productAmount}</TableCell>
            <TableCell>{row.rating}</TableCell>
            <TableCell align="left">{row.role}</TableCell>
            <TableCell align="left">{row.isActive}</TableCell>
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

export default UserRow;
