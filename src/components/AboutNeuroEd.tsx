"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/src/utils/useContent";

interface NeuroEdContent {
  heading: string;
  body: string;
  tagline: string;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export default function AboutNeuroEd() {
  const content = useContent<NeuroEdContent>("neuroedlab");

  return (
    <section
      id="neuroedlab"
      className="pt-10 pb-0 md:py-24 lg:py-[120px]"
      style={{ backgroundColor: "var(--color-alt-background)" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:gap-16 md:px-9 lg:px-12">

        {/* Text content */}
        <div className="flex flex-col gap-6">
          <motion.h2
            {...fadeUp(0)}
            className="font-headline-en text-3xl font-semibold leading-tight text-[var(--color-text)] md:text-4xl"
          >
            {content.heading}
          </motion.h2>

          <div className="flex flex-col gap-4">
            {(content.body || "").split("\n\n").map((paragraph, i) => (
              <motion.p
                key={i}
                {...fadeUp(0.15 + i * 0.05)}
                className="font-body-en text-base leading-relaxed text-[var(--color-text)] opacity-80 md:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.p
            {...fadeUp(0.3)}
            className="font-signature text-xl text-[var(--color-accent)] md:text-2xl"
          >
            {content.tagline}
          </motion.p>
        </div>

        {/* Image — full-width divider on mobile, contained card on desktop */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative -mx-4 w-screen h-[283px] overflow-hidden rounded-none md:mx-0 md:w-full md:h-auto md:aspect-[4/3] md:rounded-[24px]"
        >
          <Image
            src="/images/neuroedlab.jpg"
            alt="About NeuroEd Lab"
            fill
            className="object-cover object-center"
          />
        </motion.div>

      </div>
    </section>
  );
}
