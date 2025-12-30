"use client"

import { Nav } from "./components/Nav";
import { Heading } from "./components/ui/Heading";
import { GenerateButton } from "./components/ui/GenerateButton";
import { Footer } from "./components/Footer";
import axios from "axios";
import { useState } from "react";
import Loading from "./components/ui/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handleGenerate = () => {
    setLoading(true);
    axios.get("http://localhost:3000/api/v1/generate-idea")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        {/*setTimeout(() => {
          setLoading(false);
        }, 2000);
        */}
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen flex-col bg-creme-white dark:bg-light-black transition-colors duration-300">
      <Nav />

      <main className="flex h-screen flex-col items-center justify-center gap-10 px-6 py-16">

        {loading ? <Loading /> : (
          <Heading title="Don't know what to print?" subtitle="Get ideas for 3D printing. For free!" />
        )}
        
        <GenerateButton handleGenerate={handleGenerate} loading={loading} />
      </main>

      <Footer />
    </div>
  );
}
