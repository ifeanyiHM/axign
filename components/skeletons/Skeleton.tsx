import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export default function Skeleton({
  className = "",
  variant = "default",
  width,
  height,
  animation = "pulse",
  ...props
}: SkeletonProps) {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const colors = themes[theme];

  const baseClasses = theme === "light" ? "bg-gray-200" : "bg-gray-700/50";

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      {...props}
    />
  );
}
