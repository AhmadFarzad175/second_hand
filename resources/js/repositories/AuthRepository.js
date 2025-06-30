import AxiosSetup from './AxiosSetup';

// Local Storage Functions (unchanged)
export const setAuth = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// API Functions
export async function loginWithEmail(credentials) {
    try {
        const response = await AxiosSetup.post('/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response)
        return response;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Login failed"
        );
    }
}

export async function loginWithGoogle() {
    try {
        // For OAuth flows, you might need to handle redirects differently
        // This assumes your backend returns JSON response
        const response = await AxiosSetup.get('/auth/google');
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Google login failed"
        );
    }
}

// Optional: Add function to handle Google redirect callback
export async function handleGoogleCallback(code) {
    try {
        const response = await AxiosSetup.get('/auth/google/callback', {
            params: { code }
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Google callback failed"
        );
    }
}