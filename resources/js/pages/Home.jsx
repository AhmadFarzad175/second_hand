import Carousel from "../ui/Carousel";
import ProductCards from "../ui/ProductCards";
import { useSearchParams } from "react-router-dom";
import { useWebsiteProducts } from "./useWebsiteProducts";

function Home() {
    const [searchParams] = useSearchParams();
    const filters = Object.fromEntries(searchParams.entries());

    const { isLoading, error, products } = useWebsiteProducts(filters);

    return (
        <>
            <Carousel />
            <ProductCards
                isLoading={isLoading}
                error={error}
                products={products}
            />
        </>
    );
}

export default Home;
