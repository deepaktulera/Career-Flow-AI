import React from 'react'

const Logo = () => {
  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Adobe', 'Spotify', 'Airbnb']

  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Built for ambitious job seekers</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 md:gap-x-14">
          {companies.map((company) => <span key={company} className="text-lg font-extrabold tracking-tight text-slate-400/90">{company}</span>)}
        </div>
      </div>
    </section>
  )
}

export default Logo
