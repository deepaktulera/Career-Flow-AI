import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Register from "../pages/Register";
import LandingPage from "../pages/LangingPage";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreateResume from "../pages/CreateResume";
import EditResume from "../pages/EditResume";
import ViewResume from "../pages/ViewResume";
import Profile from "../pages/Profile";

import ProtectedRoutes from "./ProtectedRoutes";
import EditProfile from "../pages/EditProfile";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },

    // Protected routes
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/profile/",
                element: <Profile />,
            },
            {
                path: "/profile/edit",
                element: <EditProfile />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/create-resume",
                element: <CreateResume />
            },
            {
                path: "/edit-resume/:id",
                element: <EditResume />
            },
            {
                path: "/view-resume/:id",
                element: <ViewResume />
            }
        ]
    }
]);

export default AppRoutes;