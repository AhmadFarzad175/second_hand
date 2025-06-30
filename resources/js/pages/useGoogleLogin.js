import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { loginWithGoogle, setAuth } from "../repositories/AuthRepository";
import { useNavigate } from "react-router-dom";

export function useGoogleLogin() {
    const navigate = useNavigate();

    const { mutate: googleLogin, isLoading: isCheckingGoogle } = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: (data) => {
            setAuth(data); // Save token & user
            toast.success("Logged in successfully");
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Google login failed");
        },
    });

    return { googleLogin, isCheckingGoogle };
}
