import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "./AuthRepository";

const ProtectedRoute = ({ aim, children }) => {
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [token, navigate]);

    return token ? children : null;
};

export default ProtectedRoute;