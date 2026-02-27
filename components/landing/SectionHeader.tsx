type SectionHeaderProps = {
  badge?: string; // e.g. "Documentation"
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  badge = "Documentation",
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      {badge && (
        <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
          {badge}
        </p>
      )}

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
        {title}
      </h1>

      {description && (
        <p className="mt-3 text-gray-600 max-w-2xl">{description}</p>
      )}
    </div>
  );
}
