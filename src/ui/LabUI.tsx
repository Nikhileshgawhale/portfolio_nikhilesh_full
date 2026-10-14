import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sections, SectionId, View } from "../scene/stations";
import { sectionContent } from "./Sections";
import { profile } from "../data/profile";
import { downloadResume } from "../utils/assets";

export function Intro({
  visible,
  ready,
  onStart,
  onClassic,
}: {
  visible: boolean;
  ready: boolean;
  onStart: () => void;
  onClassic: () => void;
}) {
  // Eases towards 90% while the 3D scene boots, then jumps to done.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (ready) return setProgress(100);
    const id = setInterval(() => setProgress((p) => p + (90 - p) * 0.08), 60);
    return () => clearInterval(id);
  }, [ready]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center px-6 text-center"
          exit={{ opacity: 0, transition: { duration: 1.1, ease: "easeInOut" } }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[11px] tracking-[0.4em] uppercase text-muted"
          >
            {profile.name}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent/80 mt-2"
          >
            GenAI · ML Engineer
          </motion.p>

          <div className="h-28 flex items-center justify-center">
            {ready ? (
              <motion.button
                type="button"
                onClick={onStart}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="start-btn"
              >
                START
              </motion.button>
            ) : (
              <div className="w-48">
                <div className="h-px bg-white/10 overflow-hidden">
                  <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <p className="font-mono text-[11px] text-muted mt-3">booting lab… {Math.round(progress)}%</p>
              </div>
            )}
          </div>

          <button type="button" onClick={onClassic} className="font-mono text-[11px] text-muted hover:text-white transition-colors underline-offset-4 hover:underline">
            or skip to the classic version →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Hud({ view, onSelect, onClassic }: { view: View; onSelect: (v: View) => void; onClassic: () => void }) {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-30 pointer-events-none">
        <div className="flex items-start justify-between gap-4 p-4 sm:p-6">
          <button type="button" onClick={() => onSelect("home")} className="pointer-events-auto text-left group">
            <p className="font-display text-base sm:text-xl font-bold leading-none">
              Nikhilesh Gawhale<span className="text-accent">.</span>
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] text-muted mt-1.5 tracking-wider uppercase group-hover:text-white transition-colors">
              {profile.title}
            </p>
          </button>
          <div className="pointer-events-auto flex items-center gap-2">
            <button type="button" onClick={downloadResume} className="hud-btn hidden sm:inline-flex">
              CV ↓
            </button>
            <button type="button" onClick={onClassic} className="hud-btn">
              Classic<span className="hidden sm:inline">&nbsp;view</span>
            </button>
          </div>
        </div>
      </header>

      <nav
        className={`fixed bottom-0 inset-x-0 z-30 pointer-events-none pb-4 sm:pb-6 px-4 transition-[padding] duration-500 ${
          view !== "home" ? "max-lg:hidden lg:pr-[calc(min(44vw,600px)+20px)]" : ""
        }`}
      >
        <div className="pointer-events-auto mx-auto w-fit max-w-full overflow-x-auto no-scrollbar flex gap-1 p-1 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(view === s.id ? "home" : s.id)}
              className={`nav-pill ${view === s.id ? "nav-pill--on" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <AnimatePresence>
          {view === "home" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center font-mono text-[10px] text-white/40 mt-3 hidden sm:block"
            >
              click the glowing objects to explore · move your mouse to look around
            </motion.p>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export function Panel({ view, onSelect }: { view: View; onSelect: (v: View) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSelect("home");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSelect]);

  const index = sections.findIndex((s) => s.id === view);
  const go = (delta: number) => onSelect(sections[(index + delta + sections.length) % sections.length].id);

  return (
    <AnimatePresence mode="wait">
      {view !== "home" && (
        <motion.aside
          key={view}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, x: 30, transition: { duration: 0.25 } }}
          className="panel-shell"
          aria-label={sections[index].label}
        >
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/[0.06]">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
                {String(index + 1).padStart(2, "0")} / {sections[index].label}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2">
                {sectionContent[view as SectionId].title}
              </h2>
            </div>
            <button type="button" onClick={() => onSelect("home")} className="hud-btn !px-3" aria-label="Close panel">
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 panel-scroll">
            {React.createElement(sectionContent[view as SectionId].Component)}
          </div>
          <div className="flex justify-between px-6 py-4 border-t border-white/[0.06] font-mono text-xs">
            <button type="button" onClick={() => go(-1)} className="text-muted hover:text-white transition-colors">
              ← {sections[(index - 1 + sections.length) % sections.length].label}
            </button>
            <button type="button" onClick={() => go(1)} className="text-muted hover:text-white transition-colors">
              {sections[(index + 1) % sections.length].label} →
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
