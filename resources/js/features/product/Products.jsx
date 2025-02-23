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
} from "@mui/material";
import { Link } from "react-router-dom";
import { useProducts } from "../../pages/useProducts";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar"; // Correct path
import ProductRow from "./ProductRow";

const Products = () => {
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { isLoading, error, products = [] } = useProducts();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(products.map((product) => product.id));
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

    const paginatedRows = React.useMemo(() => {
        return products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [products, page, rowsPerPage]);

    if (error) {
        return <Alert severity="error">{error.message}</Alert>;
    }

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
                    <Typography color="text.primary">Products</Typography>
                </Breadcrumbs>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/admin/create-product"
                >
                    Add Product
                </Button>
            </Box>

            <Paper sx={{ width: "100%", mb: 2, elevation: 0, boxShadow: "none" }}>
                <TableToolbar numSelected={selected.length} />
                {isLoading && <LinearProgress />}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }}>
                        <TableHeader
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={products.length}
                        />
                        <TableBody>
                            {paginatedRows.map((row) => (
                                <ProductRow
                                    key={row.id}
                                    row={row}
                                    isSelected={selected.includes(row.id)}
                                    handleClick={handleClick}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Products;