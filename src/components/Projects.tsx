import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "Instagram Motivation Bot",
    description:
      "AI-powered Instagram automation that generates motivational quotes with Ollama LLM, creates engaging videos with custom overlays, and posts automatically.",
    technologies: ["Python", "Flask", "OpenCV", "Ollama", "Docker"],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/Nikhileshgawhale/instagram-motivation-bot.git",
    accent: "from-orange-500/20 to-red-500/10",
  },
  {
    title: "AI Shopping Assistant",
    description:
      "Intelligent shopping assistant with NLP for product discovery, price comparison, and AI-driven purchase recommendations.",
    technologies: ["Python", "NLP", "Web Scraping", "API Integration"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/Nikhileshgawhale/ai-shopping-assistant.git",
    accent: "from-mint/20 to-teal-500/10",
  },
  {
    title: "E-commerce with Django",
    description:
      "Full-featured e-commerce platform with authentication, cart, payments, and admin dashboard built on Django.",
    technologies: ["Django", "PostgreSQL", "JavaScript", "Bootstrap"],
    image:
      "https://images.unsplash.com/photo-1472851291508-756e8af7691b?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/Nikhileshgawhale/E-commerce-Platform-Development-with-Django.git",
    accent: "from-violet-500/20 to-purple-500/10",
  },
  {
    title: "Large Language Model Development",
    description:
      "Fine-tuned large language models for industry applications with efficient training pipelines and Kubernetes deployment.",
    technologies: ["PyTorch", "Hugging Face", "Kubernetes", "Python"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/Nikhileshgawhale",
    accent: "from-accent/20 to-orange-400/10",
  },
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          index="03 — Work"
          title="Selected projects"
          subtitle="Innovative AI solutions from research to production"
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group panel overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.accent} to-surface/90`} />
                <span className="absolute top-4 left-4 font-mono text-xs text-white/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="p-6 lg:p-8">
                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
                >
                  View project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>

              <motion.div
                className="h-0.5 bg-gradient-to-r from-accent to-mint origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="#contact" className="btn-accent">
            Let's build something amazing
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
