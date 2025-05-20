import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCreateProduct } from "../features/product/useCreateProduct";
import { useUpdateProduct } from "../features/product/useUpdateProduct";
import ProductForm from "../ui/ProductForm";
import WebsiteHeading from "../ui/WebsiteHeading";

export default function WebsiteCreateProduct() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const isEditSession = Boolean(state?.product?.id);
    const editValues = state?.product || {};

    const { isCreating, createProduct } = useCreateProduct();
    const { isUpdating, updateProduct } = useUpdateProduct();

    const handleSubmit = (formData) => {
        if (isEditSession) {
            updateProduct(
                { formData, id: editValues.id },
                {
                    onSuccess: () => {
                        navigate("/");
                    },
                }
            );
        } else {
            createProduct(formData, {
                onSuccess: () => {
                    navigate("/");
                },
            });
        }
    };

    return (
        <>
            <WebsiteHeading
                title="Create New Product"
                subtitle="Fill in all required information to add a new product"
                // Optional props (defaults shown):
                // align="center"
                //   gradient={true}
                // divider={true}
                // titleVariant="h2"
                // subtitleVariant="subtitle1"
                sx={{ py: 4 }} // Custom spacing
            />

            <ProductForm
                onSubmit={handleSubmit}
                isWorking={isCreating || isUpdating}
                isEditSession={isEditSession}
                editValues={editValues}
                navigateBackPath="/products"
            />
        </>
    );
}
