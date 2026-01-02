import { Image } from "lucide-react";

interface PlatformLinkButtonProps {
  name: string;
  url: string;
}

export function PlatformLinkButton({ name, url }: PlatformLinkButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 bg-light-black/5 dark:bg-creme-white/10 hover:bg-light-black/10 dark:hover:bg-creme-white/20 border border-light-black/10 dark:border-creme-white/10 rounded-xl transition-all duration-200 group"
    >
      <Image className="w-5 h-5 text-light-black dark:text-creme-white opacity-70 group-hover:opacity-100 transition-opacity" />
      <span className="font-medium text-light-black dark:text-creme-white capitalize">
        {name}
      </span>
    </a>
  );
}
