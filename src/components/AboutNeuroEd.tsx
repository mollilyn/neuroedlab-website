"use client";

import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import { useContent } from "@/src/utils/useContent";

interface NeuroEdContent {
  heading: string;
  body: string;
  tagline: string;
}

const fadeUp = (delay = 0) => {
  const transition: Transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay };
  return { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition };
};

export default function AboutNeuroEd() {
  const content = useContent<NeuroEdContent>("neuroedlab");

  return (
    <section
      id="neuroedlab"
      className="pt-10 pb-0 md:pt-0 md:pb-0"
      style={{ backgroundColor: "var(--color-alt-background)" }}
    >
      {/*
        Mobile:  stacked container — text then full-width image
        Desktop: full-viewport-width two-column grid — text left | image right
      */}
      <div className="
        mx-auto max-w-[1200px] px-4 grid grid-cols-1 gap-8 items-center
        md:max-w-none md:mx-0 md:px-0 md:grid-cols-[50%_50%] md:gap-0 md:items-stretch
      ">

        {/* Text column — padded on desktop, content capped at 640px */}
        <div className="
          flex items-center justify-end
          md:px-[45px] md:py-[80px]
          lg:px-[39px] lg:py-[100px]
        ">
          <div className="flex w-full max-w-[640px] flex-col gap-6">
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
        </div>

        {/* Image — full-width divider on mobile | full-height side image on desktop */}
        <motion.div
          {...fadeUp(0.2)}
          className="
            relative -mx-4 w-screen h-[283px] overflow-hidden rounded-none
            md:mx-0 md:w-full md:h-full md:rounded-none
          "
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
