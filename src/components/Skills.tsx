import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skills = [
  {
    category: "Machine Learning",
    skills: [
      { name: "Deep Learning", level: 90 },
      { name: "Neural Networks", level: 85 },
      { name: "Computer Vision", level: 80 },
      { name: "NLP", level: 85 },
    ],
  },
  {
    category: "AI Development",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 90 },
      { name: "LLM Development", level: 85 },
      { name: "AI Model Deployment", level: 80 },
    ],
  },
  {
    category: "Programming",
    skills: [
      { name: "Python", level: 95 },
      { name: "C++", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 75 },
    ],
  },
];

const marqueeItems = [
  "PyTorch", "TensorFlow", "Docker", "Kubernetes", "AWS", "Azure",
  "Hugging Face", "LangChain", "Milvus", "PostgreSQL", "CI/CD", "REST APIs",
  "GraphQL", "MongoDB", "Agile", "MLOps", "GPT", "LLaMA",
];

const Skills = () => {
  const doubledMarquee = [...marqueeItems, ...marqueeItems];

  return (
    <section id="skills" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          index="02 — Expertise"
          title="Tools I build with"
          subtitle="Specialized in cutting-edge AI technologies and production deployment"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="panel p-6 hover:border-accent/20 transition-colors duration-300"
            >
              <h3 className="font-display text-xl font-bold text-accent mb-6">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-white">{skill.name}</span>
                      <span className="font-mono text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-accent to-mint rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
        <div className="overflow-hidden py-4 border-y border-white/[0.06]">
          <div className="marquee-track animate-marquee">
            {doubledMarquee.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="mx-6 font-display text-2xl md:text-3xl font-bold text-white/[0.08] whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
