import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateCategory } from "../../repositories/CategoryRepository";

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    const { mutate: updateCategory, isLoading: isUpdating } = useMutation({
        mutationFn: ({ formData, id }) => {
          console.log(formData)
            return createUpdateCategory(formData, id);
        },
        onSuccess: () => {
            toast.success("Category successfully updated");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateCategory };
}
