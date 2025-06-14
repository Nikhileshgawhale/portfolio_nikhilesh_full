import React from 'react';
import { motion } from 'framer-motion';

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

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-gray-300 text-lg">
            Specialized in cutting-edge AI technologies and development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-blue-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6 text-blue-400">
            Additional Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Docker", "Kubernetes", "AWS", "Azure", "Git",
              "CI/CD", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL",
              "Data Analysis", "Data Visualization", "Agile", "Scrum"
            ].map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 hover:bg-gray-800/70 transition-all"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 