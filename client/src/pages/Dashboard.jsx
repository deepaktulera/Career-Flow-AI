
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { showResumes, deleteResume } from "../services/resumeService";
import { showApplication } from "../services/jobApplicationService";
import { Link, useNavigate } from "react-router-dom";
import {
    Sparkles,
    FileText,
    BriefcaseBusiness,
    CalendarCheck,
    Plus,
    ArrowRight,
    Trash2,
    Pencil,
    Eye,
    UserRound,
    LogOut,
    LayoutDashboard,
    TrendingUp,
    Target,
    ChevronDown,
} from "lucide-react";

const Dashboard = () => {
    const { user, logout } = useAuth();

    const [open, setOpen] = useState(false);
    const [resumes, setResumes] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        const fetchDashboardData = async () => {
            try {
                const [resumeResponse, applicationResponse] =
                    await Promise.all([
                        showResumes(),
                        showApplication(),
                    ]);

                setResumes(resumeResponse.resumes || []);
                setApplications(
                    applicationResponse.data.application || []
                );
            } catch (error) {
                console.error(
                    "Failed to fetch dashboard data:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);

            await deleteResume(id);

            setResumes((prev) =>
                prev.filter((resume) => resume._id !== id)
            );
        } catch (error) {
            console.error("Failed to delete resume:", error);
            alert("Failed to delete resume. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-500">Loading your dashboard...</p>
            </div>
        );
    }

    const interviewCount = applications.filter(
        (job) => job.status === "interview"
    ).length;

    const stats = [
        {
            title: "My Resumes",
            value: resumes.length,
            description: "Career documents",
            icon: FileText,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Applications",
            value: applications.length,
            description: "Jobs you're tracking",
            icon: BriefcaseBusiness,
            color: "bg-violet-50 text-violet-600",
        },
        {
            title: "Interviews",
            value: interviewCount,
            description: "Interview-stage jobs",
            icon: CalendarCheck,
            color: "bg-emerald-50 text-emerald-600",
        },
    ];

    const quickActions = [
        {
            title: "Create Resume",
            description: "Build your professional resume",
            link: "/create-resume",
            icon: FileText,
            color: "bg-blue-600",
        },
        {
            title: "Track Applications",
            description: "Manage your job search",
            link: "/applications",
            icon: BriefcaseBusiness,
            color: "bg-violet-600",
        },
        {
            title: "My Profile",
            description: "Update your career details",
            link: "/profile",
            icon: UserRound,
            color: "bg-emerald-600",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">

            {/* Navbar */}
            <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                    <Link
                        to="/"
                        className="flex items-center gap-2"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-blue-500/15">
                            <Sparkles size={20} />
                        </span>

                        <span className="text-xl font-extrabold tracking-tight text-slate-950">
                            CareerFlow{" "}
                            <span className="text-blue-600">AI</span>
                        </span>
                    </Link>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 transition hover:bg-slate-50"
                        >
                            {user.profilePic ? (
                                <img
                                    src={user.profilePic}
                                    alt="Profile"
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                            ) : (
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </span>
                            )}

                            <span className="hidden text-sm font-medium sm:block">
                                {user.name}
                            </span>

                            <ChevronDown size={16} />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                                <Link
                                    to="/profile"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50"
                                >
                                    <UserRound size={17} />
                                    My Profile
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Welcome Banner */}
                <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-10">

                    <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl" />

                    <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">

                        <div className="max-w-2xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100">
                                <Sparkles size={14} />
                                Your career workspace
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Welcome back,{" "}
                                <span className="text-blue-300">
                                    {user.name?.split(" ")[0] || "there"}
                                </span>
                                !
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                                Every step counts. Build your resume,
                                organize your applications, and keep
                                moving toward your next career opportunity.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    to="/create-resume"
                                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-blue-50"
                                >
                                    <Plus size={17} />
                                    Create Resume
                                </Link>

                                <Link
                                    to="/applications"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                                >
                                    View Applications
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden h-36 w-36 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white/10 md:flex">
                            <TrendingUp
                                size={76}
                                strokeWidth={1.2}
                                className="text-blue-200"
                            />
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="mb-10">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-900">
                            Your Overview
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            A snapshot of your career progress.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {stats.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.title}
                                        className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-slate-500">
                                                    {stat.title}
                                                </p>

                                                <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                                    {stat.value}
                                                </h3>

                                                <p className="mt-2 text-xs text-slate-500">
                                                    {stat.description}
                                                </p>
                                            </div>

                                            <span
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                                            >
                                                <Icon size={23} />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Quick Actions */}
                <section className="mb-10">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-slate-900">
                            Quick Actions
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Pick up where you left off.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {quickActions.map((action) => {
                            const Icon = action.icon;

                            return (
                                <Link
                                    key={action.title}
                                    to={action.link}
                                    className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
                                >
                                    <span
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${action.color}`}
                                    >
                                        <Icon size={22} />
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-slate-900">
                                            {action.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {action.description}
                                        </p>
                                    </div>

                                    <ArrowRight
                                        size={18}
                                        className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* Resume Section */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">

                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <FileText size={19} />
                                </span>

                                <h2 className="text-xl font-bold text-slate-900">
                                    My Resumes
                                </h2>
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                                Manage and update your professional resumes.
                            </p>
                        </div>

                        <Link
                            to="/create-resume"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            <Plus size={17} />
                            Create New
                        </Link>
                    </div>

                    {loading ? (
                        <div className="py-10 text-center text-slate-500">
                            Loading your resumes...
                        </div>
                    ) : resumes.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
                            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                <FileText size={28} />
                            </span>

                            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                Your next opportunity starts here
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Create your first resume to showcase your
                                skills, projects, and experience.
                            </p>

                            <Link
                                to="/create-resume"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <Plus size={17} />
                                Create My Resume
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {resumes.map((item) => (
                                <div
                                    key={item._id}
                                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FileText size={23} />
                                        </span>

                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                            Resume
                                        </span>
                                    </div>

                                    <h3 className="mt-5 truncate text-lg font-semibold text-slate-900">
                                        {item.title || "Untitled Resume"}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Your professional profile
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                                        <Link
                                            to={`/view-resume/${item._id}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            <Eye size={15} />
                                            View
                                        </Link>

                                        <Link
                                            to={`/edit-resume/${item._id}`}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            <Pencil size={15} />
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            disabled={deletingId === item._id}
                                            onClick={() => handleDelete(item._id)}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <Trash2 size={15} />
                                            {deletingId === item._id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="py-8 text-center text-sm text-slate-500">
                    <div className="mb-2 flex items-center justify-center gap-2">
                        <Target size={16} className="text-blue-600" />
                        <span className="font-medium text-slate-700">
                            Keep building. Keep growing.
                        </span>
                    </div>

                    <p>
                        CareerFlow AI · Your journey to the next opportunity.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default Dashboard;