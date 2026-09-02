import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { showResumes, deleteResume } from '../services/resumeService'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { user , logout} = useAuth()

    const [open, setOpen] = useState(null)
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return

        const fetchResumes = async () => {
            try {
                const response = await showResumes()

                console.log(response)

                setResumes(response.resumes || [])
            } catch (error) {
                console.error('Failed to fetch resumes:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchResumes()
    }, [user])

    const handleDelete = async (id) => {
        try {
            await deleteResume(id)

            setResumes(prev =>
                prev.filter(resume => resume._id !== id)
            )
        } catch (error) {
            console.error('Failed to delete resume:', error)
        }
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <section className="p-2 w-full min-h-screen bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(circle_at_100%_45%,rgba(96,165,250,0.12),transparent_30%)]">

            <header className="flex justify-between p-4 shadow-2xs">
                <Link to={"/"}>CAREER FLOW AI</Link>

                <div onClick={() => setOpen(!open)} className='relative'>
                    <img
                        src={user?.profilePic}
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                    />
                    {open && (
                        <div className='absolute border rounded shadow-2xs p-2 right-2 bg-white'>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </header>

            <main className="p-4">

                <div className="flex justify-between items-center">
                    <h1 className="text-4xl">
                        Welcome Back,{' '}
                        <strong className="text-blue-500">
                            {user?.name}
                        </strong>
                    </h1>

                    <Link
                        to="/create-resume"
                        className="p-2 rounded-full border"
                    >
                        + Create Resume
                    </Link>
                </div>

                {loading ? (
                    <p>Loading resumes...</p>
                ) : resumes.length === 0 ? (
                    <p className='p-2'>No resumes found.</p>
                ) : (
                    <div className="mt-6">
                        {resumes.map((item) => (
                            <div
                                key={item._id}
                                className="p-4 border rounded-lg mb-3"
                            >
                                <h2 className="text-xl font-semibold">
                                    {item.title}
                                </h2>

                                <div className="flex gap-2 mt-3">

                                    <Link
                                        to={`/view-resume/${item._id}`}
                                        className="px-3 py-1 border rounded-full"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/edit-resume/${item._id}`}
                                        className="px-3 py-1 border rounded-full"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="px-3 py-1 border rounded-full"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>
        </section>
    )
}

export default Dashboard