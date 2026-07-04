import React from "react";
import BackgroundEffects from "./components/BackgroundEffects";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Documents from "./components/Documents";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <BackgroundEffects />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Documents />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
