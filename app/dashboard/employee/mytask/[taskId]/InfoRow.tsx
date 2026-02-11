type InfoRowProps = {
  icon?: React.ElementType;
  label: string;
  value: string;
  valueClassName?: string;
};

export const InfoRow = ({
  icon: Icon,
  label,
  value,
  valueClassName = "",
}: InfoRowProps) => (
  <div className="flex items-start gap-3">
    {Icon && (
      <div className="mt-0.5">
        <Icon size={16} className="opacity-70" />
      </div>
    )}
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={`text-sm font-medium ${valueClassName}`}>{value}</p>
    </div>
  </div>
);
