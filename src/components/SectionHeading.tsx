import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  title,
  subtitle,
  align = "left",
}) => {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`mb-14 md:mb-20 ${isCenter ? "text-center" : "text-left"}`}
    >
      <span className="font-mono text-xs tracking-[0.35em] text-accent uppercase">
        {index}
      </span>
      <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold text-white leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg text-muted max-w-2xl ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
