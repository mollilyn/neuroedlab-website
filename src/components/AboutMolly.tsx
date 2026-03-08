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
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function AboutMolly() {
  const content = useContent<MollyContent>("molly");

  return (
    <section
      id="molly"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-alt-background)" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

        {/* Image – left on desktop, top on mobile */}
        <motion.div
          {...fadeUp(0.1)}
          className="relative w-full overflow-hidden rounded-[24px]"
          style={{ aspectRatio: "4 / 3" }}
        >
          <Image
            src="/images/molly-portrait.jpg"
            alt="Molly"
            fill
            className="object-cover"
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
