"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CarouselRow from "@/components/landing/CarouselRow";
import ScrollToTop from "@/utils/ScrollToTop";
import Footer from "@/components/landing/Footer";
import { theme } from "@/utils/constants";
import Navbar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";

export const communityImages = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  // src: `/people/people-${i + 1}.png`,
}));

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const workflowSteps = [
    {
      number: "1",
      title: "Create Your Workspace",
      description:
        "Set up your organization and invite team members in seconds",
    },
    {
      number: "2",
      title: "Add Your Tasks",
      description:
        "Import existing projects or start fresh with our intuitive interface",
    },
    {
      number: "3",
      title: "Assign & Track",
      description: "Delegate work and monitor progress with real-time updates",
    },
    {
      number: "4",
      title: "Deliver Results",
      description:
        "Complete projects faster with clear visibility and accountability",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="lg:min-h-screen pt-18 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-b from-white to-gray-50">
        <div className="relative flex items-center">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            {/* Floating Dot Grid */}
            <motion.div
              animate={{
                y: [0, 25, 0],
                rotate: [45],
                // rotate: [0, -90, -180, -270, -360],
              }}
              transition={{
                duration: 28,
                // repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 md:top-2/6 left-[5%] md:left-[75%] lg:left-[25%] w-24 h-24 sm:w-36 sm:h-36 rounded-lg z-10"
              style={{
                backgroundImage: `radial-gradient(rgba(0,0,0,0.4) 2px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />

            {/* Your existing motion circles */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute top-1/14 right-[10%] w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-[${theme.accent}]/70 to-transparent z-10`}
            />
            <motion.div
              animate={{
                y: [0, 30, 0],
                rotate: [0, -90, -180, -270, -360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-1/6 left-[5%] w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-linear-to-br from-gray-900/40 to-transparent z-10"
            />
          </div>
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 sm:gap-12 items-start relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center lg:text-left mt-10"
            >
              <motion.h1
                variants={fadeInUp}
                className="tracking-tight text-gray-900 text-3xl sm:text-4xl md:text-6xl lg:text-5xl xl:text-7xl font-semibold mb-4 sm:mb-6"
              >
                <span className="text-gray-950">Transform</span> how your team
                works with <span style={{ color: theme.accent }}>Axign</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                The all-in-one task management platform that brings clarity,
                accountability, and results. Trusted by teams who refuse to
                settle for mediocre productivity.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <Link
                  href="/signup"
                  className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gray-950 text-white rounded-full text-base hover:shadow-md shadow-gray-900/30"
                >
                  Register Now
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href={"#demo"}
                  style={{
                    borderColor: theme.accent,
                    color: theme.accent,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.accent;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = theme.accent;
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-3 border rounded-full text-base transition-all"
                >
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Top floating card */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-6 -left-[10%] w-60 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 z-10"
              >
                <div className="space-y-3">
                  <div className="h-2 bg-gray-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                </div>
              </motion.div>

              {/* Main dashboard card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative mx-auto w-125 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 mt-32 mb-24"
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                  <div className="w-3 h-3 rounded-full bg-gray-200" />
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-gray-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                  <div className="flex gap-2 mt-16 h-24 items-end">
                    {[
                      { height: 70, isAccent: false },
                      { height: 100, isAccent: false },
                      { height: 45, isAccent: false },
                      { height: 85, isAccent: false },
                      { height: 95, isAccent: false },
                      { height: 120, isAccent: true },
                      { height: 35, isAccent: false },
                      { height: 105, isAccent: false },
                      { height: 80, isAccent: false },
                      { height: 115, isAccent: false },
                    ].map((bar, i) => (
                      <motion.div
                        key={i}
                        animate={{ scaleY: [0.6, 1] }}
                        style={{
                          height: `${bar.height}%`,
                          ...(bar.isAccent
                            ? { backgroundColor: theme.accentB }
                            : {
                                background: `linear-gradient(to top, ${theme.barDefaultB}, ${theme.barDefaultTopB})`,
                              }),
                        }}
                        className="flex-1 rounded-t"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Bottom floating card */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, -1, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-4 -right-[10%] w-56 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 z-10"
              >
                <div className="space-y-3">
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>{" "}
        </div>
        <motion.div
          variants={fadeInUp}
          className="flex gap-6 sm:gap-12 mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-200 justify-center lg:justify-start"
        >
          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-950">
              100+
            </div>
            <div className="text-gray-600 text-sm mt-1">Active Teams</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-950">
              500+
            </div>
            <div className="text-gray-600 text-sm mt-1">Tasks Completed</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-gray-950">
              99.9%
            </div>
            <div className="text-gray-600 text-sm mt-1">Uptime</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Workflow Section */}
      <section
        id="workflow"
        className="relative py-24 lg:py-32 px-6 lg:px-8 bg-linear-to-b from-gray-50 via-white to-gray-50"
        style={{
          backgroundColor: "#f3f4f6",
          backgroundImage: `
                    linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                    linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                  `,
          backgroundSize: "20px 20px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-2xl mb-20">
            <span
              style={{
                backgroundColor: theme.accentLight,
                color: theme.accent,
              }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            >
              How it works
            </span>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl mb-6 md:max-w-lg lg:max-w-full">
              A simple workflow designed for real teams
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Get up and running in minutes with a streamlined onboarding
              process that eliminates friction and helps your team focus on
              execution.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative">
            {/* Vertical line */}
            <div
              style={{ backgroundColor: `${theme.accent}4D` }}
              className="hidden lg:block absolute left-6 top-0 bottom-0 w-px"
            />

            <div className="space-y-12 lg:space-y-16">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative lg:pl-20 group">
                  {/* Step Number */}
                  <div
                    style={
                      {
                        ["--accent" as string]: theme.accent,
                      } as React.CSSProperties
                    }
                    className="absolute left-1 md:left-0 top-1 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-900 font-semibold shadow-sm group-hover:border-accent group-hover:text-accent transition-colors duration-300"
                  >
                    {step.number}
                  </div>

                  {/* Content Card */}
                  <div className="z-10 bg-white border border-gray-200 rounded-2xl p-8 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-gray-300">
                    <h3 className="relative z-10 text-xl font-semibold text-gray-950 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="relative overflow-hidden py-10 md:py-16">
        {/* Header */}
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl">
            Designed for clarity. Built for performance.
          </h2>

          <p className="mt-4 text-base text-gray-600 md:text-lg">
            Explore a powerful, intuitive dashboard that brings your data,
            workflows, and insights together in one seamless experience.
          </p>
        </div>

        {/* Carousel rows */}
        <div className="mb-14 mt-10 space-y-3 md:mt-24">
          {/* Row 1 → Left to Right */}
          <CarouselRow
            images={communityImages}
            className="animate-[scroll_60s_linear_infinite]"
          />

          {/* Row 2 → Right to Left */}
          <CarouselRow
            images={communityImages}
            className="animate-[scrollReverse_60s_linear_infinite]"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-24 lg:py-32 px-6 lg:px-8"
        style={{
          backgroundColor: "#f8fafc",
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              rgba(0,0,0,0.08),
              rgba(0,0,0,0.08) 1px,
              transparent 1px,
              transparent 30px
            )
          `, //45deg for opposite angle
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Card Container */}
          <div
            style={{
              backgroundColor: theme.darkCard, // fallback
              backgroundImage: "url('/pattern.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-3xl p-6 md:p-12 lg:p-16 text-center overflow-hidden"
          >
            {/* Accent top line */}
            <div
              style={{
                background: `linear-gradient(to right, transparent, ${theme.accent}99, transparent)`,
              }}
              className="absolute top-0 left-0 w-full h-px"
            />

            <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight font-['Sora'] mb-6">
              Ready to elevate your team&apos;s workflow?
            </h2>

            <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join teams that rely on Axign to streamline operations, improve
              accountability, and move faster — without added complexity.
            </p>

            {/* Buttons */}
            <div className="max-w-50 mx-auto md:max-w-full flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-10 py-4 bg-gray-200 hover:bg-gray-100 rounded-full text-sm hover:shadow-2xl transition-all duration-300"
              >
                Start Today
              </Link>

              <Link
                href="/contact"
                style={{
                  borderColor: theme.accent,
                  color: theme.accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.accent;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = theme.accent;
                }}
                className="px-10 py-4 border rounded-full text-sm hover:text-gray-950 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust note */}
            <p className="text-sm text-gray-400 mt-8">
              No Payment required · Free acces
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
