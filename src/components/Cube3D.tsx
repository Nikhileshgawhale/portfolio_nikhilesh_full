import React from "react";
import { motion } from "framer-motion";

const Cube3D = () => {
  const faces = [
    { transform: "rotateY(0deg) translateZ(60px)", label: "AI" },
    { transform: "rotateY(90deg) translateZ(60px)", label: "ML" },
    { transform: "rotateY(180deg) translateZ(60px)", label: "LLM" },
    { transform: "rotateY(-90deg) translateZ(60px)", label: "CV" },
    { transform: "rotateX(90deg) translateZ(60px)", label: "NLP" },
    { transform: "rotateX(-90deg) translateZ(60px)", label: "NG" },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-[320px] md:h-[420px]">
      <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-accent/20 blur-[80px]" />
      <motion.div
        className="cube-scene"
        animate={{ rotateX: [20, 25, 20], rotateY: [0, 360] }}
        transition={{
          rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="cube">
          {faces.map((face) => (
            <div
              key={face.label}
              className="cube-face"
              style={{ transform: face.transform }}
            >
              <span>{face.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cube3D;
