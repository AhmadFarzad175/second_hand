import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { loginWithGoogle } from "../repositories/AuthRepository";
import { useNavigate } from "react-router-dom";

export function useGoogleLogin() {
    const navigate = useNavigate();
    
    const { mutate: googleLogin, isLoading: isCheckingGoogle, error:GoogleError } = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: (data) => {
            localStorage.setItem('authToken', data.token);
            toast.success("You logged in successfully");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    
      return { googleLogin, isCheckingGoogle, GoogleError };
}