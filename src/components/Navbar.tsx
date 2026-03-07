"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/src/context/LanguageContext";
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
  const { language, toggleLanguage } = useLanguage();

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
          className="font-headline-en text-lg font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
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

          <LanguageToggle language={language} onToggle={toggleLanguage} />
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

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
    </>
  );
}

interface LanguageToggleProps {
  language: string;
  onToggle: () => void;
}

function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 text-sm font-medium"
      aria-label="Toggle language"
    >
      <span
        className={
          language === "en"
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-text)]"
        }
      >
        EN
      </span>
      <span className="text-[var(--color-text)]">|</span>
      <span
        className={
          language === "th"
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-text)]"
        }
      >
        TH
      </span>
    </button>
  );
}
