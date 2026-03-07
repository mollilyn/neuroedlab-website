"use client";

import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "NeuroEd Lab", href: "#neuroedlab" },
  { label: "Approach", href: "#approach" },
  { label: "Molly", href: "#molly" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{ height: "72px" }}
        className={`fixed left-0 right-0 top-0 z-30 flex items-center px-6 transition-all duration-300 md:px-12 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-headline-en text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
        >
          NeuroEd Lab
        </a>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              {link.label}
            </a>
          ))}

          {/* Language toggle */}
          <span className="text-sm font-medium text-[var(--color-text)]">
            EN / TH
          </span>
        </nav>

        {/* Hamburger – mobile only */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="ml-auto flex flex-col gap-1.5 md:hidden"
        >
          <span className="block h-0.5 w-6 bg-[var(--color-text)]" />
          <span className="block h-0.5 w-6 bg-[var(--color-text)]" />
          <span className="block h-0.5 w-6 bg-[var(--color-text)]" />
        </button>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
