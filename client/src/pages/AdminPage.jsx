import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const AdminPage = ({ children }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    if (!user.authorities?.includes("ROLE_ADMIN")) {
        return <Navigate to="/notallowed" replace />;
    }

    return children;
};

export default AdminPage;
