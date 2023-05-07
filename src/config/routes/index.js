import React from 'react'
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error";
import Dashboard from "../../views/admin/Dashboard"
import POS from '../../views/POS';
import ClientLayout from '../../components/BasicUI/ClientLayout';
import POSLayout from '../../components/BasicUI/POSLayout';
import AuthLayout from '../../components/BasicUI/AuthLayout';
import Login from '../../views/auth/Login';
import Signup from '../../views/auth/Signup';

// import examSubSiderOptions from "../../config/constants/examSubsiderOptions"

const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={"/dashboard"} replace />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            }
        ]
    },
    {
        path: "/pos",
        element: <POSLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <POS />
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={"/auth/login"} replace />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            }
        ]
    },
]);

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter 