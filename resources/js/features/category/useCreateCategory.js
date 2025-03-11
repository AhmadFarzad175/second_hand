import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateCategory } from "../../repositories/CategoryRepository";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate: createCategory, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCategory,
    onSuccess: () => {
      toast.success("New Category successfully created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCategory, isCreating };
}