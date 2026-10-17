import React from "react"
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  PencilLine,
  Sparkles,
  UserRound,
} from "lucide-react"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,0.16),transparent_42%),radial-gradient(circle_at_100%_45%,rgba(96,165,250,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[1.03fr_.97fr] lg:px-10 lg:pb-28">
        <div className="max-w-2xl">
          <div className="animate-fadeIn inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
            <Sparkles size={14} />
            Career workspace
          </div>

          <h1 className="animate-fadeIn mt-6 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Build a resume that{" "}
            <span className="text-blue-600">moves your career forward.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Create, edit, and manage professional resumes in one simple
            workspace. Keep your career information organized and ready for
            your next opportunity.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Create my resume
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Explore features
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              Multiple resumes
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              Easy editing
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-600" />
              Three templates
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />

          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  CAREERFLOW AI
                </p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">
                  Resume workspace
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                Ready to build
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">Resume</p>
                  <p className="mt-1 text-2xl font-black">
                    Software Developer
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Skills • Experience • Projects • Education
                  </p>
                </div>

                <div className="rounded-xl bg-blue-500/15 p-3 text-blue-300">
                  <FileText size={21} />
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[82%] rounded-full bg-blue-500" />
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Complete your profile and resume information.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <PencilLine size={18} />
                </div>

                <p className="mt-4 text-lg font-black text-slate-900">
                  Edit
                </p>

                <p className="text-xs font-medium text-slate-500">
                  Update anytime
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <UserRound size={18} />
                </div>

                <p className="mt-4 text-lg font-black text-slate-900">
                  Profile
                </p>

                <p className="text-xs font-medium text-slate-500">
                  Keep it organized
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 text-blue-600">
                  <Sparkles size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Next on CareerFlow
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Job application tracking is the next major feature planned
                    for the workspace.
                  </p>
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
