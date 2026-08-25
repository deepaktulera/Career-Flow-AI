import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Register from '../pages/Register'
import LandingPage from '../pages/LangingPage'
import Login from '../pages/Login'

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
    }
])

export default AppRoutes