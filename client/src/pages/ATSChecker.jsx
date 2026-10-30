import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft, CheckCircle2, CircleAlert, FileSearch, RotateCcw } from "lucide-react";

const COMMON_WORDS = new Set(("a an and are as at be by for from has have in into is it its of on or our that the their this to with you your will we role candidate team work experience skills ability strong using including preferred required responsibilities requirements").split(" "));
const ACTION_VERBS = ["built", "created", "developed", "designed", "implemented", "improved", "increased", "reduced", "managed", "led", "optimized", "automated", "delivered", "launched", "integrated", "tested", "maintained", "collaborated", "analyzed", "resolved"];
const SECTION_PATTERNS = [
  ["Contact information", /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i],
  ["Skills", /\b(skills|technical skills|core competencies)\b/i],
  ["Experience or projects", /\b(experience|employment|work history|projects)\b/i],
  ["Education", /\b(education|academic|degree|university|college)\b/i],
];

function words(text) {
  return (text.toLowerCase().match(/[a-z][a-z+#.-]{1,}/g) || [])
    .map((word) => word.replace(/^[.+-]+|[.+-]+$/g, ""))
    .filter((word) => word.length > 1 && !COMMON_WORDS.has(word));
}

export default function ATSChecker() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [checked, setChecked] = useState(false);

  const result = useMemo(() => {
    const resumeWords = new Set(words(resume));
    const jobWords = [...new Set(words(jobDescription))];
    const matched = jobWords.filter((word) => resumeWords.has(word));
    const missing = jobWords.filter((word) => !resumeWords.has(word)).slice(0, 30);
    const sections = SECTION_PATTERNS.map(([label, pattern]) => ({ label, found: pattern.test(resume) }));
    const actionCount = ACTION_VERBS.reduce((count, verb) => count + (new RegExp(`\\b${verb}\\b`, "i").test(resume) ? 1 : 0), 0);
    const keywordScore = jobWords.length ? Math.round((matched.length / jobWords.length) * 100) : 0;
    const sectionScore = Math.round((sections.filter((section) => section.found).length / sections.length) * 100);
    const lengthScore = resume.trim().length >= 400 ? 100 : Math.round((resume.trim().length / 400) * 100);
    const score = Math.round(keywordScore * 0.6 + sectionScore * 0.25 + lengthScore * 0.15);
    return { matched, missing, sections, actionCount, keywordScore, sectionScore, lengthScore, score, jobWordsCount: jobWords.length };
  }, [resume, jobDescription]);

  function runCheck(event) {
    event.preventDefault();
    setChecked(true);
  }

  function reset() {
    setResume("");
    setJobDescription("");
    setChecked(false);
  }

  const scoreColor = result.score >= 75 ? "text-emerald-600" : result.score >= 50 ? "text-amber-600" : "text-rose-600";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"><ArrowLeft size={16} /> Back to home</Link>
        <div className="mb-8 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700"><FileSearch size={14} /> Free resume review</span>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">ATS Resume Checker</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">Compare your resume text with a job description, find keyword gaps, and check common resume sections before applying.</p>
        </div>

        <form onSubmit={runCheck} className="grid gap-6 lg:grid-cols-2">
          <label className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="font-bold">Resume text</span>
            <span className="mt-1 block text-sm text-slate-500">Paste your resume content. Avoid uploading sensitive information you do not want to share.</span>
            <textarea value={resume} onChange={(e) => { setResume(e.target.value); setChecked(false); }} required minLength={80} rows={17} placeholder="Paste your resume text here..." className="mt-4 w-full resize-y rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            <span className="mt-2 block text-right text-xs text-slate-400">{resume.trim() ? resume.trim().split(/\s+/).length : 0} words</span>
          </label>
          <label className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="font-bold">Job description</span>
            <span className="mt-1 block text-sm text-slate-500">Paste the target job description to identify relevant keywords.</span>
            <textarea value={jobDescription} onChange={(e) => { setJobDescription(e.target.value); setChecked(false); }} required minLength={40} rows={17} placeholder="Paste the job description here..." className="mt-4 w-full resize-y rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            <span className="mt-2 block text-right text-xs text-slate-400">{jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0} words</span>
          </label>
          <div className="flex flex-wrap gap-3 lg:col-span-2">
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"><FileSearch size={18} /> Check my resume</button>
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"><RotateCcw size={16} /> Clear</button>
          </div>
        </form>

        {checked && (
          <section aria-live="polite" className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Overall checklist score</p><p className={`mt-2 text-4xl font-black ${scoreColor}`}>{result.score}%</p><p className="mt-2 text-xs text-slate-500">An indicative guide, not a real ATS prediction.</p></article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Keyword overlap</p><p className="mt-2 text-4xl font-black text-slate-900">{result.keywordScore}%</p><p className="mt-2 text-xs text-slate-500">{result.matched.length} of {result.jobWordsCount} distinct keywords matched</p></article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Resume sections</p><p className="mt-2 text-4xl font-black text-slate-900">{result.sections.filter((s) => s.found).length}/4</p><p className="mt-2 text-xs text-slate-500">Common sections detected</p></article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Action verbs</p><p className="mt-2 text-4xl font-black text-slate-900">{result.actionCount}</p><p className="mt-2 text-xs text-slate-500">Different strong verbs detected</p></article>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold">Resume section checklist</h2>
                <div className="mt-4 space-y-3">{result.sections.map((section) => <p key={section.label} className="flex items-center gap-2 text-sm">{section.found ? <CheckCircle2 className="text-emerald-600" size={18} /> : <CircleAlert className="text-amber-600" size={18} />}{section.label}: <strong>{section.found ? "Detected" : "Review / add"}</strong></p>)}</div>
                <h3 className="mt-6 font-bold">Suggestions</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                  <li>Use standard headings such as Skills, Experience, Education and Projects.</li>
                  <li>Include job-relevant keywords only when they accurately describe your experience.</li>
                  <li>Quantify results where possible, and start bullets with clear action verbs.</li>
                  <li>Keep formatting simple and verify the exported PDF has selectable text.</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-extrabold">Keywords to review</h2>
                <p className="mt-1 text-sm text-slate-500">These words appeared in the job description but not in the resume text. Add only if truthful.</p>
                <div className="mt-4 flex flex-wrap gap-2">{result.missing.length ? result.missing.map((word) => <span key={word} className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800">{word}</span>) : <p className="text-sm text-emerald-700">No missing keywords found by this simple comparison.</p>}</div>
                <h3 className="mt-6 font-bold">Matched keywords</h3>
                <div className="mt-3 flex flex-wrap gap-2">{result.matched.slice(0, 35).map((word) => <span key={word} className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">{word}</span>)}</div>
              </article>
            </div>
            <p className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">Limitations: this browser-based checker uses simple text and keyword matching. It does not parse PDF/DOCX files, evaluate meaning, or reproduce any employer's proprietary ATS. Use it as a checklist, not a hiring guarantee.</p>
          </section>
        )}
      </main>
    </div>
  );
}
