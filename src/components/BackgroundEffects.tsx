import React from "react";

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-mint/8 blur-[100px]" />
      <div className="absolute inset-0 grain" />
    </div>
  );
};

export default BackgroundEffects;
