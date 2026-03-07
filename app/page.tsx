"use client";

import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import AboutNeuroEd from "@/src/components/AboutNeuroEd";
import LearningApproach from "@/src/components/LearningApproach";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutNeuroEd />
      <LearningApproach />
    </>
  );
}
