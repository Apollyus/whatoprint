interface HeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function Heading({
  title,
  subtitle,
  align = "center",
}: HeadingProps) {
  return (
    <div className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"} gap-8`}>
      <h1 className="text-[40px] md:text-[50px] lg:text-[70px] font- text-light-black dark:text-creme-white leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-[30px] text-light-black/60 dark:text-creme-white/60 max-w-[600px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
