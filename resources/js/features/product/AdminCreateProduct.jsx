import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";
import { useLocation } from "react-router-dom";
import ProductForm from "../../ui/ProductForm";

export default function AdminCreateProduct() {
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
                        navigate("/admin/products");
                    },
                }
            );
        } else {
            createProduct(formData, {
                onSuccess: () => {
                    navigate("/admin/products");
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
            navigateBackPath="/admin/products"
        />
    );
}