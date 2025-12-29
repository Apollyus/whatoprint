"use client";

import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "mailto:faltynekvojtech@gmail.com", label: "Feedback" },
  { href: "https://github.com/Apollyus/whatoprint", label: "GitHub", external: true },
];

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 md:px-12 dark:bg-nav-black md:dark:bg-transparent">
      <div className="flex items-center justify-end gap-10">
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-light-black dark:text-creme-white hover:opacity-70 transition-opacity text-base font-medium"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-light-black dark:bg-creme-white transition-transform" />
          <span className="w-6 h-0.5 bg-light-black dark:bg-creme-white transition-opacity" />
          <span className="w-6 h-0.5 bg-light-black dark:bg-creme-white transition-transform" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 dark:bg-nav-black bg-creme-white p-6 shadow-lg z-50">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-light-black dark:text-creme-white hover:opacity-70 transition-opacity text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-light-black/10 dark:border-creme-white/10">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
