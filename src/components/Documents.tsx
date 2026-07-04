import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { downloadResume, viewResume } from "../utils/assets";

const Documents = () => {

  return (
    <section id="documents" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          index="05 — Resume"
          title="Download my CV"
          subtitle="Full professional history in backend engineering, production AI, and LLM systems"
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="panel p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-shrink-0 w-20 h-24 panel flex items-center justify-center border-accent/30">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Nikhilesh_Gawhale_Resume.pdf
                </h3>
                <p className="text-muted mt-3 leading-relaxed">
                  Backend Engineer (AI) with experience at RP-Tech International Solutions,
                  Midas Advisory, and Global Technologies. MSc AI (Distinction) from Queen
                  Mary University of London. Expertise in FastAPI, Anthropic Claude,
                  PostgreSQL, Docker, Kubernetes, and CI/CD.
                </p>
                <p className="font-mono text-xs text-muted mt-4">
                  PDF · Updated Apr 2026
                </p>
              </div>
            </div>

            <div className="relative flex flex-wrap gap-4 mt-10 pt-8 border-t border-white/[0.06]">
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

              <motion.button
                type="button"
                onClick={viewResume}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View in Browser
              </motion.button>

              <a
                href="https://linkedin.com/in/nikhilesh-gawhale"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Documents;
