import Navbar from "@/src/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <main className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold">NeuroEd Lab Website</h1>
          <p className="text-base">Development Build</p>
        </main>
      </div>
    </>
  );
}
