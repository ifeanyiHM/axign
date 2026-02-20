"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Users,
  BarChart3,
  Shield,
  Bell,
  Clock,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import CarouselRow from "@/components/landing/CarouselRow";
import { Button } from "@/components/ui/button";
import ScrollToTop from "@/utils/ScrollToTop";
const logoSrc = "/new_axign_logo.png";
const logoSrc2 = "/new_axign_black.png";

const theme = {
  accent: "#9b7a19",
  accentHover: "#7a5f13",
  accentLight: "#9b7a1910",

  // Dark / black tones
  dark: "#030712",
  darkCard: "#030712",
  darkBorder: "#1f2937",

  // Bar chart colors
  barDefault: "#1f2937",
  barDefaultTop: "#374151",

  accentB: "#2C3E50",
  barDefaultB: "#111c24",
  barDefaultTopB: "#1e3040",
};

// const theme = {
//   accentB: "#2C3E50",
//   accentHover: "#1a252f",
//   accentLight: "#2C3E5010",
//   dark: "#060a0d",
//   darkCard: "#060a0d",
//   darkBorder: "#111c24",
//   barDefaultB: "#111c24",
//   barDefaultTopB: "#1e3040",
// };

export const communityImages = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  // src: `/people/people-${i + 1}.png`,
}));

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const features = [
    {
      icon: CheckCircle2,
      iconBg: "bg-emerald-900/20 text-emerald-600",
      title: "Smart Task Management",
      description:
        "Create, assign, and track tasks with intelligent prioritization and deadline management that keeps everyone on the same page.",
    },
    {
      icon: Users,
      iconColors: "bg-indigo-900/20 text-indigo-600",
      title: "Team Collaboration",
      description:
        "Real-time updates, comments, and file sharing keep your entire team synchronized and working together seamlessly.",
    },
    {
      icon: BarChart3,
      iconColors: "bg-teal-900/20 text-teal-600",
      title: "Advanced Analytics",
      description:
        "Gain deep insights into team performance, productivity trends, and project progress with beautiful, actionable dashboards.",
    },
    {
      icon: Shield,
      iconColors: "bg-slate-900/20 text-slate-700",
      title: "Enterprise Security",
      description:
        "Bank-level encryption, role-based access control, and compliance with industry standards keep your data safe.",
    },
    {
      icon: Bell,
      iconColors: "bg-amber-900/20 text-amber-600",
      title: "Smart Notifications",
      description:
        "Stay informed without being overwhelmed. Customizable alerts ensure you never miss what matters most.",
    },
    {
      icon: Clock,
      iconColors: "bg-blue-900/20 text-blue-700",
      title: "Time Tracking",
      description:
        "Automatic time logging and estimation tools help you understand where time goes and optimize your processes.",
    },
  ];

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
                href="#features"
                style={{ ["--hover-color" as string]: theme.accent }}
                className="text-sm lg:text-base text-gray-900 transition-colors hover:text-(--hover-color)"
              >
                Features
              </Link>
              <Link
                href="#workflow"
                style={{ ["--hover-color" as string]: theme.accent }}
                className="text-sm lg:text-base text-gray-900 transition-colors hover:text-(--hover-color)"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                style={{ ["--hover-color" as string]: theme.accent }}
                className="text-sm lg:text-base text-gray-900 transition-colors hover:text-(--hover-color)"
              >
                Pricing
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
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                style={{ ["--hover-color" as string]: theme.accent }}
                className="block py-2 text-gray-900 hover:text-(--hover-color) font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                style={{ ["--hover-color" as string]: theme.accent }}
                className="block py-2 text-gray-900 hover:text-(--hover-color) font-medium transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                style={{ ["--hover-color" as string]: theme.accent }}
                className="block py-2 text-gray-900 hover:text-(--hover-color) font-medium transition-colors"
              >
                Pricing
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
                // className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-4 sm:mb-6 font-['Sora'] text-gray-950"
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
                  className="px-6 sm:px-8 py-3 sm:py-3 border-2 rounded-full text-base transition-all"
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
      <section
        id="features"
        className="relative py-24 lg:py-32 px-6 lg:px-8 bg-linear-to-b from-white via-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Side Text */}
            <div>
              <span
                style={{
                  backgroundColor: theme.accentLight,
                  color: theme.accent,
                }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              >
                Product Features
              </span>

              <h2 className="md:max-w-lg text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl mb-6">
                Built for modern teams that value clarity & speed
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                Everything you need to manage tasks, track performance, and
                improve collaboration — without unnecessary complexity.
              </p>
            </div>

            {/* Right Side Highlight Card */}
            <div
              style={{
                backgroundColor: theme.darkCard,
                borderColor: theme.darkBorder,
              }}
              className="relative rounded-3xl p-8 border shadow-xl shadow-gray-900/30"
            >
              <div
                style={{
                  background: `linear-gradient(to bottom right, ${theme.accent}1A, transparent)`,
                }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
              />
              <h3 className="text-xl font-semibold text-white mb-4">
                Why teams love it
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  "Clean, distraction-free interface",
                  "Powerful reporting insights",
                  "Easy onboarding experience",
                  "Designed for scale",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: theme.accent }}
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 lg:p-6 xl:p-8 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                {/* Accent top bar on hover */}
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div
                  style={{ ["--dark" as string]: theme.darkCard }}
                  className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-6 group-hover:bg-(--dark) transition-colors duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-950 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

            {/* <h2 className="text-4xl lg:text-5xl font-bold text-gray-950 leading-tight font-['Sora'] mb-6"> */}
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
              rgba(0,0,0,0.03),
              rgba(0,0,0,0.03) 1px,
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
                style={{ backgroundColor: theme.accent }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = theme.accentHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = theme.accent)
                }
                className="px-10 py-4 text-white rounded-full text-sm hover:shadow-2xl transition-all duration-300"
              >
                Start Today
              </Link>

              <Link
                href="/#contact"
                className="px-10 py-4 border border-white/40 text-white rounded-full text-sm hover:bg-white hover:text-gray-950 transition-all duration-300"
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
      <footer
        style={{ backgroundColor: theme.darkCard }}
        className="text-white pt-20 pb-10 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image
                  src={logoSrc2}
                  alt="Axign logo"
                  width={90}
                  height={60}
                  priority
                />
              </Link>

              <p className="text-gray-400 leading-relaxed max-w-md text-sm">
                Empowering teams to achieve extraordinary results through
                intelligent task management, accountability tracking, and
                seamless collaboration.
              </p>

              <p className="text-xs text-gray-500 mt-6">
                Trusted by modern teams worldwide.
              </p>
            </div>

            {/* Links Section */}
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
              {["Product", "Company", "Resources"].map((section, si) => {
                const links = [
                  [
                    { label: "Features", href: "#features" },
                    { label: "Pricing", href: "#pricing" },
                    { label: "Integrations", href: "#" },
                  ],
                  [
                    { label: "About", href: "#" },
                    { label: "Blog", href: "#" },
                    { label: "Careers", href: "#" },
                  ],
                  [
                    { label: "Documentation", href: "#" },
                    { label: "Help Center", href: "#" },
                    { label: "Community", href: "#" },
                  ],
                ];
                return (
                  <div key={section}>
                    <h4
                      // style={{ color: theme.accent }}
                      style={{ color: "white" }}
                      className="text-sm font-semibold tracking-wide uppercase mb-6"
                    >
                      {section}
                    </h4>
                    <ul className="space-y-4 text-sm">
                      {links[si].map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className={`text-gray-400 hover:text-[${theme.accent}] transition-colors`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{ borderColor: theme.darkBorder }}
            className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-6"
          >
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Axign. All rights reserved.
            </p>

            <div className="flex gap-6 text-xs">
              {["Privacy Policy", "Terms of Service", "Security"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
