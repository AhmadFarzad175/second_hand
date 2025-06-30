import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";

const TableHeader = ({ onSelectAllClick, numSelected, rowCount }) => {
    const headCells = [
        { id: "images", numeric: false, label: "Image" },
        { id: "name", numeric: false, label: "Product Name" },
        { id: "category", numeric: true, label: "Category" },
        { id: "price", numeric: true, label: "Price" },
        { id: "condition", numeric: false, label: "Condition" },
        { id: "date", numeric: false, label: "Date" },
        { id: "favorites_count", numeric: true, label: "Favorites" },
        { id: "actions", numeric: false, label: "Actions" },
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