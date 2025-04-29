import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateUser } from "../../repositories/UserRepository";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ formData, id }) => {
                return createUpdateUser(formData, id);
            },
    onSuccess: () => {
      toast.success("user updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}