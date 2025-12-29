"use client"

import { Nav } from "./components/Nav";
import { Heading } from "./components/Heading";
import { GenerateButton } from "./components/GenerateButton";
import { Footer } from "./components/Footer";

export default function Home() {
  const handleGenerate = () => {
    console.log("Generate button clicked!");
    // Logic will be added later
  };

  return (
    <div className="flex min-h-screen flex-col bg-creme-white dark:bg-light-black transition-colors duration-300">
      <Nav />

      <main className="flex h-screen flex-col items-center justify-center gap-10 px-6 py-16">
        <Heading title="Don't know what to print?" subtitle="Get ideas for 3D printing. For free!" />
        <GenerateButton handleGenerate={handleGenerate} />
      </main>

      <Footer />
    </div>
  );
}
