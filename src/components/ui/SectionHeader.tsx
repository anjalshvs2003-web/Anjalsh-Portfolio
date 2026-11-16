interface SectionHeaderProps {
  number: string;
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  number,
  tag,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`space-y-4 mb-14 md:mb-20 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
      }`}
    >
      <div
        className={`flex items-center space-x-3 text-xs font-mono uppercase tracking-widest text-accent ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-accent font-bold">{number}</span>
        <span className="text-[#222C3D]">/</span>
        <span className="text-[#F8FAFC] font-medium">{tag}</span>
      </div>

      <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.05]">
        {title}
      </h2>

      {description && (
        <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
