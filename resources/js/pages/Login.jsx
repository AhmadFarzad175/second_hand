import React from "react";
import { useMutation } from "@tanstack/react-query";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
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
    Google as GoogleIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

// Mock API functions - replace with your actual API calls
const loginWithEmail = async (credentials) => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: "mock-token",
                user: {
                    email: credentials.email,
                    name: "Test User",
                    role: "user", // or 'admin' based on your logic
                },
            });
        }, 1000);
    });
};

const loginWithGoogle = async (googleData) => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: "mock-google-token",
                user: {
                    email: googleData.profileObj.email,
                    name: googleData.profileObj.name,
                    avatar: googleData.profileObj.imageUrl,
                    role: "user", // or determine role based on your logic
                },
            });
        }, 1000);
    });
};

const LoginPage = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    const emailMutation = useMutation(loginWithEmail, {
        onSuccess: (data) => {
            // Handle successful login (e.g., store token, redirect)
            console.log("Email login success:", data);
            // You would typically use your auth context here
            // auth.login(data.user, data.token);
        },
        onError: (error) => {
            console.error("Email login error:", error);
        },
    });

    const googleMutation = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: (data) => {
            // Handle successful Google login
            console.log("Google login success:", data);
            // auth.login(data.user, data.token); // Uncomment when auth context is ready
        },
        onError: (error) => {
            console.error("Google login error:", error);
        },
    });

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
        emailMutation.mutate({ email, password });
    };

    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Google auth response:", decoded);

        const googleData = {
            token: credentialResponse.credential,
            profileObj: {
                email: decoded.email,
                name: decoded.name,
                imageUrl: decoded.picture,
            },
        };

        googleMutation.mutate(googleData);
    };

    const handleGoogleError = () => {
        console.error("Google login failed");
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const isLoading = emailMutation.isLoading || googleMutation.isLoading;

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

                {(emailMutation.isError || googleMutation.isError) && (
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
                        {emailMutation.isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <Box sx={{ textAlign: "center" }}>
                    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            useOneTap
                            shape="rectangular"
                            size="large"
                            text="continue_with"
                            theme="filled_blue"
                            width="100%"
                            locale="en_US"
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
