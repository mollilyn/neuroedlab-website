"use client";

import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  language: string;
  onToggleLanguage: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  language,
  onToggleLanguage,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.nav
            className="fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-white px-8 py-8 shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="mb-10 self-end text-2xl leading-none text-[var(--color-text)] hover:text-[var(--color-accent)]"
            >
              ✕
            </button>

            {/* Nav links */}
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="text-lg text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Language toggle */}
            <button
              onClick={onToggleLanguage}
              className="mt-10 flex items-center gap-1 self-start text-sm font-medium"
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
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
