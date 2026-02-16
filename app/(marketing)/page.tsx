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
  MoveRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
const logoSrc = "/new_axign_logo.png";

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
      title: "Smart Task Management",
      description:
        "Create, assign, and track tasks with intelligent prioritization and deadline management that keeps everyone on the same page.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Real-time updates, comments, and file sharing keep your entire team synchronized and working together seamlessly.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Gain deep insights into team performance, productivity trends, and project progress with beautiful, actionable dashboards.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption, role-based access control, and compliance with industry standards keep your data safe.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Stay informed without being overwhelmed. Customizable alerts ensure you never miss what matters most.",
    },
    {
      icon: Clock,
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
            <Link href="/" className="flex items-center gap-2">
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
                className="text-sm lg:text-base text-gray-700 hover:text-gray-900 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#workflow"
                className="text-sm lg:text-base text-gray-700 hover:text-gray-900 transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                className="text-sm lg:text-base text-gray-700 hover:text-gray-900 transition-colors"
              >
                Pricing
              </Link>
              {/* Desktop CTA Buttons */}
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                <Link
                  href="/login"
                  className="px-4 lg:px-8 py-2 lg:py-2.5 border border-gray-800 text-gray-800 rounded-full text-sm hover:bg-gray-800 hover:text-white transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="group flex items-center gap-1.5 px-4 lg:px-4 py-2 lg:py-2.75 bg-linear-to-r from-gray-800 to-gray-600 text-white rounded-full text-sm hover:shadow-md transition-all shadow-gray-800/30"
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
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
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
                className="block py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Pricing
              </Link>
              <div className="pt-3 space-y-2 border-t border-gray-100">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2.5 border border-[#9b7a19] text-gray-800 rounded-xl font-semibold text-center hover:bg-gray-800 hover:text-white transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full px-4 py-2.5 bg-linear-to-r from-gray-800 to-gray-600 text-white rounded-xl font-semibold text-center shadow-lg shadow-gray-800/30"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
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
            className="absolute top-1/6 right-[10%] w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-[#9b7a19]/70 to-transparent"
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
            className="absolute bottom-1/3 left-[5%] w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-linear-to-br from-gray-600/40 to-transparent"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-4 sm:mb-6"
            >
              <span className="bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              how your team works with{" "}
              <span className="text-[#9b7a19]">Axign</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              The all-in-one task management platform that brings clarity,
              accountability, and results. Trusted by teams who refuse to settle
              for mediocre productivity.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/signup"
                className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-linear-to-r from-gray-800 to-gray-600 text-white rounded-full text-base hover:shadow-md shadow-gray-800/30"
              >
                Start Free Trial
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <button className="px-6 sm:px-8 py-3 sm:py-3 border-2 border-gray-800 text-gray-800 rounded-full text-base hover:bg-gray-800 hover:text-white transition-all">
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 sm:gap-12 mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-200 justify-center lg:justify-start"
            >
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 font-['Sora']">
                  10k+
                </div>
                <div className="text-gray-600 text-sm mt-1">Active Teams</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 font-['Sora']">
                  2M+
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  Tasks Completed
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-800 font-['Sora']">
                  99.9%
                </div>
                <div className="text-gray-600 text-sm mt-1">Uptime</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[700px] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white rounded-3xl shadow-2xl p-6 border border-gray-100"
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
                    { height: 70, isGold: false },
                    { height: 100, isGold: false },
                    { height: 45, isGold: false },
                    { height: 85, isGold: false },
                    { height: 95, isGold: false },
                    { height: 120, isGold: true },
                    { height: 35, isGold: false },
                    { height: 105, isGold: false },
                    { height: 80, isGold: false },
                    { height: 115, isGold: false },
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      // initial={{ scaleY: 0 }}
                      animate={{ scaleY: [0.6, 1] }}
                      // transition={{
                      //   duration: 1.5,
                      //   repeat: Infinity,
                      //   delay: i * 0.1,
                      // }}
                      className={`flex-1 rounded-t ${
                        bar.isGold
                          ? "bg-[#9b7a19]"
                          : "bg-linear-to-t from-gray-800 to-gray-600"
                      }`}
                      style={{ height: `${bar.height}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-[4%] left-[-10%] w-60 bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
            >
              <div className="space-y-3">
                <div className="h-2 bg-gray-100 rounded w-full" />
                <div className="h-2 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-1/2" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, -1, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-[28%] right-[-10%] w-56 bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
            >
              <div className="space-y-3">
                <div className="h-2 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-20"
          >
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold mb-4">
              FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 font-['Sora']">
              Everything you need to succeed
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your workflow and boost
              team productivity
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 hover:border-gray-400 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 to-gray-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-gray-800/20">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-['Sora']">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section
        id="workflow"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-20"
          >
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold mb-4">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 font-['Sora']">
              Get started in minutes
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to transform your team&apos;s productivity
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8"
          >
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center relative"
              >
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-xl shadow-gray-800/30 font-['Sora']"
                  >
                    {step.number}
                  </motion.div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 sm:top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent" />
                )}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 font-['Sora']">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800 to-gray-600 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-50%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-br from-[#9b7a19]/20 to-transparent"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight font-['Sora']">
              Ready to transform your workflow?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of teams already achieving more with Axign. Start
              your free trial today—no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-gray-800 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:-translate-y-1 transition-all shadow-xl"
              >
                Start Free Trial
              </Link>
              <button className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-gray-800 transition-all">
                Talk to Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-500 rounded-lg flex items-center justify-center relative">
                <div className="absolute w-3.5 h-3.5 bg-[#9b7a19] rotate-45 transform -translate-y-0.5" />
              </div>
              <span className="text-2xl font-extrabold font-['Sora']">
                Axign
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Empowering teams to achieve extraordinary results through
              intelligent task management and seamless collaboration.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-['Sora']">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-['Sora']">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-['Sora']">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-[#9b7a19] transition-colors text-sm sm:text-base"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-xs sm:text-sm">
            © 2024 Axign. All rights reserved.
          </div>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link
              href="#"
              className="text-gray-500 hover:text-[#9b7a19] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-[#9b7a19] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
