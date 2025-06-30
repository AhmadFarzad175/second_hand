import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { loginWithEmail, setAuth } from "../repositories/AuthRepository";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();

    const {
        mutate: logIn,
        isLoading: isChecking,
        error: EmailError,
    } = useMutation({
        mutationFn: loginWithEmail,
        onSuccess: (data) => {
            console.log('data ', data)
            setAuth(data.data); // Save token & user            
            toast.success("You logged in successfully");
            navigate("/");
        
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { logIn, isChecking, EmailError };
}
