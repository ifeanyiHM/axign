import Link from "next/link";
import { ElementType } from "react";

type BaseProps = {
  icon?: ElementType;
  label: string;
  value: string;
  valueClassName?: string;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
};

type DivProps = BaseProps & {
  href?: undefined;
};

type InfoRowProps = LinkProps | DivProps;

export const InfoRow = ({
  icon: Icon,
  label,
  value,
  valueClassName = "",
  className = "",
  href,
}: InfoRowProps) => {
  const Content = (
    <>
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
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`flex items-start gap-3 transition hover:opacity-80 ${className}`}
      >
        {Content}
      </Link>
    );
  }

  return <div className={`flex items-start gap-3 ${className}`}>{Content}</div>;
};
