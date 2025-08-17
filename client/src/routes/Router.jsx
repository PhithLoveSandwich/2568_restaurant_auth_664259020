import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Update from "../pages/Update";
import Form from "../pages/Form";
import Delete from "../pages/Delete";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/login", element: <SignIn /> },
            { path: "/add", element: <Form /> },
            { path: "/update/:id", element: <Update /> },
            { path: "/delete/:id", element: <Delete /> },
        ],
    },
]);
export default router;