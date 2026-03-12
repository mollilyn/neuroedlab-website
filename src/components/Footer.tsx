export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative px-6 text-center md:px-12"
      style={{ backgroundColor: "var(--color-alt-background)", paddingTop: 8, paddingBottom: 8 }}
    >
      <div className="mx-auto max-w-[1200px] flex flex-col items-center" style={{ gap: 2 }}>

        <p className="font-headline-en text-xl font-semibold text-[var(--color-text)]">
          NeuroEd Lab
        </p>

        <p className="font-body-en text-base leading-tight text-[var(--color-text)] opacity-70">
          Personalised learning studio based in Bangkok.
        </p>

        <p className="font-body-en text-sm text-[var(--color-text)] opacity-40">
          &copy; {year} NeuroEd Lab
        </p>

      </div>

      {/* Website by JR signature — desktop only, anchored to footer left edge */}
      <a
        href="https://www.linkedin.com/in/jack-rowson/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Website by Jack Rowson"
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block opacity-60 hover:opacity-100 transition-opacity duration-200"
      >
        <img
          src="/images/website-by-jr.png"
          alt="Website by JR"
          style={{ height: "72px", width: "auto" }}
        />
      </a>

    </footer>
  );
}
