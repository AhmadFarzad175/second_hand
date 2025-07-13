import { useMemo, useState } from "react";
import {
    Box,
    Breadcrumbs,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    Paper,
    Tooltip,
    IconButton,
    LinearProgress,
    Alert,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useUsers } from "./useUsers";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar"; // Correct path
import UserRow from "./UserRow";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";


const Users = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { isLoading, error, users=[] } = useUsers();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(users.map((user) => user.id));
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

    const userRows = useMemo(() => {
        return users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [users, page, rowsPerPage]);

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
                           {t("Admin.Home")}
                        </Typography>
                    </Link>
                    <Typography color="text.primary">{t("Admin.Users")}</Typography>
                </Breadcrumbs>
                <Tooltip title={t("Common.FilterList")}>
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Paper sx={{ width: "100%", mb: 2, elevation: 0, boxShadow: "none" }}>
                <TableToolbar numSelected={selected.length} />
                {isLoading && <LinearProgress />}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }}>
                        <TableHeader
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={users.length}
                        />
                        <TableBody>
                            {userRows.map((user) => (
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    isSelected={selected.includes(user.id)}
                                    handleClick={handleClick}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 30]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Users;
