import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";

const TableHeader = ({ onSelectAllClick, numSelected, rowCount }) => {
    const { t } = useTranslation();
const headCells = [
  { id: 1, numeric: false, label: t("Admin.Image") },
  { id: 2, numeric: false, label: t("Admin.Name") },
  { id: 3, numeric: true, label: t("Users.Phone") },
  { id: 4, numeric: true, label: t("Users.Products") },
  { id: 5, numeric: true, label: t("Users.Rating") },
  { id: 6, numeric: false, label: t("Users.Role") },
  { id: 7, numeric: false, label: t("Users.Active") },
  { id: 8, numeric: false, label: t("Users.Actions") },
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
