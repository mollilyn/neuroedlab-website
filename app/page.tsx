"use client";

import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import AboutNeuroEd from "@/src/components/AboutNeuroEd";
import LearningApproach from "@/src/components/LearningApproach";
import AboutMolly from "@/src/components/AboutMolly";
import Testimonials from "@/src/components/Testimonials";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import FloatingLineButton from "@/src/components/FloatingLineButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutNeuroEd />
      <LearningApproach />
      <AboutMolly />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingLineButton />
    </>
  );
}
