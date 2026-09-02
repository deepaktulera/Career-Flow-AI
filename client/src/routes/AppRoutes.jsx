import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Register from '../pages/Register'
import LandingPage from '../pages/LangingPage'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import CreateResume from '../pages/CreateResume'

const AppRoutes = createBrowserRouter([
    {
        path : "/",
        element : <LandingPage />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/dashboard",
        element : <Dashboard />
    },
    {
        path : "/create-resume",
        element : <CreateResume />
    }
])

export default AppRoutes