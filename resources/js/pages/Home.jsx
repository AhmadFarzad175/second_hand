import Carousel from "../ui/Carousel";
import ProductCards from "../ui/ProductCards";
import { useSearchParams } from "react-router-dom";
import { useWebsiteProducts } from "./useWebsiteProducts";

function Home() {
  const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
  const { isLoading, error, products } = useWebsiteProducts(searchTerm);

  return (
    <>
    <Carousel />
    <ProductCards isLoading={isLoading} error={error} products={products} />
    </>
  )
};

export default Home;
