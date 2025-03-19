import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser } from "../../repositories/UserRepository";

export function useDeleteUser() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteUse } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("User successfully deleted");

            // Invalidate the users query to refresh the list
            queryClient.invalidateQueries(["users"]);
        },

        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteUse };
}
