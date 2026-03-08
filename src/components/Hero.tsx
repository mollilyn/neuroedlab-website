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
      className="flex min-h-[85vh] flex-col items-center justify-center px-4 pt-24 pb-10 text-center md:px-9 md:pb-24 lg:px-12 lg:pt-[120px] lg:pb-[120px]"
    >
      {/* Text block — constrained to 820px readable width */}
      <div className="flex w-full max-w-[1248px] flex-col items-center">
        {/* Brand title */}
        <motion.p
          {...fadeUp(0)}
          className="font-headline-en text-3xl font-semibold text-[var(--color-text)] md:text-4xl"
        >
          NeuroEd Lab
        </motion.p>

        <motion.p
          {...fadeUp(0.1)}
          className="font-signature mt-1 text-2xl text-[var(--color-accent)] md:text-3xl"
        >
          by Molly
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-headline-en mt-8 text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl"
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
      </div>

      {/* Hero image */}
      <motion.div
        {...fadeUp(0.4)}
        className="relative mt-10 w-full max-w-[720px] overflow-hidden rounded-[28px]"
        style={{ aspectRatio: "4 / 3" }}
      >
        <Image
          src="/images/hero.jpg"
          alt="NeuroEd Lab hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* CTA button */}
      <motion.a
        {...fadeUp(0.5)}
        href="#contact"
        className="mt-10 inline-block rounded-[10px] px-[26px] py-[14px] text-base font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        {hero.cta}
      </motion.a>
    </section>
  );
}
