"use client";

interface GenerateButtonProps {
  handleGenerate: () => void;
  loading: boolean;
}

export function GenerateButton({ handleGenerate, loading }: GenerateButtonProps) {
  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className={`px-20 py-4 md:px-52 md:py-6 bg-light-black dark:bg-creme-white text-creme-white dark:text-light-black rounded-[20px] text-lg md:text-xl font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-100 whitespace-nowrap ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "Generating..." : "Generate idea!"}
    </button>
  );
}
