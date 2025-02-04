import { Box } from "@mui/material";
import ProductCard from "./ProductCard";


const productData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    location: "City Center",
    price: `$${(Math.random() * 100).toFixed(2)}`,
    posted: "2 hours ago",
    distance: `${Math.floor(Math.random() * 15)} kms away`,
    image: `/images/img-${index % 10}.jpg`, // Placeholder image URL
}));

function ProductCards() {
    // const { isLoading, cabins } = useCabins();

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
            {productData.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </Box>
    );
}

export default ProductCards;
