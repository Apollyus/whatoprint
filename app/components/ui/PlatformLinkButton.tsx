"use client";

import NextImage from "next/image";
import { useTheme } from "../ThemeProvider";

interface PlatformLinkButtonProps {
  name: string;
  url: string;
}

const platformLogosDark: Record<string, string> = {
  "printables": "/icons/dark/printables-logo-dark.svg",
  "thingiverse": "/icons/dark/thingiverse-logo-dark.svg",
  "cults3d": "/icons/dark/cults3d-logo-dark.svg",
  "makerworld": "/icons/dark/makerworld-logo-dark.svg",
  "yeggi": "/icons/dark/yeggi-logo-dark.svg",
  "google": "/icons/dark/google-logo-dark.svg",
};

const platformLogosLight: Record<string, string> = {
  "printables": "/icons/light/printables-logo-light.svg",
  "thingiverse": "/icons/light/thingiverse-logo-light.svg",
  "cults3d": "/icons/light/cults3d-logo-light.svg",
  "makerworld": "/icons/light/makerworld-logo-light.svg",
  "yeggi": "/icons/light/yeggi-logo-light.svg",
  "google": "/icons/light/google-logo-light.svg",
};

export function PlatformLinkButton({ name, url }: PlatformLinkButtonProps) {
  const { theme } = useTheme();
  const normalizedName = name.toLowerCase();
  
  const logoMap = theme === "dark" ? platformLogosDark : platformLogosLight;
  const logoPath = logoMap[normalizedName];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 px-4 py-3 bg-light-black/5 dark:bg-creme-white/10 hover:bg-light-black/10 dark:hover:bg-creme-white/20 border border-light-black/10 dark:border-creme-white/10 rounded-xl transition-all duration-200 group"
    >
      <div className="relative group-hover:opacity-80 transition-opacity">
        {logoPath ? (
          <NextImage 
            src={logoPath}
            alt={`${name} logo`}
            width={120}
            height={32}
            className="object-contain h-8 w-auto"
          />
        ) : (
          <span className="font-semibold text-light-black dark:text-creme-white">{name}</span>
        )}
      </div>
    </a>
  );
}
