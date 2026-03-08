export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 text-center md:px-12"
      style={{ backgroundColor: "#F0EEE9", paddingTop: 14, paddingBottom: 14 }}
    >
      <div className="mx-auto max-w-[1200px] flex flex-col items-center" style={{ gap: 5 }}>

        <p className="font-headline-en text-xl font-semibold text-[var(--color-text)]">
          NeuroEd Lab
        </p>

        <p className="font-body-en text-base leading-relaxed text-[var(--color-text)] opacity-70">
          Personalised learning studio based in Bangkok.
        </p>

        <p className="font-body-en text-sm text-[var(--color-text)] opacity-40">
          &copy; {year} NeuroEd Lab
        </p>

      </div>
    </footer>
  );
}
