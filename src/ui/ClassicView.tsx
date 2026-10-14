import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { sections } from "../scene/stations";
import { sectionContent } from "./Sections";
import { profile, stats } from "../data/profile";
import { downloadResume } from "../utils/assets";

export default function ClassicView({ onEnterLab }: { onEnterLab?: () => void }) {
  // Content renders after load, so jump to a #section link ourselves (e.g. #blog from the GitHub README).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || id === "classic") return;
    window.history.scrollRestoration = "manual";
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "instant" as ScrollBehavior });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-white bg-grid">
      <nav className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <a href="#top" className="font-display font-bold text-lg shrink-0">
            NG<span className="text-accent">.</span>
          </a>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 text-sm text-muted hover:text-white transition-colors whitespace-nowrap">
                {s.label}
              </a>
            ))}
            {onEnterLab && (
              <button type="button" onClick={onEnterLab} className="hud-btn ml-2 whitespace-nowrap">
                3D view
              </button>
            )}
          </div>
        </div>
      </nav>

      <header id="top" className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
          {profile.tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] tracking-tight mt-5"
        >
          {profile.name}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-300 to-mint">
            AI Engineer
          </span>
        </motion.h1>
        <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">{profile.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={downloadResume} className="btn-accent">
            Download CV
          </button>
          <a href="#contact" className="btn-ghost">
            Get in touch
          </a>
        </div>
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/[0.06] pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 space-y-24">
        {sections.map((s, i) => {
          const { title, Component } = sectionContent[s.id];
          return (
            <motion.section
              key={s.id}
              id={s.id}
              className="scroll-mt-20 grid md:grid-cols-[220px_1fr] gap-6 md:gap-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
                  {String(i + 1).padStart(2, "0")} / {s.label}
                </p>
                <h2 className="font-display text-3xl font-bold mt-2">{title}</h2>
              </div>
              <div className="max-w-2xl">
                <Component />
              </div>
            </motion.section>
          );
        })}
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name} · Built with React &amp; Three.js
      </footer>
    </div>
  );
}
