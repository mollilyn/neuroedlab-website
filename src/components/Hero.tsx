"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, type Transition } from "framer-motion";
import { useContent } from "@/src/utils/useContent";
import { useIsDesktop } from "@/src/utils/useIsDesktop";

interface HeroContent {
  headline: string;
  supportingText: string;
  cta: string;
}

const fadeUp = (delay = 0) => {
  const transition: Transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay };
  return { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition };
};

export default function Hero() {
  const hero = useContent<HeroContent>("hero");
  const isDesktop = useIsDesktop();

  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  // Accumulated shift — persists between scroll events without triggering re-renders
  const shiftRef = useRef(0);
  const prevScrollYRef = useRef(0);

  useEffect(() => {
    const parallax = parallaxRef.current;
    const section = sectionRef.current;

    if (!isDesktop) {
      if (parallax) parallax.style.transform = "translateY(0px)";
      return;
    }

    // Sync starting values when effect runs / desktop toggles
    prevScrollYRef.current = window.scrollY;
    shiftRef.current = 0;
    if (parallax) parallax.style.transform = "translateY(0px)";

    let rafId: number;
    let ticking = false;

    const update = () => {
      if (!parallax || !section) return;

      const scrollDelta = window.scrollY - prevScrollYRef.current;
      prevScrollYRef.current = window.scrollY;

      const rect = section.getBoundingClientRect();
      const heroHeight = rect.height;

      // Fraction of hero still in view (1 = fully visible → 0 = fully gone)
      const visibility = Math.max(0, Math.min(1, rect.bottom / heroHeight));

      // Strength fades 0.15 → 0.05 as hero exits (minimum guaranteed at 5%)
      const strength = 0.05 + 0.10 * visibility;

      // Accumulate incrementally — adding (scrollDelta × strength) each frame
      // means scrolling DOWN always increases the shift; scrolling UP decreases it.
      // This prevents the reversal caused by multiplying a growing heroScroll
      // by a shrinking visibility factor.
      shiftRef.current = Math.max(0, shiftRef.current + scrollDelta * strength);

      parallax.style.transform = `translateY(${shiftRef.current}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="flex flex-col items-center px-4 pt-24 pb-0 text-center md:px-9 lg:px-12 lg:pt-[120px]"
      style={{ background: "linear-gradient(180deg, var(--color-background) 0%, var(--color-primary-subtle) 100%)" }}
    >
      {/* Text block */}
      <div className="flex w-full max-w-[900px] flex-col items-center pb-[42px]">
        <motion.p
          {...fadeUp(0)}
          className="font-brand text-3xl font-semibold text-[var(--color-text)] md:text-4xl lg:text-[2.5rem]"
        >
          NeuroEd Lab
        </motion.p>

        <motion.p
          {...fadeUp(0.1)}
          className="font-signature mt-1 text-2xl text-[var(--color-accent)] md:text-3xl lg:text-[2.1rem]"
        >
          by Molly
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className="font-headline-en mt-8 text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl lg:text-[3.3rem]"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text)] opacity-75 md:text-lg"
        >
          {hero.supportingText}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4, scale: { duration: 0.2, ease: "easeOut" } }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: "easeOut" } }}
          href="#contact"
          className="group mt-[25px] inline-block text-[18px] font-medium md:text-[20px] text-[var(--color-text)] underline decoration-[var(--color-primary)] decoration-[1.5px] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:decoration-[var(--color-accent)]"
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
          Mobile:  h-[286px] (260 × 1.10), full viewport width
          Desktop: full viewport width, aspect 21:7.7 (21:7 × 1.10 height) */}
      <motion.div
        {...fadeUp(0.5)}
        className="relative w-screen overflow-hidden h-[286px] md:h-auto md:aspect-[21/7.7]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%)",
        }}
      >
        {/* Parallax wrapper — extends 100px ABOVE the container (top: -100px) so
            that the downward shift has room to move without ever exposing the
            container edge. Image anchors to the bottom so the initial crop shows
            the bottom of the photo; parallax gradually reveals the top. */}
        <div
          ref={parallaxRef}
          className="absolute left-0 right-0 bottom-0"
          style={{ top: "-100px", willChange: "transform" }}
        >
          <Image
            src="/images/hero.jpg"
            alt="NeuroEd Lab hero"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
      </motion.div>

      {/* Sage divider */}
      <div className="w-screen" style={{ height: "2px", backgroundColor: "var(--color-primary)" }} />
    </section>
  );
}
