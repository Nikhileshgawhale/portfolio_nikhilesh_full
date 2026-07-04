import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const highlights = [
  "FastAPI & Python",
  "Anthropic Claude",
  "Agentic Workflows",
  "PostgreSQL",
  "Docker & Kubernetes",
  "RAG & LLM Systems",
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          index="01 — About"
          title="Engineering intelligence at scale"
          subtitle="Backend engineer shipping production AI features with Python, FastAPI, and Claude"
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] panel overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-mint/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <span className="font-display text-[8rem] md:text-[10rem] font-bold text-white/[0.06] leading-none select-none">
                  NG
                </span>
                <p className="absolute bottom-8 left-8 right-8">
                  <span className="font-mono text-xs text-accent tracking-widest uppercase">Profile</span>
                  <span className="block mt-2 text-lg font-semibold">Nikhilesh Gawhale</span>
                  <span className="block text-sm text-muted">London, UK · Remote-first</span>
                </p>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-mint scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-lg text-muted leading-relaxed">
              Backend engineer who ships production AI features end-to-end — using
              Claude and other AI tools as a daily co-pilot while owning the quality
              and review of every line that goes out. MSc Artificial Intelligence
              (Distinction) from Queen Mary University of London.
            </p>

            <p className="text-muted leading-relaxed">
              Currently at RP-Tech International Solutions, I shipped real AI products
              powered by Anthropic Claude into production — a contract-review platform
              with agentic workflows, document intelligence and human-in-the-loop
              oversight — owning features from design through deployment and monitoring.
            </p>

            <p className="text-muted leading-relaxed">
              At Midas Advisory I built FastAPI backend services powering production
              LLM features with RAG pipelines. At Global Technologies I delivered
              Python backend services and predictive monitoring pipelines that improved
              operational reliability by 45%.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {highlights.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>

            <div className="pt-6">
              <motion.a
                href="https://linkedin.com/in/nikhilesh-gawhale"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-ghost"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Connect on LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
