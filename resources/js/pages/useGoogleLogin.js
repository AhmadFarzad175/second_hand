import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { loginWithGoogle } from "../repositories/AuthRepository";
import { useNavigate } from "react-router-dom";

export function useGoogleLogin() {
    const navigate = useNavigate();
    
    const { mutate: googleLogin, isLoading: isCheckingGoogle } = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: () => {
            // Polling to check when auth completes
            const checkAuth = setInterval(() => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    clearInterval(checkAuth);
                    toast.success("Logged in successfully");
                    navigate("/");
                }
            }, 500);
        },
        onError: () => {
            toast.error("Google login failed");
        },
    });
    
      return { googleLogin, isCheckingGoogle };
}