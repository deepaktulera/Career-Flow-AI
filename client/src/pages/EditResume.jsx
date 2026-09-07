import React, { useEffect, useState } from 'react'
import { createResume, showMyResume, updateResume } from '../services/resumeService'
import { useNavigate, useParams } from 'react-router-dom'

const education = () => ({ degree: '', institution: '', startYear: '', endYear: '' })
const experience = () => ({ company: '', position: '', startDate: '', endDate: '', description: '' })
const project = () => ({ name: '', description: '', technologies: [], projectUrl: '', githubUrl: '' })
const certification = () => ({ name: '', organization: '', issueDate: '', credentialUrl: '' })

const input = 'w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
const textarea = `${input} resize-none`

const EditResume = () => {
    const {id} = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    personalInfo: { name: '', email: '', phone: '', location: '', profilePic: '' },
    careerGoal: '',
    skills: [],
    education: [education()],
    experience: [experience()],
    projects: [project()],
    certifications: [certification()]
  })
  const [skillInput, setSkillInput] = useState('')
  const [technologyInputs, setTechnologyInputs] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchResume(){
        const responce = await showMyResume(id)
        setFormData(responce.resume)
    }
    fetchResume()
  } , [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(p => ({
      ...p,
      ...(name in p.personalInfo
        ? { personalInfo: { ...p.personalInfo, [name]: value } }
        : { [name]: value })
    }))
    setError('')
  }

  const update = (section, index, field, value) =>
    setFormData(p => ({
      ...p,
      [section]: p[section].map((x, i) =>
        i === index ? { ...x, [field]: value } : x
      )
    }))

  const add = (section, fn) =>
    setFormData(p => ({ ...p, [section]: [...p[section], fn()] }))

  const remove = (section, index) =>
    setFormData(p => ({
      ...p,
      [section]: p[section].filter((_, i) => i !== index)
    }))

  const addSkill = () => {
    const value = skillInput.trim()
    if (!value || formData.skills.includes(value)) return
    setFormData(p => ({ ...p, skills: [...p.skills, value] }))
    setSkillInput('')
  }

  const addTechnology = index => {
    const value = technologyInputs[index]?.trim()
    if (!value) return

    setFormData(p => ({
      ...p,
      projects: p.projects.map((x, i) =>
        i === index && !x.technologies.includes(value)
          ? { ...x, technologies: [...x.technologies, value] }
          : x
      )
    }))

    setTechnologyInputs(p => ({ ...p, [index]: '' }))
  }

  const removeTechnology = (projectIndex, techIndex) =>
    setFormData(p => ({
      ...p,
      projects: p.projects.map((x, i) =>
        i === projectIndex
          ? { ...x, technologies: x.technologies.filter((_, j) => j !== techIndex) }
          : x
      )
    }))

  const handleSubmit = async e => {
    e.preventDefault()
    const { title, personalInfo } = formData

    if (
      !title.trim() ||
      !personalInfo.name.trim() ||
      !personalInfo.email.trim() ||
      !personalInfo.phone.trim()
    ) {
      setError('Please fill in Resume Title, Name, Email and Phone.')
      return
    }

    try {
      setLoading(true)
      setError('')
      await updateResume(id , formData)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Something went wrong while updating your resume.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto mb-8 max-w-5xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase text-blue-600">Resume Builder</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Edit Your Resume</h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">Edit your details and build a professional resume.</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <Section title="Resume Details" description="Give your resume a title.">
          <input name="title" placeholder="e.g. Full Stack Developer Resume" value={formData.title} onChange={handleChange} required className={input} />
        </Section>

        <Section title="Personal Information" description="Tell us about yourself.">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input label="Full Name *" name="name" placeholder="e.g. John Deo" value={formData.personalInfo.name} onChange={handleChange} required />
            <Input label="Email Address *" type="email" name="email" placeholder="e.g. john@example.com" value={formData.personalInfo.email} onChange={handleChange} required />
            <Input label="Phone Number *" type="tel" name="phone" placeholder="e.g. +91 9876543210" value={formData.personalInfo.phone} onChange={handleChange} required />
            <Input label="Location" name="location" placeholder="e.g. Tokyo, Japan" value={formData.personalInfo.location} onChange={handleChange} />
            <div className="md:col-span-2">
              <Input label="Profile Picture URL" name="profilePic" placeholder="https://example.com/profile.jpg" value={formData.personalInfo.profilePic} onChange={handleChange} />
              <p className="mt-1 text-xs text-slate-400">You can add image upload later using Cloudinary.</p>
            </div>
          </div>
        </Section>

        <Section title="Career Objective" description="Briefly describe your career goals.">
          <textarea name="careerGoal" rows="4" placeholder="Example: Motivated Full Stack Developer looking for an opportunity to build scalable and user-friendly web applications." value={formData.careerGoal} onChange={handleChange} className={textarea} />
        </Section>

        <Section title="Skills" description="Add your technical and professional skills.">
          <div className="flex gap-2">
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="e.g. React.js" className={input} />
            <AddButton onClick={addSkill} />
          </div>
          <Tags items={formData.skills} onRemove={i => setFormData(p => ({ ...p, skills: p.skills.filter((_, j) => j !== i) }))} />
        </Section>

        <ArraySection title="Education" section="education" items={formData.education} create={education} add={add} remove={remove}>
          {(x, i) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field value={x.degree} placeholder="Degree e.g. BCA" onChange={e => update('education', i, 'degree', e.target.value)} />
              <Field value={x.institution} placeholder="Institution / University" onChange={e => update('education', i, 'institution', e.target.value)} />
              <Field type="number" value={x.startYear} placeholder="Start Year e.g. 2022" onChange={e => update('education', i, 'startYear', e.target.value)} />
              <Field type="number" value={x.endYear} placeholder="End Year e.g. 2025" onChange={e => update('education', i, 'endYear', e.target.value)} />
            </div>
          )}
        </ArraySection>

        <ArraySection title="Work Experience" section="experience" items={formData.experience} create={experience} add={add} remove={remove}>
          {(x, i) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field value={x.company} placeholder="Company Name" onChange={e => update('experience', i, 'company', e.target.value)} />
              <Field value={x.position} placeholder="Position e.g. Frontend Developer" onChange={e => update('experience', i, 'position', e.target.value)} />
              <DateField label="Start Date" value={x.startDate} onChange={e => update('experience', i, 'startDate', e.target.value)} />
              <DateField label="End Date" value={x.endDate} onChange={e => update('experience', i, 'endDate', e.target.value)} />
              <textarea rows="4" placeholder="Describe your responsibilities and achievements..." value={x.description} onChange={e => update('experience', i, 'description', e.target.value)} className={`${textarea} md:col-span-2`} />
            </div>
          )}
        </ArraySection>

        <ArraySection title="Projects" section="projects" items={formData.projects} create={project} add={add} remove={remove}>
          {(x, i) => (
            <div className="space-y-4">
              <Field value={x.name} placeholder="Project Name e.g. YouTube Clone" onChange={e => update('projects', i, 'name', e.target.value)} />
              <textarea rows="4" placeholder="Describe your project..." value={x.description} onChange={e => update('projects', i, 'description', e.target.value)} className={textarea} />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Technologies</label>
                <div className="flex gap-2">
                  <input value={technologyInputs[i] || ''} onChange={e => setTechnologyInputs(p => ({ ...p, [i]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTechnology(i))} placeholder="e.g. React" className={input} />
                  <AddButton onClick={() => addTechnology(i)} />
                </div>
                <Tags items={x.technologies} onRemove={j => removeTechnology(i, j)} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field type="url" value={x.projectUrl} placeholder="Project URL" onChange={e => update('projects', i, 'projectUrl', e.target.value)} />
                <Field type="url" value={x.githubUrl} placeholder="GitHub URL" onChange={e => update('projects', i, 'githubUrl', e.target.value)} />
              </div>
            </div>
          )}
        </ArraySection>

        <ArraySection title="Certifications" section="certifications" items={formData.certifications} create={certification} add={add} remove={remove}>
          {(x, i) => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field value={x.name} placeholder="Certification Name" onChange={e => update('certifications', i, 'name', e.target.value)} />
              <Field value={x.organization} placeholder="Organization / Issuer" onChange={e => update('certifications', i, 'organization', e.target.value)} />
              <DateField label="Issue Date" value={x.issueDate} onChange={e => update('certifications', i, 'issueDate', e.target.value)} />
              <Field type="url" value={x.credentialUrl} placeholder="Credential URL" onChange={e => update('certifications', i, 'credentialUrl', e.target.value)} />
            </div>
          )}
        </ArraySection>

        {error && <div className="mx-6 mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:mx-8">{error}</div>}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-between sm:p-8">
          <button type="button" onClick={() => navigate('/dashboard')} className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
          <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Creating Resume...' : 'Edit Resume →'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Section({ title, description, children }) {
  return (
    <section className="border-b border-slate-200 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>}
      <input {...props} className={input} />
    </div>
  )
}

function Field({ ...props }) {
  return <input {...props} className={input} />
}

function DateField({ label, ...props }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-slate-500">{label}</label>
      <input type="date" {...props} className={input} />
    </div>
  )
}

function AddButton({ onClick }) {
  return <button type="button" onClick={onClick} className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Add</button>
}

function Tags({ items, onRemove }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {item}
          <button type="button" onClick={() => onRemove(i)} className="ml-2 font-bold">×</button>
        </div>
      ))}
    </div>
  )
}

function ArraySection({ title, section, items, create, add, remove, children }) {
  return (
    <section className="border-b border-slate-200 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5">
        {items.map((item, i) => (
          <div key={i} className="mb-5 rounded-xl border border-slate-200 p-5">
            <div className="mb-4 flex justify-between">
              <h3 className="font-semibold text-slate-800">{title} {i + 1}</h3>
              {items.length > 1 && <button type="button" onClick={() => remove(section, i)} className="text-sm font-medium text-red-500">Remove</button>}
            </div>
            {children(item, i)}
          </div>
        ))}
      </div>
      <button type="button" onClick={() => add(section, create)} className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">
        + Add {title.replace('Work ', '')}
      </button>
    </section>
  )
}

export default EditResume