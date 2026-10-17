import React from "react"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  FolderKanban,
  PencilLine,
  Sparkles,
  UserRound,
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"

const features = [
  {
    icon: FileText,
    title: "Resume Builder",
    text: "Create structured resumes with personal details, skills, education, experience, projects, and certifications.",
  },
  {
    icon: PencilLine,
    title: "Easy Resume Editing",
    text: "Update your resume whenever your skills, experience, or career goals change.",
  },
  {
    icon: UserRound,
    title: "Career Profile",
    text: "Keep your basic career information organized in one place and reuse it while building resumes.",
  },
  {
    icon: FolderKanban,
    title: "Resume Management",
    text: "Create multiple resumes, view them, edit them, and remove old versions from your dashboard.",
  },
]

const steps = [
  {
    number: "01",
    title: "Create your account",
    text: "Sign up for CareerFlow AI and set up your basic profile.",
  },
  {
    number: "02",
    title: "Build your resume",
    text: "Add your education, skills, experience, projects, and certifications.",
  },
  {
    number: "03",
    title: "Manage your career",
    text: "Keep improving your resume today. Job tracking and smarter career tools can be added next.",
  },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        <Hero />

        {/* Features */}
        <section id="features" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-blue-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                Current features
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                Everything you need to build a{" "}
                <span className="text-blue-600">stronger resume.</span>
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                CareerFlow AI currently focuses on making resume creation and
                career information management simple and organized.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-lg font-extrabold">{title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-20 border-y border-slate-100 bg-slate-50 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <span className="rounded-full bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-sm">
                How it works
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
                Start simple.{" "}
                <span className="text-blue-600">Grow from there.</span>
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                CareerFlow is being built step by step, starting with a solid
                resume and profile foundation.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="text-sm font-black text-blue-600">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Next feature / roadmap */}
        <section id="roadmap" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-blue-100 bg-blue-50 px-6 py-12 sm:px-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                <Sparkles size={22} />
              </div>

              <span className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
                Next development step
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Job Application Tracker
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                The next major feature should let users save job applications,
                track their status, add company and role details, and manage
                their job-search progress from the dashboard.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  Company & role
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  Application status
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  Notes & follow-ups
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-center text-white shadow-2xl sm:px-12">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Ready to build your resume?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Create your CareerFlow AI account and start building a resume
              that grows with your career.
            </p>

            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Get started free
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <Link to="/" className="text-lg font-extrabold">
              CareerFlow <span className="text-blue-600">AI</span>
            </Link>
            <p className="mt-2 text-sm text-slate-500">
              Build your resume. Organize your career.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-slate-900">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#roadmap" className="hover:text-slate-900">
              Roadmap
            </a>
            <Link to="/login" className="hover:text-slate-900">
              Log in
            </Link>
            <Link to="/register" className="hover:text-slate-900">
              Sign up
            </Link>
          </div>

          <p className="text-xs text-slate-400">© 2026 CareerFlow AI</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
