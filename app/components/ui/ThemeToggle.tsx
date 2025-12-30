"use client";

import { useTheme } from "../ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 p-1 rounded-full transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <div className="relative w-14 h-8 bg-light-black dark:bg-creme-white rounded-full transition-colors">
        <div
          className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ${
            theme === "dark"
              ? "left-1 bg-light-black"
              : "left-7 bg-creme-white"
          }`}
        />
      </div>
      <svg
        className="w-6 h-6 text-light-black dark:text-creme-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {theme === "dark" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        )}
      </svg>
    </button>
  );
}
