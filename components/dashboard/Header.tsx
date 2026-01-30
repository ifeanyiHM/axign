import { User } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Plus } from "lucide-react";

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <header
      className={`p-4 sm:px-6 sm:py-5 border-b ${colors.border} flex justify-between items-center`}
    >
      <div>
        <h1 className="text-xl font-bold">My Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back, {user?.username}</p>
      </div>
      {user?.userStatus.toLocaleLowerCase() === "ceo" && (
        <button
          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium flex items-center gap-2 text-sm ${colors.button}`}
        >
          <Plus size={18} /> Create Task
        </button>
      )}
    </header>
  );
}
