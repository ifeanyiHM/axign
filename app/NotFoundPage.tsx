"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const popularLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Documentation", href: "/docs", icon: FileQuestion },
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Contact Support", href: "/contact", icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#9b7a19]/5"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gray-900/5"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-[#9b7a19]/10"
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="text-center"
        >
          {/* 404 Number Animation */}
          <motion.div
            variants={fadeInUp}
            className="mb-8"
          >
            <motion.div
              animate={floatingAnimation}
              className="inline-block"
            >
              <h1 className="text-[120px] sm:text-[180px] lg:text-[220px] font-extrabold leading-none font-['Sora']">
                <span className="bg-gradient-to-r from-gray-900 via-[#9b7a19] to-gray-900 bg-clip-text text-transparent">
                  404
                </span>
              </h1>
            </motion.div>
          </motion.div>

          {/* Main Message */}
          <motion.div variants={fadeInUp} className="mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-950 mb-4 font-['Sora']">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off.
              It might have been moved, deleted, or never existed.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSearch}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for what you need..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#9b7a19] focus:border-transparent outline-none text-gray-900 placeholder:text-gray-400 transition-all"
              />
            </div>
          </motion.form>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-950 text-white rounded-xl font-semibold text-base hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold text-base hover:bg-gray-900 hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>

          {/* Popular Links */}
          <motion.div variants={fadeInUp} className="mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Popular Pages
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {popularLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group flex flex-col items-center gap-3 p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-[#9b7a19] hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#9b7a19] transition-colors">
                      <link.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-[#9b7a19] transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Help Text */}
          <motion.div
            variants={fadeInUp}
            className="max-w-2xl mx-auto p-6 bg-[#9b7a19]/5 border border-[#9b7a19]/20 rounded-xl"
          >
            <p className="text-sm text-gray-700">
              <strong>Need help?</strong> If you think this is a mistake or
              you&apos;re having trouble finding something,{" "}
              <Link
                href="/contact"
                className="text-[#9b7a19] font-semibold hover:underline"
              >
                contact our support team
              </Link>{" "}
              and we&apos;ll be happy to assist you.
            </p>
          </motion.div>

          {/* Error Code */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 text-xs text-gray-400"
          >
            Error Code: 404 | Page Not Found
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
