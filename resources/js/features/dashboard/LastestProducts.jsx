import {
    Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography
  } from "@mui/material";
  
  const LatestProducts = ({ products }) => (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Latest Products</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>User</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.user}</TableCell>
              <TableCell>{product.state}</TableCell>
              <TableCell>${product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
  