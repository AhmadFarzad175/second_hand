// useUpdateUserStatus.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../../repositories/UserRepository";

export function ToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }) => updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Refetch users after status change
    },
    onError: (error) => {
      console.error("Error updating user status:", error);
    },
  });
}