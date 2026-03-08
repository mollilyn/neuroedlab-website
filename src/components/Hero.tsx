"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/src/utils/useContent";

interface HeroContent {
  headline: string;
  supportingText: string;
  cta: string;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero() {
  const hero = useContent<HeroContent>("hero");

  return (
    <section
      id="hero"
      className="flex flex-col items-center px-4 pt-24 pb-0 text-center md:px-9 lg:px-12 lg:pt-[120px]"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5fbf7 100%)" }}
    >
      {/* Text block — 900px max width */}
      <div className="flex w-full max-w-[900px] flex-col items-center pb-[42px]">
        {/* Brand title */}
        <motion.p
          {...fadeUp(0)}
          className="font-headline-en text-3xl font-semibold text-[var(--color-text)] md:text-4xl lg:text-[2.5rem]"
        >
          NeuroEd Lab
        </motion.p>

        <motion.p
          {...fadeUp(0.1)}
          className="font-signature mt-1 text-2xl text-[var(--color-accent)] md:text-3xl lg:text-[2.1rem]"
        >
          by Molly
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-headline-en mt-8 text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl lg:text-[3.3rem]"
        >
          {hero.headline}
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          {...fadeUp(0.3)}
          className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text)] opacity-75 md:text-lg"
        >
          {hero.supportingText}
        </motion.p>

        {/* CTA — editorial text link with arrow */}
        <motion.a
          {...fadeUp(0.4)}
          href="#contact"
          className="group mt-[25px] inline text-base font-medium text-[var(--color-text)] underline decoration-[var(--color-primary)] decoration-[1.5px] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
        >
          {hero.cta}{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.a>
      </div>

      {/* Hero image
          Mobile:   inset 16px each side, rounded-[16px], 16:9 ratio
          Desktop:  full viewport width breakout, no radius, no shadow, 21:7 ratio */}
      <motion.div
        {...fadeUp(0.5)}
        className="relative w-screen overflow-hidden aspect-[16/9] md:aspect-[21/7]"
      >
        <Image
          src="/images/hero.jpg"
          alt="NeuroEd Lab hero"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>
    </section>
  );
}
