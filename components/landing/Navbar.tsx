"use client";
import { theme } from "@/utils/constants";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
const logoSrc = "/new_axign_logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-white/95 backdrop-blur-xl border-b border-gray-100/80"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex w-20 lg:w-30 items-center gap-2">
            <Image
              src={logoSrc}
              alt="CCG logo"
              width={120}
              height={60}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/features"
              style={{ ["--hover-color" as string]: theme.accent }}
              className="text-sm lg:text-base text-gray-900 transition-colors hover:text-(--hover-color)"
            >
              Features
            </Link>
            <Link
              href="/documentation"
              style={{ ["--hover-color" as string]: theme.accent }}
              className="text-sm lg:text-base text-gray-900 transition-colors hover:text-(--hover-color)"
            >
              How it works
            </Link>
            <Link
              href="/contact"
              style={{ ["--hover-color" as string]: theme.accent }}
              className="text-sm lg:text-base text-gray-900 transition-colors hover:text-(--hover-color)"
            >
              Support
            </Link>
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <Link
                href="/login"
                className="px-4 lg:px-8 py-2 lg:py-2.5 border border-gray-900 text-gray-900 rounded-full text-sm hover:bg-gray-900 hover:text-white transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 4px 14px ${theme.accent}4D`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = theme.accentHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = theme.accent)
                }
                className="group flex items-center gap-1.5 px-4 lg:px-4 py-2 lg:py-2.75 text-white rounded-full text-sm hover:shadow-md transition-all"
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>{" "}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-3 border-t border-gray-100 mt-3">
            <Link
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              style={{ ["--hover-color" as string]: theme.accent }}
              className="block py-2 text-gray-900 hover:text-(--hover-color) font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="/documentation"
              onClick={() => setMobileMenuOpen(false)}
              style={{ ["--hover-color" as string]: theme.accent }}
              className="block py-2 text-gray-900 hover:text-(--hover-color) font-medium transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ ["--hover-color" as string]: theme.accent }}
              className="block py-2 text-gray-900 hover:text-(--hover-color) font-medium transition-colors"
            >
              Support
            </Link>
            <div className="pt-3 space-y-2 border-t border-gray-100">
              <Link
                href="/login"
                className="block w-full px-4 py-2.5 border border-gray-900 text-gray-900 rounded-full font-semibold text-center hover:bg-gray-900 hover:text-white transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                style={{ backgroundColor: theme.accent }}
                className="block w-full px-4 py-2.5 text-white rounded-full font-semibold text-center shadow-lg"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
