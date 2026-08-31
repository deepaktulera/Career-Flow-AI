import React from 'react'
import { ArrowRight, Bot, ChevronRight, FileText, Search, Sparkles, Target, WandSparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Logo from '../components/Logo'

const features = [
  { icon: FileText, title: 'AI Resume Builder', text: 'Create an ATS-friendly resume tailored to the role you want, with smart suggestions that improve every section.' },
  { icon: Search, title: 'Smart Job Tracking', text: 'Keep applications, interview stages, notes, and follow-ups organized instead of losing them across spreadsheets.' },
  { icon: WandSparkles, title: 'Personalized AI Coach', text: 'Get practical career guidance, from positioning your experience to preparing for your next interview.' },
]

const steps = [
  ['01', 'Build your profile', 'Tell CareerFlow about your skills, experience, target role, and career goals.'],
  ['02', 'Let AI improve it', 'Get personalized recommendations for your resume, profile, and job-search strategy.'],
  ['03', 'Apply with confidence', 'Track applications, stay organized, and keep improving as you move through the process.'],
]

const testimonials = [
  ['“CareerFlow makes the job search feel much less chaotic. I finally know what to work on next.”', 'Aarav', 'Software Developer'],
  ['“The resume feedback helped me turn a basic resume into something that actually tells my story.”', 'Priya', 'Frontend Developer'],
  ['“Having applications, goals, and AI guidance in one place saves me hours every week.”', 'Rohan', 'Product Analyst'],
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Logo />

        <section id="features" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-blue-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">Everything you need</span>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Stop juggling tools. <span className="text-blue-600">Start moving forward.</span></h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">CareerFlow brings the most important parts of your job search together in one focused workspace.</p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, text }) => (
                <article key={title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white"><Icon size={22} /></div>
                  <h3 className="mt-6 text-lg font-extrabold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  <a href="#how-it-works" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-blue-600">Learn more <ChevronRight size={15} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <span className="rounded-full bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-sm">How it works</span>
                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">A simpler way to <span className="text-blue-600">land the right job.</span></h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">Spend less time managing your job search and more time preparing for opportunities that actually fit.</p>
                <div className="mt-9 space-y-7">
                  {steps.map(([number, title, text]) => (
                    <div key={number} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">{number}</span>
                      <div><h3 className="font-extrabold">{title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
                <div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
                  <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500"><Bot size={17} /></span><span className="text-sm font-bold">CareerFlow AI Coach</span></div><span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-300">Online</span></div>
                  <div className="mt-8 space-y-4">
                    <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-blue-600 p-4 text-sm leading-6">I’m applying for frontend developer roles. What should I improve first?</div>
                    <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-white/10 p-4 text-sm leading-6 text-slate-200">Start with your resume headline and project impact. I found 3 areas that can make your profile stronger for your target roles.</div>
                  </div>
                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><Sparkles size={17} className="text-blue-300" /><span className="text-sm text-slate-300">Analyzing your career profile...</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-5 sm:grid-cols-3">
              {[['10x', 'more organized job search'], ['92%', 'average profile completeness'], ['1', 'workspace for your career']].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 p-7 text-center"><p className="text-4xl font-black text-blue-600">{value}</p><p className="mt-2 text-sm font-medium text-slate-500">{label}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="success" className="scroll-mt-20 bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-2xl text-center"><span className="rounded-full bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">Success stories</span><h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Built to keep you <span className="text-blue-400">moving.</span></h2><p className="mt-5 text-slate-400">A better process creates a better job search experience.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map(([quote, name, role]) => <article key={name} className="rounded-2xl border border-white/10 bg-white/5 p-6"><div className="text-blue-400">★★★★★</div><p className="mt-5 text-sm leading-7 text-slate-200">{quote}</p><div className="mt-6 border-t border-white/10 pt-5"><p className="font-bold">{name}</p><p className="mt-1 text-xs text-slate-500">{role}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-14 text-center text-white shadow-2xl shadow-blue-600/20 sm:px-12">
            <Target className="mx-auto" size={32} />
            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Ready to take control of your career?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">Create your CareerFlow account and turn your next job search into a clear, organized plan.</p>
            <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-extrabold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50">Create my free account <ArrowRight size={18} /></Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div><Link to="/" className="text-lg font-extrabold">CareerFlow <span className="text-blue-600">AI</span></Link><p className="mt-2 text-sm text-slate-500">Your smarter path to the next opportunity.</p></div>
          <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500"><a href="#features" className="hover:text-slate-900">Features</a><a href="#how-it-works" className="hover:text-slate-900">How it works</a><Link to="/login" className="hover:text-slate-900">Log in</Link><Link to="/register" className="hover:text-slate-900">Sign up</Link></div>
          <p className="text-xs text-slate-400">© 2026 CareerFlow AI</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
