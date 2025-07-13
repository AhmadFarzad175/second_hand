import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";

const TableHeader = ({ onSelectAllClick, numSelected, rowCount }) => {
        const { t, i18n } = useTranslation();

  const headCells = [
    { id: "images", numeric: false, label: t("Admin.Product.Image") },
    { id: "name", numeric: false, label: t("Admin.Product.Name") || "Product Name" },
    { id: "category", numeric: true, label: t("Admin.Product.Category") || "Category" },
    { id: "price", numeric: true, label: t("Admin.Product.Price") || "Price" },
    { id: "condition", numeric: false, label: t("Admin.Product.Condition") || "Condition" },
    { id: "date", numeric: false, label: t("Admin.Product.Date") || "Date" },
    { id: "favorites_count", numeric: true, label: t("Admin.Product.Favorites") || "Favorites" },
    { id: "actions", numeric: false, label: t("Admin.Product.Actions") || "Actions" },
];


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"left"}
                        sx={{ fontWeight: "bold" }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

TableHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default TableHeader;
