"use client"

import { Nav } from "./components/Nav";
import { Heading } from "./components/ui/Heading";
import { GenerateButton } from "./components/ui/GenerateButton";
import { Labels } from "./components/ui/Labels";
import { Footer } from "./components/Footer";
import axios from "axios";
import { useState } from "react";
import Loading from "./components/ui/Loading";
import { ArrowRight } from "lucide-react";

export default function Home() {

  const [idea, setIdea] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    axios.get("http://localhost:3000/api/v1/generate-idea")
      .then((response) => {
        setIdea(response.data);
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
    <div className="flex h-screen flex-col bg-creme-white dark:bg-light-black transition-colors duration-300">
      <Nav />

      <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-6">

        {loading ? <Loading /> : (
          <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2">
            
            <div className={`absolute bottom-full mb-10 w-max max-w-[90vw] md:max-w-[700px] flex flex-col gap-6 animate-fade-in ${idea ? "left-0 items-start" : "left-1/2 -translate-x-1/2 items-center"}`}>
              {idea ? (
                <>
                  <Heading title={idea.payload.name} align="left" />
                  
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-2 text-light-black/60 dark:text-creme-white/60 font-medium text-lg whitespace-nowrap">
                      <span>{idea.payload.print_time_hours}+ hour</span>
                      <span className="hidden md:block">|</span>
                    </div>
                    <Labels labels={idea.payload.labels} />
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-light-black dark:text-creme-white text-2xl hover:translate-x-1 transition-transform cursor-pointer whitespace-nowrap">
                    <span>Search STLs</span>
                    <ArrowRight />
                  </div>
                </>
              ) : (
                  <Heading title="Don't know what to print?" subtitle="Get ideas for 3D printing. For free!" />
              )}
            </div>

            <GenerateButton handleGenerate={handleGenerate} loading={loading} />
            
          </div>
        )}
        
      </main>

      <Footer />
    </div>
  );
}
