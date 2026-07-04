import React from "react";
import { downloadResume } from "../utils/assets";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-display text-2xl font-bold">
              NG<span className="text-accent">.</span>
            </p>
            <p className="text-muted text-sm mt-2 max-w-sm">
              Crafting the next generation of AI-powered experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#documents" className="hover:text-white transition-colors">Resume</a>
            <a
              href="https://github.com/Nikhileshgawhale"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/nikhilesh-gawhale"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>

          <button
            type="button"
            onClick={downloadResume}
            className="btn-ghost text-sm"
          >
            Download CV
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted">
          <p>© {year} Nikhilesh Gawhale. All rights reserved.</p>
          <p className="font-mono">Built with React · Vite · Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
