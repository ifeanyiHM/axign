import { User } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { LucideIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  user?: User | null;
  title: string;
  subtitle: string;
  buttonTitle?: string;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
}

export default function Header({
  user,
  title,
  subtitle,
  buttonTitle,
  className,
  onClick,
}: HeaderProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <header
      className={`${className} ${colors.border} flex justify-between items-center mb-4 sm:mb-6`}
    >
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-gray-400 text-sm">
          {subtitle} {user?.username}
        </p>
      </div>
      {buttonTitle && (
        <Button
          onClick={onClick}
          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium flex items-center gap-2 text-sm cursor-pointer ${colors.button}`}
        >
          <Plus size={18} /> {buttonTitle}
        </Button>
      )}
    </header>
  );
}
