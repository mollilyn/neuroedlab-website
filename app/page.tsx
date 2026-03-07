"use client";

import Navbar from "@/src/components/Navbar";
import { useContent } from "@/src/utils/useContent";

export default function Home() {
  const hero = useContent<{ headline: string; supportingText: string; cta: string }>("hero");

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <main className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold">{hero.headline}</h1>
          <p className="text-base">Development Build</p>
        </main>
      </div>
    </>
  );
}
