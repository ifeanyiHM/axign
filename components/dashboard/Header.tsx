import { User } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { LucideIcon, Plus } from "lucide-react";

interface HeaderProps {
  user?: User | null;
  title: string;
  subtitle: string;
  buttonTitle?: string;
  icon?: LucideIcon;
}

export default function Header({
  user,
  title,
  subtitle,
  buttonTitle,
}: HeaderProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <header
      className={` ${!user ? "py-2 sm:py-2" : "border-b py-4 sm:py-5"} ${colors.border} flex justify-between items-center mb-4 sm:mb-6`}
    >
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-gray-400 text-sm">
          {subtitle} {user?.username}
        </p>
      </div>
      {buttonTitle && (
        <button
          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium flex items-center gap-2 text-sm ${colors.button}`}
        >
          <Plus size={18} /> {buttonTitle}
        </button>
      )}
    </header>
  );
}
