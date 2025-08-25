import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Form from "../pages/Form";
import Delete from "../pages/Delete";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import NotAllowed from "../pages/NotAllowed";
import ModAndAdminPage from "../pages/ModAndAdminPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <SignIn />,
    },
     {
         path: "/notallowed",
         element: <NotAllowed />,
     },
    {
        path: "/register",
        element: <SignUp />,
    },

     {
         path: "/profile",
         element: <UserPage> <Profile /> </UserPage>,
     },

    {
        path: "/add",
        element: <AdminPage> <Form /> </AdminPage>
    },
        {
        path: "/update/:id",
        element: <ModAndAdminPage> <Update /> </ModAndAdminPage>,
    },
            {
        path: "/delete/:id",
        element: <Delete />,
    },
]);
export default router;