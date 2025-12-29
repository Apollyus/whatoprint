export function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center bg-footer-black text-creme-white py-8 px-6 md:px-12">
      <div className="text-center my-14">
        <a
          href="mailto:faltynekvojtech@gmail.com"
          className="text-xl md:text-4xl underline hover:opacity-80 transition-opacity"
        >
          Tell me your feedback!
        </a>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-screen max-w-[1300px] gap-4 text-sm text-creme-white/80">
        <div className="flex items-center gap-1 text-normal">
          <span>Built with</span>
          <span className="text-red-500">❤️</span>
          <span>by</span>
          <a
            href="https://vojtechfal.cz"
            target="_blank"
            className="underline hover:opacity-80 transition-opacity"
          >
            Vojtěch Faltýnek
          </a>
        </div>

        <div className="text-center">
          <span>Copyright © 2025 All rights reserved</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="hover:opacity-80 transition-opacity"
          >
            Privacy policy
          </a>
          <a
            href="/cookies"
            className="hover:opacity-80 transition-opacity"
          >
            Cookies & GDPR
          </a>
        </div>
      </div>
    </footer>
  );
}
