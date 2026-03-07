"use client";

import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import AboutNeuroEd from "@/src/components/AboutNeuroEd";
import LearningApproach from "@/src/components/LearningApproach";
import AboutMolly from "@/src/components/AboutMolly";
import Testimonials from "@/src/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutNeuroEd />
      <LearningApproach />
      <AboutMolly />
      <Testimonials />
    </>
  );
}
