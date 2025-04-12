import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../repositories/UserRepository";

export function useUsers() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return { isLoading, error, users };
}