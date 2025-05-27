import React from "react";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    CircularProgress,
    Alert,
    Paper,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useLogin } from "./useLogin";
import { useGoogleLogin } from "./useGoogleLogin"; // Optional: if you handle login after redirect

const LoginPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const { logIn, isChecking, EmailError } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email is required");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
            return;
        }

        if (!password) {
            setPasswordError("Password is required");
            return;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }

        logIn({ email, password });
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://127.0.0.1:8000/auth/google"; // Laravel backend route
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
            <Paper elevation={3} sx={{ width: "100%", p: 4, borderRadius: 2 }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography color="text.secondary">
                        Sign in to access your account
                    </Typography>
                </Box>

                {EmailError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Login failed. Please check your credentials and try again.
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                        autoComplete="email"
                        autoFocus
                        disabled={isChecking}
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                        autoComplete="current-password"
                        disabled={isChecking}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 2, py: 1.5 }}
                        disabled={isChecking}
                    >
                        {isChecking ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <Box sx={{ textAlign: "center" }}>
                    <Button
                        onClick={handleGoogleLogin}
                        variant="outlined"
                        fullWidth
                        size="large"
                    >
                        Continue with Google
                    </Button>
                </Box>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{" "}
                        <Button variant="text" size="small" sx={{ textTransform: "none" }}>
                            Sign up
                        </Button>
                    </Typography>
                    <Button
                        variant="text"
                        size="small"
                        sx={{ textTransform: "none", mt: 1 }}
                    >
                        Forgot password?
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
