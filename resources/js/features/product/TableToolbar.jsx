import {
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    alpha,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const TableToolbar = ({ numSelected }) => {
     const { t } = useTranslation();
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                >
                     {t("Admin.Selected", { count: numSelected })}
                </Typography>
            ) : (
                <Typography sx={{ flex: "1 1 100%" }} variant="h6">
                  {t("Admin.Product.ProductInformation", "Products")}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title={t("Admin.Delete", "Delete")}>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/admin/create-product"
                    sx={{ whiteSpace: 'nowrap', p: "10px 20px" }}

                >
                  {t("Admin.Product.AddProduct", "Add Product")}
                </Button>
            )}
        </Toolbar>
    );
};

export default TableToolbar;
