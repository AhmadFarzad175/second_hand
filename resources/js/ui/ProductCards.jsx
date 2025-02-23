import { Box } from "@mui/material";
import ProductCard from "./ProductCard";
import { useProducts } from "./../pages/useProducts";

function ProductCards() {
    const { isLoading, error, products } = useProducts();

    // Show loading state while fetching data
    if (isLoading) {
        return <p>Loading products...</p>;
    }

    // Show error message if there's an issue fetching data
    if (error) {
        return <p>Error: {error.message}</p>;
    }


    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr", // 1 column on extra-small screens
                    sm: "repeat(2, 1fr)", // 2 columns on small screens
                    md: "repeat(3, 1fr)", // 3 columns on medium screens
                    lg: "repeat(4, 1fr)", // 4 columns on large screens
                },
                gap: 4, // Spacing between grid items
            }}
        >
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </Box>
    );
}

export default ProductCards;
