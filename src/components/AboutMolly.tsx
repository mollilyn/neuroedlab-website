"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/src/utils/useContent";

interface MollyContent {
  heading: string;
  body: string;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

export default function AboutMolly() {
  const content = useContent<MollyContent>("molly");

  return (
    <section
      id="molly"
      className="pt-0 pb-12 md:py-24 lg:py-[120px]"
      style={{ backgroundColor: "var(--color-alt-background)" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-6 px-4 md:grid-cols-2 md:gap-16 md:px-9 lg:px-12">

        {/* Image — full-width divider on mobile (top of section), contained card on desktop */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative -mx-4 w-screen h-[283px] overflow-hidden rounded-none md:mx-0 md:w-full md:h-auto md:aspect-[4/3] md:rounded-[24px]"
        >
          <Image
            src="/images/molly-portrait.jpg"
            alt="Molly"
            fill
            className="object-cover object-center"
          />
        </motion.div>

        {/* Text content – right on desktop, bottom on mobile */}
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
        </div>

      </div>
    </section>
  );
}
