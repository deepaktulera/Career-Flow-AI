import React from 'react'
import { ArrowRight, CheckCircle2, FileText, Sparkles, TrendingUp, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(circle_at_100%_45%,rgba(96,165,250,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[1.03fr_.97fr] lg:px-10 lg:pb-28">
        <div className="max-w-2xl">
          <div className="animate-fadeIn inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
            <Sparkles size={14} /> AI-powered career growth
          </div>

          <h1 className="animate-fadeIn mt-6 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Your career deserves a <span className="text-blue-600">better flow.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Build a stronger resume, discover better opportunities, track every application, and get AI-powered guidance — all in one simple workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
              Start for free <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              See how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /> Free to get started</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /> No credit card</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-semibold text-slate-400">CAREERFLOW AI</p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">Career dashboard</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">Profile: 92%</span>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">Resume score</p>
                  <p className="mt-1 text-4xl font-black">92<span className="text-lg text-slate-400">/100</span></p>
                </div>
                <div className="rounded-xl bg-blue-500/15 p-3 text-blue-300"><TrendingUp size={21} /></div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-blue-500" />
              </div>
              <p className="mt-3 text-xs text-slate-400">Your resume is stronger than 86% of profiles in your target role.</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600"><FileText size={18} /></div>
                <p className="mt-4 text-2xl font-black text-slate-900">24</p>
                <p className="text-xs font-medium text-slate-500">Applications tracked</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600"><Users size={18} /></div>
                <p className="mt-4 text-2xl font-black text-slate-900">8</p>
                <p className="text-xs font-medium text-slate-500">Interviews this month</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 text-blue-600"><Sparkles size={18} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">AI recommendation</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">Add measurable impact to your latest project to improve your ATS match.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
