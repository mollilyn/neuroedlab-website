"use client";

import { motion } from "framer-motion";
import { useContent } from "@/src/utils/useContent";

interface Pillar {
  title: string;
  description: string;
}

interface ApproachContent {
  heading: string;
  body: string;
  pillars: Pillar[];
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function LearningApproach() {
  const content = useContent<ApproachContent>("approach");

  return (
    <section
      id="approach"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-[1200px]">

        {/* Section header */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <motion.h2
            {...fadeUp(0)}
            className="font-headline-en text-3xl font-semibold leading-tight text-[var(--color-text)] md:text-4xl"
          >
            {content.heading}
          </motion.h2>

          <motion.p
            {...fadeUp(0.15)}
            className="font-body-en max-w-2xl text-base leading-relaxed text-[var(--color-text)] opacity-75 md:text-lg"
          >
            {content.body}
          </motion.p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.pillars?.map((pillar, index) => (
            <motion.div
              key={index}
              {...fadeUp(0.1 * (index + 1))}
              className="group rounded-2xl border border-[var(--color-text)]/10 bg-white p-7 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <h3 className="font-headline-en mb-3 text-xl font-semibold text-[var(--color-text)]">
                {pillar.title}
              </h3>
              <p className="font-body-en text-base leading-relaxed text-[var(--color-text)] opacity-75">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
