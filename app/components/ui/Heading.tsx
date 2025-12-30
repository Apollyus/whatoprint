interface HeadingProps {
  title: string;
  subtitle?: string;
}

export function Heading({
  title,
  subtitle,
}: HeadingProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 px-4">
      <h1 className="text-[40px] md:text-[50px] lg:text-[70px] font-bold text-light-black dark:text-creme-white leading-tight">
        {title}
      </h1>
      <p className="text-lg md:text-[30px] text-light-black/60 dark:text-creme-white/60 max-w-[600px]">
        {subtitle}
      </p>
    </div>
  );
}
