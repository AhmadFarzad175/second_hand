import React from "react";
import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";

const TableHeader = ({ onSelectAllClick, numSelected, rowCount }) => {
    const headCells = [
        { id: 1, numeric: false, label: "Image" },
        { id: 2, numeric: false, label: "User Name" },
        { id: 3, numeric: true, label: "Phone" },
        { id: 4, numeric: true, label: "Products" },
        { id: 5, numeric: true, label: "Rating" },
        { id: 6, numeric: false, label: "Role" },
        { id: 7, numeric: false, label: "Active" },
        { id: 8, numeric: false, label: "Actions" },
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