import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('')

    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setError('')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match")
            return
        }

        const { confirmPassword, ...registerData } = formData

        try {
            const response = await registerUser(registerData)

            console.log("Registration successful:", response)

            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

            navigate('/login')

        } catch (error) {
            console.log(error)

            setError(
                error.response?.data?.message || "Registration failed"
            )
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center py-6 px-4 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(circle_at_100%_45%,rgba(96,165,250,0.12),transparent_30%)]">

            {/* Register Card */}
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl animate-fadeIn">

                {/* Heading */}
                <div className="text-center mb-5">

                    <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                        C
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Join CareerFlow AI today
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <p className="mb-3 text-center text-sm text-red-500 bg-red-50 p-2 rounded-lg">
                        {error}
                    </p>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3"
                >

                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 mt-1 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95"
                    >
                        Create Account
                    </button>

                </form>

                {/* Login */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{' '}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:text-blue-800 transition"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Register