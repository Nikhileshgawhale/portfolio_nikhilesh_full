import React, { useState } from "react";
import { education, experience, profile, projects, skillGroups, stats } from "../data/profile";
import { downloadResume, viewResume } from "../utils/assets";
import { BlogContent } from "./Blog";

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H9M17 7v8" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export function AboutContent() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-white/90 leading-relaxed">{profile.summary}</p>
      <p className="text-muted leading-relaxed">{profile.summaryMore}</p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-4">
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-muted">
        <span className="text-mint">●</span> {profile.location} · open to AI Engineer roles
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={downloadResume} className="btn-accent text-sm">
          <DownloadIcon /> Download CV
        </button>
        <button type="button" onClick={viewResume} className="btn-ghost text-sm">
          View CV
        </button>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
          LinkedIn <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

export function ExperienceContent() {
  return (
    <div className="space-y-10">
      <ol className="relative border-l border-white/10 ml-1.5 space-y-10">
        {experience.map((job) => (
          <li key={job.company} className="pl-6 relative">
            <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_#ff4d00]" />
            <p className="font-mono text-xs text-accent">{job.period}</p>
            <h3 className="font-display text-xl font-bold text-white mt-1">{job.title}</h3>
            <p className="text-mint text-sm">{job.company}</p>
            <p className="text-muted/80 text-xs mt-0.5">{job.location}</p>
            <ul className="mt-3 space-y-2">
              {job.points.map((p) => (
                <li key={p} className="text-sm text-muted leading-relaxed flex gap-2">
                  <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <div>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-3">Education</p>
        <div className="grid gap-3">
          {education.map((e) => (
            <div key={e.degree} className="glass-card p-4">
              <p className="font-semibold text-white">{e.degree}</p>
              <p className="text-sm text-mint mt-0.5">{e.school}</p>
              <p className="text-xs text-muted mt-1">{e.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsContent() {
  return (
    <div className="grid gap-4">
      {projects.map((p, i) => (
        <a
          key={p.title}
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group glass-card p-5 block transition-all duration-300 hover:border-accent/50 hover:-translate-y-0.5 ${
            p.featured ? "border-accent/30 bg-accent/[0.04]" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] text-muted">
                {String(i + 1).padStart(2, "0")}
                {p.featured && <span className="ml-2 text-accent">FEATURED</span>}
              </p>
              <h3 className="font-display text-lg font-bold text-white mt-1 group-hover:text-accent transition-colors">
                {p.title}
              </h3>
            </div>
            <span className="text-muted group-hover:text-accent transition-colors mt-1">
              <ArrowIcon />
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed mt-2">{p.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {p.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </a>
      ))}
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm self-start">
        More on GitHub <ArrowIcon />
      </a>
    </div>
  );
}

export function SkillsContent() {
  return (
    <div className="space-y-6">
      {skillGroups.map((g, gi) => (
        <div key={g.name}>
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-3">
            <span className={gi % 2 ? "text-mint" : "text-accent"}>{String(gi + 1).padStart(2, "0")}</span>
            <span className="text-white/80 ml-3">{g.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span key={s} className="chip chip--lg">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContactContent() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <div className="space-y-6">
      <p className="text-lg text-white/90 leading-relaxed">
        Open to AI Engineer and Generative AI roles in London or remote. If you are
        building RAG, agents or fine-tuned models that need to work in production, let's talk.
      </p>
      <div className="glass-card p-5">
        <p className="font-mono text-xs text-muted uppercase tracking-widest">Email</p>
        <a
          href={`mailto:${profile.email}`}
          className="block font-display text-lg sm:text-xl font-bold text-white hover:text-accent transition-colors mt-1 break-all"
        >
          {profile.email}
        </a>
        <div className="flex flex-wrap gap-3 mt-4">
          <a href={`mailto:${profile.email}`} className="btn-accent text-sm">
            Send an email
          </a>
          <button type="button" onClick={copy} className="btn-ghost text-sm">
            {copied ? "Copied ✓" : "Copy address"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="glass-card p-4 hover:border-accent/50 transition-colors">
          <p className="font-mono text-xs text-muted">LinkedIn</p>
          <p className="text-white font-semibold mt-1 flex items-center gap-1">nikhilesh-gawhale <ArrowIcon /></p>
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="glass-card p-4 hover:border-accent/50 transition-colors">
          <p className="font-mono text-xs text-muted">GitHub</p>
          <p className="text-white font-semibold mt-1 flex items-center gap-1">Nikhileshgawhale <ArrowIcon /></p>
        </a>
      </div>
      <p className="font-mono text-xs text-muted">
        <span className="text-mint">●</span> {profile.location}
      </p>
    </div>
  );
}

export const sectionContent = {
  about: { title: "Hi, I'm Nikhilesh.", Component: AboutContent },
  experience: { title: "Where I've built", Component: ExperienceContent },
  projects: { title: "Selected work", Component: ProjectsContent },
  blog: { title: "Notes from the papers", Component: BlogContent },
  skills: { title: "What I work with", Component: SkillsContent },
  contact: { title: "Let's talk", Component: ContactContent },
} as const;
