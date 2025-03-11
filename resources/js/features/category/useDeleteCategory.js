import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory } from "../../repositories/CategoryRepository";

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCat } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast.success("Category successfully deleted");

            // Invalidate the products query to refresh the list
            queryClient.invalidateQueries(["products"]);
        },

        onError: (err) => toast.error(err.message),

    });

    return { isDeleting, deleteCat };
}
