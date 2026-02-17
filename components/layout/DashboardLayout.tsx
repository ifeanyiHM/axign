import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";
import { LogOut, LucideIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { Button } from "../ui/button";

export interface LinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardLayoutProps {
  children: ReactNode;
  links: LinkItem[];
}

export default function DashboardLayout({
  children,
  links,
}: DashboardLayoutProps) {
  const { logout } = useAuth();
  const { theme } = useTheme();
  const colors = themes[theme];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text} flex`}>
      {/* bg-[#181818] */}
      {/* Mobile Hamburger Button */}
      <Button
        size="icon"
        className={`fixed top-4 right-4 z-50 lg:hidden p-2 ${colors.bgCard} ${colors.text} rounded-md`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar – hidden on mobile unless toggled */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 h-screen xl:w-64 ${colors.bgSidebar} border-r ${colors.border} transform transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:flex lg:flex-col overflow-y-auto`}
      >
        <div className={`p-4 sm:px-6 sm:py-6 border-b ${colors.border}`}>
          <Link href={"/"}>
            <Image
              src={
                theme === "light"
                  ? "/new_axign_logo.png"
                  : "/new_axign_black.png"
              }
              alt="CCG logo"
              width={107}
              height={60}
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {links.map(({ href, label, icon: Icon }, index) => {
            const isActive = pathname === href;
            return (
              <Link
                key={index}
                href={href}
                className={`flex items-center text-sm px-3 py-3 rounded-lg ${
                  isActive ? colors.active : colors.hover
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className={`p-4 border-t ${colors.border}`}>
          <Button
            variant="ghost"
            onClick={logout}
            className={`flex items-center w-full px-3 py-3 ${colors.text} rounded-lg justify-start`}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-6">{children}</main>
    </div>
  );
}
