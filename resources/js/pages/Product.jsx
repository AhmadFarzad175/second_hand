// pages/Product.jsx

import ProductDetails from "../ui/ProductDetails";

function Product() {
    
      const product = {
        name: "Admin View Product",
        description: "Admin preview of the product details.",
        net_price: 249.99,
        location: "Los Angeles, USA",
        distance: "12 km away",
        attributes: {
          color: "Black",
          brand: "Nike",
          warranty: "2 years"
        },
        images: [
            "/images/img-1.jpg",
            "/images/img-2.jpg", 
            "/images/img-3.jpg"
          ]
      };
  return (
    <ProductDetails dashboard={false} />

  );
}

export default Product;
