import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "./AuthRepository";
import { useEffect } from "react";

const RoleProtectedRoute = ({ role, children }) => {
    const navigate = useNavigate();
    const token = getToken();
    const user = getUser();

    useEffect(() => {
        if (!token || !user) {
            navigate("/");
            return;
        }

        const hasAccess = user.role===role;
        if (!hasAccess) {
            navigate("/");
        }
    }, [token, user, role, navigate]);

    // Only render children if all checks pass
    if (token && user) {
        const hasAccess = user.role===role;
        if (hasAccess) {
            return children;
        }
    }

    // Return null or loading spinner while redirecting
    return null;
};

export default RoleProtectedRoute;
