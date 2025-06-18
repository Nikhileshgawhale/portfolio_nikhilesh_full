import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-300 text-lg">
            AI Engineer specializing in Large Language Models and Multimodal AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 transform transition-transform duration-300 group-hover:scale-105">
              <motion.img
                src="/portfolio_nikhilesh_full/profile.jpg"
                alt="Nikhilesh Gawhale"
                className="w-full h-full object-cover rounded-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed">
              I am an AI Engineer with a Master's degree in Artificial Intelligence from Queen Mary University of London, where I graduated with Distinction. My expertise lies in developing and fine-tuning Large Language Models (LLMs) with multimodal capabilities, integrating text, images, audio, and video for diverse applications.
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              Currently working as an LLM & Multimodal AI Engineer at Outlier, I focus on optimizing model performance and enhancing cross-modal understanding. My research interests include exploring the relationship between temperature and creativity in LLMs, as demonstrated in my master's dissertation.
            </p>

            <p className="text-gray-300 leading-relaxed">
              With experience at companies like Midas Advisory and GLOBAL Technologies, I've successfully enhanced LLM performance by 25% through fine-tuning and prompt engineering, developed AI pipelines processing 10,000+ financial records daily, and built ML-powered automation systems improving response rates by 40%.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-blue-400 text-sm hover:bg-gray-800/70 transition-all"
              >
                LLM Development
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-blue-400 text-sm hover:bg-gray-800/70 transition-all"
              >
                Multimodal AI
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-blue-400 text-sm hover:bg-gray-800/70 transition-all"
              >
                MLOps
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-blue-400 text-sm hover:bg-gray-800/70 transition-all"
              >
                Deep Learning
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-blue-400 text-sm hover:bg-gray-800/70 transition-all"
              >
                NLP
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-blue-400 text-sm hover:bg-gray-800/70 transition-all"
              >
                Computer Vision
              </motion.span>
            </div>

            <div className="pt-6">
              <motion.a
                href="https://linkedin.com/in/nikhilesh-gawhale"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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
