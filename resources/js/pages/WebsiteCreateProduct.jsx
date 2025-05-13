import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCreateProduct } from "../features/product/useCreateProduct";
import { useUpdateProduct } from "../features/product/useUpdateProduct";
import ProductForm from "../ui/ProductForm";

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
        <ProductForm
            onSubmit={handleSubmit}
            isWorking={isCreating || isUpdating}
            isEditSession={isEditSession}
            editValues={editValues}
            navigateBackPath="/products"
        />
    );
}