"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import contactSettings from "@/content/contact-settings.json";

export default function FloatingLineButton() {
  const lineUrl = contactSettings.contact.line_url;

  return (
    <motion.a
      href={lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on LINE"
      className="fixed z-[1000]"
      style={{
        right: 24,
        bottom: 24,
        display: "block",
        lineHeight: 0,
        filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))",
      }}
      whileHover={{
        scale: 1.06,
        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.25))",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src="/images/line-logo.png"
        alt="Chat on LINE"
        width={60}
        height={60}
        style={{ display: "block" }}
      />
    </motion.a>
  );
}
