import { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    styled,
} from "@mui/material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FormWrapper = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.34)",
    padding: theme.spacing(4),
    borderRadius: 15,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    width: "30rem",
    backdropFilter: "blur(4px)",
}));

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const validateEmail = (email) => {
        if (!email) return "Required";
        if (!/.+@.+\..+/.test(email)) return "Invalid email";
        return "";
    };

    const forgotPasswordMutation = useMutation({
        mutationFn: (email) => axios.post("api/forgot-password", { email }),
        onSuccess: (data) => {
            toast.success('Link has sent to your email!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Error occurred");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }
        setEmailError("");

        forgotPasswordMutation.mutate(email);
    };

    return (
        <FormWrapper>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={forgotPasswordMutation.isLoading}
                >
                    {forgotPasswordMutation.isLoading
                        ? "Sending..."
                        : "Send Reset Link"}
                </Button>

                {/* {message && (
                    <Typography
                        color={
                            forgotPasswordMutation.isError ? "error" : "primary"
                        }
                    >
                        {message}
                    </Typography>
                )} */}
            </Box>
        </FormWrapper>
    );
};

export default ForgetPassword;
