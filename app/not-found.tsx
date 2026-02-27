"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Repeating text background (VISIBLE) */}
      <div className="pointer-events-none absolute inset-0 opacity-40 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ y: ["-50%", "0%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="font-mono text-xs sm:text-sm leading-relaxed text-gray-900 whitespace-nowrap">
            {[...Array(32)].map((_, i) => (
              <div key={`first-${i}`}>
                404 Page Not Found • 404 Page Not Found • 404 Page Not Found •
                404 Page Not Found • 404 Page Not Found • 404 Page Not Found •
                404 Page Not Found • 404 Page Not Found • 404 Page Not Found •
              </div>
            ))}

            {/* Duplicate block for seamless loop */}
            {[...Array(32)].map((_, i) => (
              <div key={`second-${i}`}>
                404 Page Not Found • 404 Page Not Found • 404 Page Not Found •
                404 Page Not Found • 404 Page Not Found • 404 Page Not Found •
                404 Page Not Found • 404 Page Not Found • 404 Page Not Found •
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md rounded-3xl border border-gray-200 bg-white/95 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.35)]"
        >
          <div className="p-6 sm:p-8 text-center">
            <motion.div
              className="text-6xl sm:text-7xl font-black tracking-tight text-gray-900"
              animate={{ x: [0, -1, 1, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              404
            </motion.div>

            <p className="mt-3 text-sm sm:text-base text-gray-600">
              This page doesn’t exist.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// import NotFoundPage from "./NotFoundPage";
// import NotFoundPageCreative from "./NotFoundPageCreative";

// export default function NotFound() {
//   return <NotFoundPageCreative />; // or <NotFoundPage/>
// }
