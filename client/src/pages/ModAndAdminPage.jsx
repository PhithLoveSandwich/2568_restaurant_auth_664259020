import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const ModAndAdminPage = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (
        user.authorities?.includes("ROLE_ADMIN") ||
        user.authorities?.includes("ROLE_MODERATOR")
    ) {
        return children;
    }

    return <Navigate to="/notallowed" replace />;
};

export default ModAndAdminPage;
