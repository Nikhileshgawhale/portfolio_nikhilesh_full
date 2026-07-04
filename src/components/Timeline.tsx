import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const timelineData = [
  {
    period: "Jan 2025 – Apr 2026",
    title: "AI / Backend Engineer",
    company: "RP-Tech International Solutions",
    location: "Remote · Investment Banking Technology",
    description:
      "Shipped production AI products powered by Anthropic Claude — a contract-review platform with agentic workflows, document intelligence and human-in-the-loop oversight. Owned features end-to-end from design through deployment, monitoring and iteration.",
  },
  {
    period: "Aug 2024 – Dec 2024",
    title: "Generative AI / Backend Engineer",
    company: "Midas Advisory",
    location: "London, UK",
    description:
      "Built Python/FastAPI backend services and REST APIs powering production LLM features — RAG pipelines, retrieval and grounded answering — with PostgreSQL data modelling, Docker deployment and GitHub Actions CI/CD.",
  },
  {
    period: "Aug 2022 – Sep 2023",
    title: "Software Developer",
    company: "Global Technologies",
    location: "Pune, India",
    description:
      "Delivered production-grade Python backend services with REST API integrations and a PostgreSQL data layer. Designed predictive monitoring and anomaly-detection pipelines, improving operational reliability by 45%.",
  },
];

const education = [
  {
    degree: "MSc Artificial Intelligence",
    school: "Queen Mary University of London, UK",
    detail: "Distinction · Sep 2023 – Sep 2024",
    note: "Deep Learning (90%), ML Algorithms (89%), Bayesian Neural Networks (88%), NLP (85%)",
  },
  {
    degree: "BCA — Bachelor of Computer Applications",
    school: "Shivaji Science College, Amravati, India",
    detail: "GPA 7.8/10 · Aug 2019 – Aug 2022",
    note: "Computer applications & software development foundations",
  },
];

const certifications = [
  { name: "Complete Data Structures & Algorithms", org: "Udemy", date: "Mar 2025" },
  { name: "Pretraining LLMs", org: "DeepLearning.AI", date: "Jan 2025" },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          index="04 — Journey"
          title="Experience & education"
          subtitle="My path in artificial intelligence and machine learning"
        />

        <div className="relative max-w-3xl">
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-accent via-white/10 to-mint" />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.period + item.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12"
              >
                <div
                  className={`md:text-right ${
                    index % 2 === 0 ? "md:col-start-1" : "md:col-start-2 md:text-left"
                  }`}
                >
                  <span className="font-mono text-sm text-accent">{item.period}</span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {item.title}
                  </h3>
                  <p className="text-mint text-sm font-medium">{item.company}</p>
                  <p className="text-muted/80 text-xs mt-1">{item.location}</p>
                  <p className="text-muted text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-surface border-2 border-accent" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-6">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="panel p-6 lg:p-8"
            >
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Education
              </span>
              <h4 className="font-display text-xl font-bold text-white mt-3">
                {item.degree}
              </h4>
              <p className="text-mint text-sm mt-1">{item.school}</p>
              <p className="text-muted text-sm mt-2">{item.detail}</p>
              <p className="text-muted/80 text-xs mt-3">{item.note}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="panel p-6 border-dashed"
            >
              <span className="font-mono text-xs text-muted tracking-widest uppercase">
                Certification
              </span>
              <h4 className="font-semibold text-white mt-3">{cert.name}</h4>
              <p className="text-sm text-muted mt-1">
                {cert.org} · {cert.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
