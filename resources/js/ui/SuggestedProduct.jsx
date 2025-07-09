function SuggestedProduct(){
    return(
            {user.products && user.products.length > 0 && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom>
                        {showTopProducts ? "All Products" : "Products"}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        {user.products.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    flex: {
                                        xs: "0 0 100%",
                                        sm: "0 0 48%",
                                        lg: "0 0 31%",
                                        xl: "0 0 23%",
                                    },
                                    boxSizing: "border-box",
                                    p: 1,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 180,
                                        backgroundImage: product.image
                                            ? `url(${product.image})`
                                            : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundColor:
                                            theme.palette.grey[400],
                                        mb: 1,
                                        borderRadius: 1,
                                    }}
                                />
                                <Typography variant="body2" noWrap>
                                    {product.name}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        color="primary"
                                    >
                                        {`${product.price - product.discount} ${
                                            product.currency
                                        }`}
                                    </Typography>
                                    {product.rating && (
                                        <Rating
                                            value={product.rating}
                                            precision={0.1}
                                            readOnly
                                            size="small"
                                        />
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </>
            )})
}

export default SuggestedProduct
