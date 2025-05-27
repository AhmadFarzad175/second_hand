import React from "react";
// import { useMutation } from "@tanstack/react-query";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
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
import {
    // Google as GoogleIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { useLogin } from "./useLogin";
// import { toast } from "react-hot-toast";
// import { useGoogleLogin } from "./useGoogleLogin";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const { logIn, isChecking, EmailError } = useLogin();

    const handleSuccess = (credentialResponse) => {
        const idToken = credentialResponse.credential;

        // Send ID token to Laravel backend
        fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Login success", data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError("");
        setPasswordError("");

        // Validate email
        if (!email) {
            setEmailError("Email is required");
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
            return;
        }

        // Validate password
        if (!password) {
            setPasswordError("Password is required");
            return;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }

        // Submit form
        logIn({ email, password });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const isLoading = isChecking ;

    return (
        <Container
            maxWidth="sm"
            sx={{ height: "100vh", display: "flex", alignItems: "center" }}
        >
            <Paper elevation={3} sx={{ width: "100%", p: 4, borderRadius: 2 }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ fontWeight: "bold", mb: 1 }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Sign in to access your account
                    </Typography>
                </Box>

                {EmailError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Login failed. Please check your credentials and try
                        again.
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
                        disabled={isLoading}
                        autoComplete="email"
                        autoFocus
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
                        disabled={isLoading}
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
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
                        disabled={isLoading}
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
                    <GoogleOAuthProvider clientId="3917483292-lt12ni9l0mt3anriqkqjc8klls4pa52m.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => console.log("Login Failed")}
                        />
                    </GoogleOAuthProvider>
                </Box>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{" "}
                        <Button
                            variant="text"
                            size="small"
                            sx={{ textTransform: "none" }}
                            disabled={isLoading}
                        >
                            Sign up
                        </Button>
                    </Typography>
                    <Button
                        variant="text"
                        size="small"
                        sx={{ textTransform: "none", mt: 1 }}
                        disabled={isLoading}
                    >
                        Forgot password?
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
