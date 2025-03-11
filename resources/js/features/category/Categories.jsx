import React, { useState } from "react";
import {
    Box,
    Breadcrumbs,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    Paper,
    LinearProgress,
    Alert,
    Button,
    Typography,
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    Toolbar,
    IconButton,
    Tooltip,
    alpha,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link } from "react-router-dom";
import CategoryRow from "./CategoryRow";
import { useCategories } from "./useCategories";
import CategoryModal from "./CategoryModal";

const Categories = () => {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { isLoading, error, categories = [] } = useCategories();

    const [openModal, setOpenModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState({});

    const handleOpenModal = (category = {}) => {
        setEditingCategory(category);
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(categories.map((category) => category.id));
        } else {
            setSelected([]);
        }
    };

    const handleClick = (event, id) => {
        if (event.target.closest(".menu-button")) {
            return;
        }
        setSelected((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedCategories = React.useMemo(() => {
        return categories.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [categories, page, rowsPerPage]);

    error && <Alert severity="error">{error.message}</Alert>;

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        to="/admin/dashboard"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Typography
                            sx={{ "&:hover": { textDecoration: "underline" } }}
                        >
                            Home
                        </Typography>
                    </Link>
                    <Typography color="text.primary">Categories</Typography>
                </Breadcrumbs>

                {/* Filter button */}
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <CategoryModal open={openModal} handleClose={handleCloseModal} category={editingCategory}/>
            {/* <CategoryModal open={openModal} handleClose={handleCloseModal} handleCreate={handleCreateCategory} /> */}

            <Paper
                sx={{ width: "100%", mb: 2, elevation: 0, boxShadow: "none" }}
            >
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(selected.length > 0 && {
                            bgcolor: (theme) =>
                                alpha(
                                    theme.palette.primary.main,
                                    theme.palette.action.activatedOpacity
                                ),
                        }),
                    }}
                >
                    {selected.length > 0 ? (
                        <Typography
                            sx={{ flex: "1 1 100%" }}
                            color="inherit"
                            variant="subtitle1"
                        >
                            {selected.length} selected
                        </Typography>
                    ) : (
                        <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                            Products
                        </Typography>
                    )}
                    {selected.length > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal({})}
                            sx={{ whiteSpace: "nowrap", p: "10px 20px" }}
                        >
                            Add Category
                        </Button>
                    )}
                </Toolbar>
                {isLoading && <LinearProgress />}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={
                                            selected.length > 0 &&
                                            selected.length < categories.length
                                        }
                                        checked={
                                            categories.length > 0 &&
                                            selected.length ===
                                                categories.length
                                        }
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                                <TableCell
                                    align={"center"}
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Image
                                </TableCell>

                                <TableCell
                                    align={"left"}
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    align={"right"}
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedCategories.map((category) => (
                                <CategoryRow
                                    key={category.id}
                                    category={category}
                                    handleOpen={handleOpenModal}
                                    isSelected={selected.includes(category.id)}
                                    handleClick={handleClick}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    component="div"
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Categories;
