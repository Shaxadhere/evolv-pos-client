import React from 'react'
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error";
import Dashboard from "../../views/client/Dashboard"
import POS from '../../views/POS';
import ClientLayout from '../../components/BasicUI/ClientLayout';
import POSLayout from '../../components/BasicUI/POSLayout';
import AuthLayout from '../../components/BasicUI/AuthLayout';
import Login from '../../views/auth/Login';
import Signup from '../../views/auth/Signup';
import Products from '../../views/client/Products';
import Categories from '../../views/client/Categories';
import Orders from '../../views/client/Orders';
import Customers from '../../views/client/Customers';

const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to={"/pos"} replace />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "categories",
                element: <Categories />
            },
            {
                path: "orders",
                element: <Orders />
            },
            {
                path: "customers",
                element: <Customers />
            },
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