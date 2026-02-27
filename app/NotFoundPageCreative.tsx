"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Compass, MapPin, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPageCreative() {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#9b7a19]/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-2 h-2 bg-[#9b7a19] rounded-full opacity-40"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-40 right-32 w-3 h-3 bg-gray-400 rounded-full opacity-30"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-20 w-2 h-2 bg-[#9b7a19] rounded-full opacity-50"
        />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Illustration */}
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <div className="relative">
              {/* Animated Illustration Container */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Large 404 Background */}
                <div className="text-[180px] sm:text-[220px] font-extrabold leading-none text-gray-100 font-['Sora'] select-none">
                  404
                </div>

                {/* Floating Compass Icon */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-[#9b7a19] to-[#7a5f13] rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Compass className="w-12 h-12 text-white" />
                </motion.div>

                {/* Floating Map Pin */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center shadow-xl"
                >
                  <MapPin className="w-8 h-8 text-white" />
                </motion.div>

                {/* Small Decorative Circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 right-10 w-4 h-4 bg-[#9b7a19] rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="absolute bottom-20 left-10 w-3 h-3 bg-gray-400 rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={fadeInUp}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block px-4 py-2 bg-[#9b7a19]/10 text-[#9b7a19] rounded-full text-sm font-semibold mb-6"
            >
              Error 404
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-950 mb-6 leading-tight font-['Sora']"
            >
              Lost in Space?
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Looks like you&apos;ve ventured into uncharted territory. The page
              you&apos;re looking for doesn&apos;t exist or has been moved to a
              new location.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#9b7a19] text-white rounded-xl font-semibold hover:bg-[#7a5f13] transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
              <button
                onClick={() => router.back()}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous Page
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Quick Links
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/docs"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 p-4 bg-gradient-to-r from-[#9b7a19]/10 to-transparent border-l-4 border-[#9b7a19] rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#9b7a19] flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    Need Assistance?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our support team is here to help.{" "}
                    <Link
                      href="/contact"
                      className="text-[#9b7a19] font-semibold hover:underline"
                    >
                      Get in touch
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
