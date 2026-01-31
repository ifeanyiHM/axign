import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { Check, Moon, Sun, Waves } from "lucide-react";
import Header from "./Header";

export default function DashboardSettings() {
  const { theme, setTheme } = useTheme();
  const colors = themes[theme];

  const themeOptions = [
    {
      id: "dark" as const,
      name: "Dark Mode",
      description: "Dark theme for comfortable viewing",
      icon: Moon,
      preview: "bg-gradient-to-br from-gray-900 to-gray-950",
    },
    {
      id: "light" as const,
      name: "Light Mode",
      description: "Bright and clean interface",
      icon: Sun,
      preview: "bg-gradient-to-br from-gray-50 to-white",
    },
    {
      id: "blue" as const,
      name: "Blue Mode",
      description: "Ocean blue themed interface",
      icon: Waves,
      preview: "bg-gradient-to-br from-blue-900 to-blue-950",
    },
  ];
  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-6 sm:p-8">
        {/* Header */}

        <Header
          title="Settings"
          subtitle="Customize your dashboard appearance and preferences"
        />

        {/* Theme Selection */}
        <div
          className={`${colors.bgCard} rounded-xl p-6 ${colors.border} border`}
        >
          <h2 className="text-xl font-semibold mb-2">Theme</h2>
          <p className={`${colors.textMuted} text-sm mb-6`}>
            Choose your preferred dashboard theme
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setTheme(option.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isActive
                      ? "border-blue-500 bg-blue-500/10"
                      : `${colors.border} ${colors.hover}`
                  }`}
                >
                  {/* Preview */}
                  <div
                    className={`w-full h-24 rounded-md mb-4 ${option.preview} flex items-center justify-center`}
                  >
                    <Icon
                      size={32}
                      className={
                        option.id === "light"
                          ? "text-gray-700"
                          : "text-gray-200"
                      }
                    />
                  </div>

                  {/* Details */}
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{option.name}</h3>
                      {isActive && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>
                    <p className={`text-xs ${colors.textMuted}`}>
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Section */}
        <div
          className={`${colors.bgCard} rounded-xl p-6 ${colors.border} border mt-6`}
        >
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="space-y-4">
            {/* Preview Card */}
            <div className={`p-4 rounded-lg ${colors.border} border`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Sample Card</h3>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs">
                  Active
                </span>
              </div>
              <p className={colors.textMuted}>
                This is how your cards will look with the selected theme.
              </p>
            </div>

            {/* Preview Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg ${colors.stats.green} border ${colors.border}`}
              >
                <p className="text-xs mb-1">Completed</p>
                <p className="text-2xl font-bold">184</p>
              </div>
              <div
                className={`p-4 rounded-lg ${colors.stats.blue} border ${colors.border}`}
              >
                <p className="text-xs mb-1">In Progress</p>
                <p className="text-2xl font-bold">43</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Settings (Optional) */}
        <div
          className={`${colors.bgCard} rounded-xl p-6 ${colors.border} border mt-6`}
        >
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className={`text-sm ${colors.textMuted}`}>
                  Receive email updates about tasks
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium">Task Reminders</h3>
                <p className={`text-sm ${colors.textMuted}`}>
                  Get reminded about upcoming deadlines
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
