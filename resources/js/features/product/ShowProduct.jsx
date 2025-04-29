// pages/ShowProduct.jsx
import { Button, Stack } from "@mui/material";
import ProductDetails from "../../ui/ProductDetails";

function ShowProduct() {

  return (
    <ProductDetails
      showBuyNowButton={false}
      showFavoriteIcon={false}
      customActions={
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="primary">Edit Product</Button>
          <Button variant="outlined" color="error">Delete Product</Button>
        </Stack>
      }
    />
  );
}

export default ShowProduct;
