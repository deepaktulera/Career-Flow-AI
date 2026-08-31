import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, Sparkles, X } from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-blue-500/15">
            <Sparkles size={18} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-950">
            CareerFlow <span className="text-blue-600">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <a href="#features" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">How it works</a>
          <a href="#success" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">Success stories</a>
          <button className="flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Resources <ChevronDown size={15} />
          </button>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link to="/login" className="text-sm font-semibold text-slate-700 transition hover:text-slate-950">Log in</Link>
          <Link to="/register" className="group flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
            Get started <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button className="rounded-lg p-2 text-slate-800 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-1">
            <a href="#features" onClick={closeMenu} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">Features</a>
            <a href="#how-it-works" onClick={closeMenu} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">How it works</a>
            <a href="#success" onClick={closeMenu} className="rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">Success stories</a>
            <div className="my-3 h-px bg-slate-200" />
            <Link to="/login" onClick={closeMenu} className="px-3 py-3 font-semibold text-slate-700">Log in</Link>
            <Link to="/register" onClick={closeMenu} className="mt-1 rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white">Get started free</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
