import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { loginWithEmail } from "../repositories/AuthRepository";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
    
    const { mutate: logIn, isLoading: isChecking, error:EmailError } = useMutation({
        // mutationFn: function($credentials){
        //     loginWithEmail($credentials)
        // },
        mutationFn: loginWithEmail,
        onSuccess: (data) => {
            toast.success("You logged in successfully");
            navigate("/");
            // Consider adding redirect here or in the component
        },
        onError: (err) => {
            toast.error(err.message);
            // You could return more specific error info here
        },
    });
    
      return { logIn, isChecking, EmailError };
}