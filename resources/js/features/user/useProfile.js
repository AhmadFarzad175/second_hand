import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../repositories/UserRepository";

export function useProfile(id) {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
  });

  return { isLoading, error, user };
} 