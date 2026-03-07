"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/src/utils/useContent";

interface Testimonial {
  quote: string;
}

const AUTO_INTERVAL = 6000;
const PAUSE_DURATION = 8000;
const SLIDE_WIDTH = 720;
const SLIDE_GAP = 120;
const SLIDE_STEP = SLIDE_WIDTH + SLIDE_GAP;

export default function Testimonials() {
  const testimonials = useContent<Testimonial[]>("testimonials");
  const items: Testimonial[] = Array.isArray(testimonials) ? testimonials : [];
  const total = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const pauseBriefly = useCallback(() => {
    isPaused.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      isPaused.current = false;
    }, PAUSE_DURATION);
  }, []);

  const handleNext = useCallback(() => {
    pauseBriefly();
    setActiveIndex((prev) => (prev + 1) % total);
  }, [pauseBriefly, total]);

  const handlePrev = useCallback(() => {
    pauseBriefly();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [pauseBriefly, total]);

  useEffect(() => {
    if (total === 0) return;
    autoTimer.current = setInterval(() => {
      if (!isPaused.current) {
        setActiveIndex((prev) => (prev + 1) % total);
      }
    }, AUTO_INTERVAL);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [total]);

  if (total === 0) return null;

  return (
    <section
      id="testimonials"
      className="py-24"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-headline-en mb-16 text-center text-3xl font-semibold text-[var(--color-text)] md:text-4xl"
      >
        Testimonials
      </motion.h2>

      {/* Carousel */}
      <div className="relative flex items-center justify-center">

        {/* Left arrow — desktop only */}
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="absolute left-3 z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg sm:flex md:left-8"
          style={{ color: "var(--color-text)" }}
        >
          <span className="select-none text-2xl leading-none">‹</span>
        </button>

        {/* Slide stage — overflow hidden clips neighbours */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(200px, 30vw, 280px)" }}
        >
          {items.map((testimonial, slideIndex) => {
            let offset = slideIndex - activeIndex;

            // Normalize for infinite looping
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const isNeighbour = offset === -1 || offset === 1;

            return (
              <motion.div
                key={slideIndex}
                // On mobile hide neighbours so only active is shown.
                // On sm+ they peek in from the edges as intended.
                className={`absolute top-0 flex h-full items-center justify-center text-center ${
                  isActive ? "" : "hidden sm:flex"
                }`}
                style={{
                  width: `min(${SLIDE_WIDTH}px, 90vw)`,
                  left: `calc(50% - min(${SLIDE_WIDTH}px, 90vw) / 2)`,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                animate={{
                  x: offset * SLIDE_STEP,
                  opacity: isActive ? 1 : isNeighbour ? 0.35 : 0,
                  scale: isActive ? 1 : isNeighbour ? 0.9 : 0.85,
                }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <p className="font-body-en text-xl leading-relaxed text-[var(--color-text)] md:text-2xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right arrow — desktop only */}
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="absolute right-3 z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg sm:flex md:right-8"
          style={{ color: "var(--color-text)" }}
        >
          <span className="select-none text-2xl leading-none">›</span>
        </button>
      </div>

      {/* Pagination row — dots always visible, arrows visible on mobile only */}
      <div className="mt-10 flex items-center justify-center gap-6">

        {/* Prev arrow — mobile only */}
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg sm:hidden"
          style={{ color: "var(--color-text)" }}
        >
          <span className="select-none text-2xl leading-none">‹</span>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                pauseBriefly();
                setActiveIndex(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "24px" : "8px",
                backgroundColor:
                  i === activeIndex ? "var(--color-accent)" : "var(--color-text)",
                opacity: i === activeIndex ? 1 : 0.25,
              }}
            />
          ))}
        </div>

        {/* Next arrow — mobile only */}
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg sm:hidden"
          style={{ color: "var(--color-text)" }}
        >
          <span className="select-none text-2xl leading-none">›</span>
        </button>

      </div>
    </section>
  );
}
