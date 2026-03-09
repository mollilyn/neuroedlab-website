"use client";

import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import { useContent } from "@/src/utils/useContent";
import { useIsDesktop } from "@/src/utils/useIsDesktop";

interface MollyContent {
  heading: string;
  body: string;
}

export default function AboutMolly() {
  const content = useContent<MollyContent>("molly");
  const isDesktop = useIsDesktop();

  const fadeUp = (delay = 0) => {
    if (!isDesktop) return {};
    const transition: Transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay };
    return { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition };
  };

  return (
    <section
      id="molly"
      className="pt-0 pb-12 md:pt-0 md:pb-0"
      style={{ backgroundColor: "var(--color-alt-background)" }}
    >
      {/*
        Mobile:  stacked container — full-width image then text
        Desktop: full-viewport-width two-column grid — image left | text right
      */}
      <div className="
        mx-auto max-w-[1200px] px-4 grid grid-cols-1 gap-6 items-center
        md:max-w-none md:mx-0 md:px-0 md:grid-cols-[50%_50%] md:gap-0 md:items-stretch
      ">

        {/* Image — full-width divider on mobile (top) | full-height side image on desktop (left) */}
        <motion.div
          {...fadeUp(0.1)}
          className="
            relative -mx-4 w-screen h-[283px] overflow-hidden rounded-none
            md:mx-0 md:w-full md:h-full md:rounded-none
          "
        >
          <Image
            src="/images/molly-portrait.jpg"
            alt="Molly"
            fill
            className="object-cover object-center"
          />
        </motion.div>

        {/* Text column — padded on desktop, content capped at 640px */}
        <div className="
          flex items-center justify-start
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
          </div>
        </div>

      </div>
    </section>
  );
}
