import React, { useState } from "react";
import {
    TableRow,
    TableCell,
    Checkbox,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Switch,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteUser } from "./useDeleteUser";
import { useUpdateUserStatus } from "./toggleSwitch";
import { useNavigate } from "react-router-dom";

const UserRow = ({ user, isSelected, handleClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { isDeleting, deleteUse } = useDeleteUser();
    const { mutate: updateStatus } = useUpdateUserStatus();
    const navigate = useNavigate();

    const handleStatusChange = (event, id) => {
        event.stopPropagation();
        updateStatus({
            id,
            isActive: event.target.checked,
        });
    };

    const handleMenuClick = (event) => {
        event.stopPropagation(); // Stop user selection when clicking on the menu button
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.stopPropagation(); // Stop user selection when closing the menu
        setAnchorEl(null);
    };

    const handleDelete = async (event) => {
        event.stopPropagation(); // Prevent user selection when clicking delete
        deleteUse(user.id);
        handleMenuClose(event);
    };

    const handleRowClick = (event) => {
        // Prevent user selection when clicking on the menu, switch, or its items
        if (
            (anchorEl && anchorEl.contains(event.target)) ||
            event.target.closest('.MuiSwitch-root') // Add this check
        ) {
            return;
        }
        handleClick(event, user.id);
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
                {user.image?.length > 0 ? (
                    <Box
                        component="img"
                        src={user.image}
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
            <TableCell>{user.name}</TableCell>
            <TableCell align="left">{user.phone}</TableCell>
            <TableCell align="left">{user.location}</TableCell>
            <TableCell align="left">{user.productAmount}</TableCell>
            <TableCell>{user.rating}</TableCell>
            <TableCell align="left">{user.role}</TableCell>
            <TableCell align="left">
                <Switch
                    checked={user.is_active}
                    onChange={(event) => {
                        event.stopPropagation();
                        handleStatusChange(event, user.id);
                    }}
                />
            </TableCell>{" "}
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
                            navigate(`/admin/edit-user/${user.id}`, {
                                state: { user }  // Pass the entire user object
                            });                        }}
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
