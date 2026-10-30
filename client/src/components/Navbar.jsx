import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Menu,
  Sparkles,
  X
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const { user } = useAuth()

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={closeMenu}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-blue-500/15">
            <Sparkles size={18} />
          </span>

          <span className="text-lg font-extrabold tracking-tight text-slate-950">
            CareerFlow <span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link to="/jobs" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">Find Jobs</Link>
          <Link to="/ats-checker" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">ATS Checker</Link>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            How it works
          </a>

          <Link to="/recruiter" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">For Recruiters</Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-5 lg:flex">

          {user ? (
            <Link
              to={user.role === "recruiter" ? "/recruiter" : "/dashboard"}
              className="flex items-center gap-2"
            >
              <img
                src={user.profilePic || "/favicon.svg"}
                alt="profile"
                className="h-9 w-9 rounded-full object-cover"
              />

              <span className="text-sm font-semibold text-slate-700">
                {user.name}
              </span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 transition hover:text-slate-950"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get started
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-slate-800 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>

      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">

          <div className="flex flex-col gap-1">
            <Link to="/jobs" onClick={closeMenu} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">Find Jobs</Link>
            <Link to="/ats-checker" onClick={closeMenu} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">ATS Resume Checker</Link>
            <a
              href="#features"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              How it works
            </a>

            <div className="my-3 h-px bg-slate-200" />

            {user ? (
              <Link
                to={user.role === "recruiter" ? "/recruiter" : "/dashboard"}
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-slate-50"
              >
                <img
                  src={user.profilePic || "/favicon.svg"}
                  alt="profile"
                  className="h-9 w-9 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    {user.name}
                  </p>

                  <p className="text-sm text-slate-500">
                    Dashboard
                  </p>
                </div>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-3 py-3 font-semibold text-slate-700"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="mt-1 rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white"
                >
                  Get started free
                </Link>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar