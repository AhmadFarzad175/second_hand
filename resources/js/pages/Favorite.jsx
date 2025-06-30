import ProductCards from "../ui/ProductCards";
import { useSearchParams } from "react-router-dom";
import { useFavorite } from "./useFavorite";
import { Typography, Box, Divider } from "@mui/material";
import { styled } from "@mui/system";
import WebsiteHeading from "../ui/WebsiteHeading";
import { useTranslation } from "react-i18next";

// Styled component for gradient text
const GradientText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
}));

function Favorite() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("search") || "";
    const { isLoading, error, favorites } = useFavorite(searchTerm);
    const { t } = useTranslation();

    return (
        <Box sx={{ maxWidth: "lg", mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>
            <WebsiteHeading
                title={t("favorite.h1")}
                subtitle={t("favorite.h3")}
                // Optional props (defaults shown):
                // align="center"
                // gradient={true}
                // divider={true}
                // titleVariant="h2"
                // subtitleVariant="subtitle1"
                sx={{ py: 4 }} // Custom spacing
            />

            <ProductCards
                isLoading={isLoading}
                error={error}
                products={favorites}
            />
        </Box>
    );
}

export default Favorite;
