"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/src/utils/useContent";
import contactSettings from "@/content/contact-settings.json";

interface ContactContent {
  heading: string;
  supportingText: string;
  cta: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const inputClass =
  "w-full rounded-xl border border-[var(--color-text)]/15 bg-white px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text)]/40 outline-none transition-shadow focus:shadow-[0_0_0_2px_var(--color-primary)]";

const LINE_GREEN = "#4CC764";
const LINE_GREEN_DARK = "#3db356";

export default function Contact() {
  const content = useContent<ContactContent>("contact");
  const lineUrl = contactSettings.contact.line_url;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() && !form.phone.trim())
      next.contact = "Please provide an email address or phone number.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
      contact: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Send failed");

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">

        {/* Left column */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <motion.h2
              {...fadeUp(0)}
              className="font-headline-en text-3xl font-semibold leading-tight text-[var(--color-text)] md:text-4xl"
            >
              {content.heading}
            </motion.h2>

            <motion.p
              {...fadeUp(0.15)}
              className="font-body-en text-base leading-relaxed text-[var(--color-text)] opacity-75 md:text-lg"
            >
              {content.supportingText}
            </motion.p>
          </div>

          {/* LINE CTA button */}
          <motion.a
            {...fadeUp(0.25)}
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on LINE"
            className="inline-flex items-center self-start gap-[10px] rounded-[12px] px-6 py-[6px] text-base font-semibold text-white"
            style={{ backgroundColor: LINE_GREEN }}
            whileHover={{
              scale: 1.02,
              backgroundColor: LINE_GREEN_DARK,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Image src="/images/line-logo.png" alt="LINE" width={55} height={55} />
            Chat on LINE
          </motion.a>
        </div>

        {/* Right column — form */}
        <motion.div {...fadeUp(0.1)}>
          {submitted ? (
            <div className="flex h-full items-center justify-center rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="font-headline-en text-xl font-semibold text-[var(--color-text)]">
                Your message has been sent. Molly will get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 rounded-2xl bg-white p-8 shadow-sm"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Name <span className="text-[var(--color-accent)]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.name && (
                  <p className="text-xs text-[var(--color-accent)]">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+66 00 000 0000"
                  className={inputClass}
                />
                {errors.contact && (
                  <p className="text-xs text-[var(--color-accent)]">
                    {errors.contact}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Message{" "}
                  <span className="text-[var(--color-accent)]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your child and what you're looking for…"
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="text-xs text-[var(--color-accent)]">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 min-h-[44px] self-start rounded-[10px] px-[26px] py-[14px] text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </button>

              {submitError && (
                <p className="text-sm text-[var(--color-accent)]">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
