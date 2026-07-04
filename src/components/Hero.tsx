import React from "react";
import { motion } from "framer-motion";
import Cube3D from "./Cube3D";
import { downloadResume } from "../utils/assets";

const stats = [
  { value: "Production", label: "Claude AI products shipped" },
  { value: "45%", label: "Operational reliability uplift" },
  { value: "Distinction", label: "MSc AI, QMUL" },
];

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase mb-6">
              Backend Engineer (AI)
            </p>

            <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
              <span className="block text-white">Nikhilesh</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-300 to-mint">
                Gawhale
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-muted max-w-xl leading-relaxed">
              I ship production AI features end-to-end — Python backends, FastAPI,
              agentic Claude workflows, and containerised deployments from design
              through monitoring.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.button
                type="button"
                onClick={downloadResume}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-accent"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </motion.button>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost"
              >
                View my work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 border-t border-white/[0.06] pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <p className="font-display text-xl md:text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Cube3D />
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 panel px-4 py-3">
              <p className="font-mono text-xs text-muted">Currently</p>
              <p className="text-sm font-semibold text-white">RP-Tech · Remote</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-muted uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
