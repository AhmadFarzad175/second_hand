import  { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const ProductRow = ({ product, isSelected, handleClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { isDeleting, deletePro } = useDeleteProduct();

    const handleMenuClick = (event) => {
        event.stopPropagation(); // Stop product selection when clicking on the menu button
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.stopPropagation(); // Stop product selection when closing the menu
        setAnchorEl(null);
    };

    const handleDelete = async (event) => {
        event.stopPropagation(); // Prevent product selection when clicking delete
        deletePro(product.id);
        handleMenuClose(event);
    };

    const handleRowClick = (event) => {
        // Prevent product selection when clicking on the menu or its items
        if (anchorEl && anchorEl.contains(event.target)) {
            return;
        }
        handleClick(event, product.id);
    };

    return (
        <TableRow
            hover
            onClick={handleRowClick} // Use the updated click handler
            role="checkbox"
            aria-checked={isSelected}
            selected={isSelected}
            sx={{ cursor: "pointer" }} // 👈 Add this line
        >
            <TableCell padding="checkbox">
                <Checkbox checked={isSelected} />
            </TableCell>
            <TableCell align="left" sx={{ width: 80, height: 80 }}>
                {product.image?.length > 0 ? (
                    <Box
                        component="img"
                        src={product.image}
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
            <TableCell align="left">
                <Box display="flex" flexDirection="column">
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {product.name}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize:"14px"
                        }}
                    >
                        {product.user?.name}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell align="left">{product.category?.name}</TableCell>
            <TableCell align="left">
                <Box display="flex" flexDirection="column">
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {product.net_price - product.discount + ' ' + product.currency}
                    </Typography>
                    {Number(product.discount) > 0 && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                textDecoration: "line-through",
                            }}
                        >
                            {product.net_price + ' ' + product.currency}
                        </Typography>
                    )}
                </Box>
            </TableCell>
            <TableCell align="left">
                <Chip
                    label={product.condition === 0 ? "New" : "Used"}
                    color={product.condition === 0 ? "primary" : "secondary"}
                    size="small"
                    variant="outlined"
                />
            </TableCell>
            <TableCell>{product.date}</TableCell>
            <TableCell align="left">{product.favorites_count}</TableCell>
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
                            navigate(`/admin/product/${product.id}`);
                        }}
                    >
                        <VisibilityIcon sx={{ mr: 1 }} />
                        Show
                    </MenuItem>
                    <MenuItem
                        onClick={(event) => {
                            event.stopPropagation();
                            handleMenuClose(event);
                            navigate(`/admin/edit-product/${product.id}`, {
                                state: { product }, // Pass the entire user object
                            });
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
