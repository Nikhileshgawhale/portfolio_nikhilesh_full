import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    year: "2025",
    title: "LLM & Multimodal AI Engineer",
    company: "Outlier",
    description: "Developing and fine-tuning Large Language Models (LLMs) with multimodal capabilities, integrating text, images, audio, and video. Focused on optimizing model performance and enhancing cross-modal understanding.",
  },
  {
    year: "2024",
    title: "Generative AI Intern",
    company: "Midas Advisory",
    description: "Enhanced LLM performance by 25% through fine-tuning and prompt engineering. Developed AI pipeline processing 10,000+ financial records daily, improved retrieval accuracy with Milvus, and integrated Kubernetes for scalability.",
  },
  {
    year: "2023",
    title: "Software Developer",
    company: "GLOBAL Technologies",
    description: "Built ML-powered debt automation system improving response rates by 40%. Developed test automation with predictive analytics reducing defect rate by 50%. Integrated ML into mobile QA workflows boosting efficiency by 45%.",
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          <p className="text-gray-300 text-lg">
            My path in artificial intelligence and machine learning
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all">
                    <span className="text-blue-400 font-semibold">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                    <p className="text-purple-400 mb-2">{item.company}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />

                {/* Empty Space */}
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-blue-400">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all">
              <h4 className="text-xl font-bold text-white mb-2">Master's in Artificial Intelligence</h4>
              <p className="text-purple-400 mb-2">Queen Mary University of London</p>
              <p className="text-gray-300">Grade: Distinction</p>
              <p className="text-blue-400 mt-2">2023 - 2024</p>
              <p className="text-gray-300 mt-2 text-sm">Dissertation: Exploring the Relationship Between Temperature and Creativity in Large Language Models</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all">
              <h4 className="text-xl font-bold text-white mb-2">Bachelor's in Computer Science</h4>
              <p className="text-purple-400 mb-2">Shri Shivaji Science College</p>
              <p className="text-gray-300">GPA: 7.8/10.0</p>
              <p className="text-blue-400 mt-2">2019 - 2022</p>
              <p className="text-gray-300 mt-2 text-sm">Conducted ML workshops and developed AI-driven automation solutions</p>
            </div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-blue-400">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all">
              <h4 className="text-xl font-bold text-white mb-2">The Complete Data Structures and Algorithms Course</h4>
              <p className="text-purple-400 mb-2">Udemy</p>
              <p className="text-blue-400">Issued March 2025</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-all">
              <h4 className="text-xl font-bold text-white mb-2">Pretraining LLMs</h4>
              <p className="text-purple-400 mb-2">DeepLearning.AI</p>
              <p className="text-blue-400">Issued January 2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline; 