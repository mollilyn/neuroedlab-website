"use client";

import { motion, type Transition } from "framer-motion";
import { useContent } from "@/src/utils/useContent";
import { useIsDesktop } from "@/src/utils/useIsDesktop";

interface Pillar {
  title: string;
  description: string;
}

interface ApproachContent {
  heading: string;
  body: string;
  pillars: Pillar[];
}

export default function LearningApproach() {
  const content = useContent<ApproachContent>("approach");
  const isDesktop = useIsDesktop();

  const fadeUp = (delay = 0) => {
    if (!isDesktop) return {};
    const transition: Transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay };
    return { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition };
  };

  return (
    <section
      id="approach"
      className="pt-10 pb-12 md:py-24 lg:py-[120px]"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-9 lg:px-12">

        {/* Section header */}
        <div className="mb-7 flex flex-col items-center gap-4 text-center md:mb-14">
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
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2 md:gap-8">
          {content.pillars?.map((pillar, index) => (
            <motion.div
              key={index}
              {...fadeUp(0.1 * (index + 1))}
              transition={{
                opacity: { duration: 0.6, delay: 0.1 * (index + 1) },
                y: { duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: 0.1 * (index + 1) },
                boxShadow: { duration: 0, delay: 0 },
              }}
              className="rounded-[12px] border bg-white px-5 py-[8px] md:p-7"
              style={{ borderColor: "var(--color-primary)" }}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 24px rgba(var(--color-primary-rgb), 0.35)",
                transition: {
                  y: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  boxShadow: { duration: 0 },
                },
              }}
              whileTap={{
                y: -3,
                boxShadow: "0 8px 24px rgba(var(--color-primary-rgb), 0.35)",
                transition: {
                  y: { duration: 0.05 },
                  boxShadow: { duration: 0 },
                },
              }}
            >
              <h3 className="font-headline-en mb-[7px] text-xl font-semibold text-[var(--color-text)] md:mb-3">
                {pillar.title}
              </h3>
              <p className="font-body-en text-base leading-[1.31] text-[var(--color-text)] opacity-75 md:leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
