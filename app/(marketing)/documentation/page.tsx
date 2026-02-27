"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Users,
  BarChart3,
  Shield,
  Clock,
  FileText,
  Zap,
  ChevronRight,
  Home,
  Layers,
  Target,
  PieChartIcon,
  AlertTriangle,
  LifeBuoy,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import LandingCard from "@/components/landing/LandingCard";
import { HighlightCard } from "@/components/landing/HighlightCard";
import { Button } from "@/components/ui/button";
import { PagePreview } from "@/components/landing/PagePreview";
import { SectionHeader } from "@/components/landing/SectionHeader";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "getting-started",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const navigation = [
    {
      id: "overview",
      title: "Overview",
      icon: Home,
      subsections: [],
    },
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      subsections: [
        { id: "registration", title: "Registration" },
        { id: "login", title: "Login & Access" },
        { id: "user-roles", title: "User Roles" },
      ],
    },
    {
      id: "features",
      title: "Core Features",
      icon: Layers,
      subsections: [{ id: "task-management", title: "Task Management" }],
    },
    {
      id: "ceo-guide",
      title: "CEO Dashboard",
      icon: Target,
      subsections: [
        { id: "ceo-overview", title: "Dashboard Overview" },
        { id: "creating-tasks", title: "Creating Tasks" },
      ],
    },
    {
      id: "employee-guide",
      title: "Employee Dashboard",
      icon: Users,
      subsections: [
        { id: "employee-overview", title: "Dashboard Overview" },
        { id: "viewing-tasks", title: "Viewing Tasks" },
        { id: "updating-tasks", title: "Updating Task Status" },
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="mt-14 md:mt-18 lg:bg-gray-50">
        <div className="px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky top-24">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Layers className="h-4 w-4 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Documentation
                        </p>
                        <p className="text-xs text-gray-500">Browse sections</p>
                      </div>
                    </div>
                  </div>

                  {/* Nav */}
                  <div className="max-h-[calc(100vh-160px)] overflow-y-auto p-2">
                    <nav className="space-y-1">
                      {navigation.map((section) => (
                        <div key={section.id}>
                          <Button
                            variant={"ghost"}
                            onClick={() => {
                              if (section.id === "overview") {
                                setActiveSection(section.id);
                              }
                              if (section.subsections.length > 0) {
                                toggleSection(section.id);
                              }
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                              activeSection === section.id
                                ? "text-gray-700 bg-gray-100"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <section.icon className="w-4 h-4" />
                              <span>{section.title}</span>
                            </div>
                            {section.subsections.length > 0 && (
                              <motion.div
                                animate={{
                                  rotate: expandedSections.includes(section.id)
                                    ? 90
                                    : 0,
                                }}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </motion.div>
                            )}
                          </Button>

                          {section.subsections.length > 0 &&
                            expandedSections.includes(section.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-4.5 mt-1 space-y-1 border-l-2 border-gray-200 pl-3"
                              >
                                {section.subsections.map((sub) => (
                                  <Button
                                    variant={
                                      activeSection === sub.id
                                        ? "default"
                                        : "ghost"
                                    }
                                    key={sub.id}
                                    onClick={() => setActiveSection(sub.id)}
                                    className={`w-full text-left items-start justify-start px-3 py-2 rounded-lg text-sm transition-colors ${
                                      activeSection === sub.id
                                        ? "text-gray-100 font-medium"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                                  >
                                    {sub.title}
                                  </Button>
                                ))}
                              </motion.div>
                            )}
                        </div>
                      ))}
                    </nav>
                  </div>
                  {/* Footer helper */}
                  <div className="hidden lg:block mt-3 border-t border-gray-200 pt-2 pb-3 px-5">
                    <p className="text-xs font-semibold text-gray-900">
                      Need help?
                    </p>
                    <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                      If you can’t find an answer, reach out to support.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      Contact Support →
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-9">
              <motion.div
                key={activeSection}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
                className="bg-white lg:rounded-lg lg:border border-gray-200 py-4 lg:p-8"
              >
                {/* Overview Section */}
                {activeSection === "overview" && (
                  <div className="prose prose-gray max-w-none">
                    <SectionHeader
                      title="Welcome to Axign Documentation"
                      description="Axign is a comprehensive task management platform designed
                      to streamline operations, improve accountability, and
                      enhance team productivity for modern organizations."
                    />

                    <div className="grid md:grid-cols-2 gap-6 my-8">
                      <LandingCard
                        Icon={Target}
                        title={"Built for Organizations"}
                        description={
                          "Designed specifically for businesses that need clear task delegation, progress tracking, and performance monitoring."
                        }
                        className="bg-linear-to-br from-gray-50 to-white"
                        iconColors="bg-gray-200"
                      />
                      <LandingCard
                        Icon={Users}
                        title={"Role-Based Access"}
                        description={
                          "Separate interfaces for CEOs and employees, ensuringappropriate access and functionality for each role."
                        }
                        className="bg-linear-to-br from-gray-50 to-white"
                        iconColors="bg-gray-200"
                      />
                    </div>
                    <HighlightCard
                      title="What Axign Solves"
                      items={[
                        <>
                          <div className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                            <strong>Missed Deadlines:</strong> Clear due dates,
                            priority levels, and status tracking ensure tasks
                            stay on schedule.
                          </div>
                        </>,
                        <>
                          <div className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                            <strong>Disorganized Tasks:</strong> Centralized
                            task management replaces scattered emails and
                            messages.
                          </div>
                        </>,
                        <>
                          <div className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                            <strong>Lack of Accountability:</strong> Assignment
                            tracking and performance monitoring establish clear
                            responsibility.
                          </div>
                        </>,
                        <>
                          <div className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                            <strong>Remote Work Challenges:</strong> Cloud-based
                            platform enables seamless collaboration regardless
                            of location.
                          </div>
                        </>,
                      ]}
                    />

                    <div className="mt-12">
                      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                        {/* Subtle accent background */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-5"
                          style={{
                            background:
                              "radial-gradient(circle at top right, #9b7a19 0%, transparent 60%)",
                          }}
                        />

                        <div className="relative flex items-start gap-4">
                          {/* Icon container */}
                          <LifeBuoy className="text-lg" />

                          <div>
                            <h3 className="text-base font-semibold text-gray-900">
                              Quick Start
                            </h3>

                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                              New to Axign? Follow the guided setup to create
                              your organization, invite team members, and start
                              assigning tasks within minutes.
                            </p>

                            <Button
                              variant={"outline"}
                              onClick={() => setActiveSection("registration")}
                              className="mt-4 inline-flex items-center rounded-full lg:px-8 py-2 lg:py-2.5 text-sm"
                            >
                              Open Getting Started →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Section */}
                {activeSection === "registration" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="Registration"
                      description="Get started with Axign by creating your organization account."
                    />

                    {/* CEO */}
                    <section className="rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h2 className="text-xl font-bold text-gray-950">
                            CEO Registration
                          </h2>
                          <p className="mt-2 text-sm text-gray-700 max-w-2xl">
                            As a CEO or organization owner, you&apos;ll be
                            creating the primary account for your company.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <HighlightCard
                          title="Step-by-Step Process"
                          isListStyle={false}
                          items={[
                            <>
                              Navigate to the{" "}
                              <Link
                                href="/signup"
                                className="text-[#9b7a19] font-semibold hover:underline"
                              >
                                signup page.
                              </Link>
                            </>,
                            <>
                              Select <strong>CEO</strong> as your role.
                            </>,
                            <>
                              <div className="flex flex-col gap-2">
                                Fill in your details:
                                <ul className="mt-2 space-y-1 list-disc lg:list-inside text-gray-400">
                                  <li>
                                    Email address (for login and notifications)
                                  </li>
                                  <li>Username (display name)</li>
                                  <li>Secure password</li>
                                  <li>Organization name</li>
                                </ul>
                              </div>
                            </>,
                            <>
                              Click <strong>Create Account.</strong>
                            </>,
                            <>
                              Check your email for the verification link
                              (expires in 24 hours).
                            </>,
                            <>Verify your email to activate your account.</>,
                          ]}
                        />
                      </div>
                    </section>

                    {/* Employee */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-xl font-bold text-gray-950">
                        Employee Registration
                      </h2>
                      <p className="mt-2 text-sm text-gray-700 max-w-2xl">
                        Employees can register once they receive an invitation
                        from their CEO or know their organization ID.
                      </p>

                      <div className="mt-6">
                        <HighlightCard
                          title="Registration Process"
                          isListStyle={false}
                          items={[
                            <>
                              <span>
                                Click the invitation link from your CEO or visit
                                the{" "}
                                <Link
                                  href="/signup"
                                  className="text-[#9b7a19] font-semibold hover:underline"
                                >
                                  signup page.
                                </Link>
                              </span>
                            </>,
                            <>
                              Select <strong>Employee</strong> as your role.
                            </>,
                            <>Choose or enter your organization.</>,
                            <>Fill in your personal details.</>,
                            <>Submit registration.</>,
                            <>
                              Wait for CEO approval (you&apos;ll receive an
                              email).
                            </>,
                            <>Activate your account via the approval email.</>,
                          ]}
                        />
                      </div>
                    </section>

                    {/* Security Note */}
                    <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                      <h3 className="text-base font-semibold text-gray-950 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-blue-200">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </span>
                        Security Note
                      </h3>

                      <p className="mt-3 text-gray-700 text-sm leading-relaxed max-w-3xl">
                        Employee accounts require CEO approval to ensure only
                        authorized personnel access your organization&apos;s
                        data. This two-step verification process protects your
                        company&apos;s information.
                      </p>
                    </div>
                  </div>
                )}

                {/* Login Section */}
                {activeSection === "login" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="Login & Access"
                      description="Learn how to securely access your Axign dashboard."
                    />

                    {/* Logging In */}
                    <section className="rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-950">
                            Logging In
                          </h2>
                          <p className="mt-2 text-gray-700 max-w-2xl">
                            Use your registered email and password to sign in to
                            Axign.
                          </p>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
                          <span className="h-2 w-2 rounded-full bg-[#9b7a19]" />
                          Secure access
                        </div>
                      </div>

                      <div className="mt-6">
                        <HighlightCard
                          title="Login steps"
                          isListStyle={false}
                          items={[
                            <>
                              Go to the{" "}
                              <Link
                                href="/login"
                                className="text-[#9b7a19] font-semibold hover:underline"
                              >
                                login page.
                              </Link>
                            </>,
                            <>Enter your registered email address.</>,
                            <>Enter your password.</>,
                            <>
                              <span>
                                Click <strong>Sign In</strong> to access your
                                dashboard.
                              </span>
                            </>,
                          ]}
                        />
                      </div>
                    </section>

                    {/* Dashboard Access */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-bold text-gray-950">
                        Dashboard Access
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-2xl">
                        Upon successful login, you&apos;ll be automatically
                        redirected to your role-specific dashboard:
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <LandingCard
                          title={"CEO Dashboard"}
                          description={
                            "Full access to create tasks, manage employees, view analytics, and generate reports."
                          }
                          className="bg-linear-to-br from-gray-50 to-white"
                        />
                        <LandingCard
                          title={"Employee Dashboard"}
                          description={
                            "View assigned tasks, update task status, and track personal performance metrics."
                          }
                          className="bg-linear-to-br from-gray-50 to-white"
                        />
                      </div>
                    </section>

                    {/* Forgot Password */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-bold text-gray-950">
                        Forgot Password?
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-2xl">
                        If you&apos;ve forgotten your password, you can reset it
                        securely:
                      </p>

                      <div className="mt-6">
                        <HighlightCard
                          title="Password reset steps"
                          isListStyle={false}
                          items={[
                            <>
                              <span>
                                Click <strong>Forgot Password</strong> on the
                                login page.
                              </span>
                            </>,
                            <>Enter your registered email address.</>,
                            <>Check your email for the reset link.</>,
                            <>Create a new secure password.</>,
                            <>Log in with your new credentials.</>,
                          ]}
                        />
                      </div>
                    </section>

                    {/* Session Security */}
                    <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                      <h3 className="text-base font-semibold text-gray-950 mb-2 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-200">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </span>
                        Session Security
                      </h3>

                      <p className="text-gray-700 text-sm leading-relaxed max-w-3xl">
                        For your security, sessions expire after 24 hours of
                        inactivity. You&apos;ll need to log in again to continue
                        working.
                      </p>
                    </div>
                  </div>
                )}

                {/* User Roles Section */}
                {activeSection === "user-roles" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="User Roles"
                      description="Axign supports two distinct user roles, each with
                        specific permissions and capabilities."
                    />

                    {/* Roles grid */}
                    <div className="grid gap-6 md:grid-cols-2 md:gap-8 mb-12">
                      {/* CEO Card */}
                      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                          <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#9b7a19]/10">
                              <Target className="h-5 w-5 text-[#9b7a19]" />
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                CEO Role
                              </h3>
                              <p className="text-sm text-gray-500">
                                Full administrative access.
                              </p>
                            </div>
                          </div>

                          <span className="rounded-full bg-[#9b7a19]/10 px-3 py-1 text-xs font-medium text-[#9b7a19]">
                            Admin
                          </span>
                        </div>

                        <div className="px-6 py-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Capabilities
                          </h4>

                          <ul className="space-y-3 text-sm text-gray-600">
                            {[
                              "Create, assign, and delete tasks",
                              "Approve or reject employee registrations",
                              "Invite employees to the organization",
                              "View all tasks across the organization",
                              "Generate performance reports",
                              "Monitor analytics and team metrics",
                              "Manage employee profiles",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-[#9b7a19] mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Employee Card */}
                      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                          <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100">
                              <Users className="h-5 w-5 text-gray-700" />
                            </span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Employee Role
                              </h3>
                              <p className="text-sm text-gray-500">
                                Task execution permissions.
                              </p>
                            </div>
                          </div>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            Member
                          </span>
                        </div>

                        <div className="px-6 py-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-4">
                            Capabilities
                          </h4>

                          <ul className="space-y-3 text-sm text-gray-600">
                            {[
                              "View assigned tasks",
                              "Update task status",
                              "Add comments and updates",
                              "View performance metrics",
                              "Filter and sort tasks",
                              "Track deadlines and progress",
                              "Update profile information",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Permission hierarchy */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <div className="flex items-start gap-4">
                        <span className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200">
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        </span>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-950">
                            Permission Hierarchy
                          </h3>
                          <p className="mt-2 text-gray-700 max-w-3xl">
                            The role-based system ensures every user sees only
                            what they need — keeping operations secure,
                            structured, and accountable.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <HighlightCard
                          title="What this ensures"
                          items={[
                            <>
                              <div className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                                <strong>Data Security:</strong> Employees can
                                only access their assigned tasks.
                              </div>
                            </>,
                            <>
                              <div className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                                <strong>Clear Accountability:</strong> CEOs
                                maintain oversight while employees focus on
                                execution.
                              </div>
                            </>,
                            <>
                              <div className="flex flex-col xl:flex-row gap-1 xl:gap-2">
                                <strong>Simplified Workflow:</strong> Each
                                interface is tailored to role-specific needs.
                              </div>
                            </>,
                          ]}
                        />
                      </div>
                    </section>
                  </div>
                )}

                {/* Task Management Section */}
                {activeSection === "task-management" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="Task Management"
                      description="Comprehensive task creation, assignment, and tracking
                        capabilities."
                    />

                    {/* Task Structure */}
                    <section className="rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Task Structure
                      </h2>
                      <p className="mt-2 text-gray-700">
                        Every task in Axign contains the following fields:
                      </p>

                      <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        {/* Required */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-sm font-semibold text-gray-900">
                              Required fields
                            </h3>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
                              Mandatory
                            </span>
                          </div>

                          <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            {[
                              "Title (task name)",
                              "Description (detailed information)",
                              "Assigned To (one or more employees)",
                              "Assigned By (CEO username)",
                              "Start Date",
                              "Due Date",
                              "Priority (Low, Medium, High)",
                              "Status (Not Started, In Progress, Completed)",
                              "Category",
                            ].map((f) => (
                              <li key={f} className="flex items-start gap-3">
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />
                                <span className="leading-relaxed">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Optional */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="text-sm font-semibold text-gray-900">
                              Optional fields
                            </h3>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200">
                              Optional
                            </span>
                          </div>

                          <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            {[
                              "Progress percentage (0–100%)",
                              "Estimated hours",
                              "Tags",
                              "Attachments",
                              "Recurring schedule",
                              "Notification preferences",
                            ].map((f) => (
                              <li key={f} className="flex items-start gap-3">
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-500 shrink-0" />
                                <span className="leading-relaxed">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Statuses */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Task Statuses
                      </h2>
                      <p className="mt-2 text-gray-700">
                        Task statuses help teams track progress clearly from
                        start to finish.
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {[
                          {
                            title: "Not Started",
                            desc: "Task has been created but work hasn’t begun.",
                            dot: "bg-gray-400",
                            bg: "bg-gray-50",
                            border: "border-gray-200",
                          },
                          {
                            title: "In Progress",
                            desc: "Task is currently being worked on.",
                            dot: "bg-blue-600",
                            bg: "bg-blue-50",
                            border: "border-blue-200",
                          },
                          {
                            title: "Completed",
                            desc: "Task has been finished and verified.",
                            dot: "bg-green-600",
                            bg: "bg-green-50",
                            border: "border-green-200",
                          },
                          {
                            title: "Pending Review",
                            desc: "Task completed and awaiting CEO review.",
                            dot: "bg-amber-600",
                            bg: "bg-amber-50",
                            border: "border-amber-200",
                          },
                          {
                            title: "Overdue",
                            desc: "Task has passed its due date without completion.",
                            dot: "bg-red-600",
                            bg: "bg-red-50",
                            border: "border-red-200",
                          },
                        ].map((s) => (
                          <div
                            key={s.title}
                            className={`rounded-lg md:rounded-2xl border ${s.border} ${s.bg} p-5`}
                          >
                            <div className="flex items-start gap-3">
                              <span
                                className={`mt-1.5 h-2.5 w-2.5 rounded-full ${s.dot}`}
                              />
                              <div>
                                <h3 className="text-sm font-semibold text-gray-950">
                                  {s.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                                  {s.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Priority */}
                    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Priority Levels
                      </h2>
                      <p className="mt-2 text-gray-700">
                        Priority helps teams decide what needs attention first.
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                          {
                            title: "High",
                            desc: "Urgent tasks requiring immediate attention.",
                            pill: "text-red-700 bg-red-50 border-red-200",
                            bar: "bg-red-500",
                          },
                          {
                            title: "Medium",
                            desc: "Important tasks with standard deadlines.",
                            pill: "text-yellow-800 bg-yellow-50 border-yellow-200",
                            bar: "bg-yellow-500",
                          },
                          {
                            title: "Low",
                            desc: "Tasks that can be scheduled flexibly.",
                            pill: "text-green-700 bg-green-50 border-green-200",
                            bar: "bg-green-500",
                          },
                        ].map((p) => (
                          <div
                            key={p.title}
                            className="rounded-lg md:rounded-2xl border border-gray-200 bg-gray-50 p-5"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <span
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${p.pill}`}
                              >
                                {p.title}
                              </span>
                              <span
                                className={`h-2 w-16 rounded-full ${p.bar}`}
                              />
                            </div>

                            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                              {p.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <PagePreview
                      title="Page Preview"
                      description="Sample screenshots of the Table and Grid task views on desktop."
                      images={[
                        {
                          src: "/dashboardImage/taskmanagement1.png",
                          alt: "Axign My Tasks table view preview",
                          caption: "My Tasks — Table view (sample)",
                        },
                        {
                          src: "/dashboardImage/taskmanagement2.png",
                          alt: "Axign My Tasks grid view preview",
                          caption: "My Tasks — Grid view (sample)",
                        },
                      ]}
                    />
                  </div>
                )}

                {/* CEO Dashboard Overview */}
                {activeSection === "ceo-overview" && (
                  <div className="prose prose-gray max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="CEO Dashboard Overview"
                      description=" Your central hub for managing tasks, employees, and
                      organizational performance."
                    />

                    <h2 className="text-2xl font-bold text-gray-950 mb-4">
                      Dashboard Components
                    </h2>

                    <div className="space-y-6 mb-8">
                      <div className="p-6 bg-white border border-gray-200 rounded-xl">
                        <h3 className="text-xl font-bold text-gray-950 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-[#9b7a19]" />
                          Statistics Overview
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Real-time metrics at the top of your dashboard:
                        </p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Total tasks assigned
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Tasks pending
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Tasks in progress
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Tasks completed
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Overdue tasks count
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 bg-white border border-gray-200 rounded-xl">
                        <h3 className="text-xl font-bold text-gray-950 mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#9b7a19]" />
                          Quick Create
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Rapid task creation form accessible from the
                          dashboard:
                        </p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Create tasks without leaving the dashboard
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Auto-populated fields for speed
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Direct employee assignment
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 bg-white border border-gray-200 rounded-xl">
                        <h3 className="text-xl font-bold text-gray-950 mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-[#9b7a19]" />
                          Recent Tasks
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Quick view of recently created or updated tasks with:
                        </p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Task title and assignee
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Current status
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Due date
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Priority indicator
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Quick action buttons
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 bg-white border border-gray-200 rounded-xl">
                        <h3 className="text-xl font-bold text-gray-950 mb-3 flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-[#9b7a19]" />
                          Analytics Charts
                        </h3>
                        <p className="text-gray-700 mb-3">
                          Visual representations of organizational performance:
                        </p>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Task completion pie chart
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Weekly task trends bar chart
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Priority distribution
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />{" "}
                            Team performance comparison
                          </li>
                        </ul>
                      </div>
                    </div>

                    <PagePreview
                      title="Page Preview"
                      description="Sample screenshots of Ceo Dashboard Overview."
                      images={[
                        {
                          src: "/dashboardImage/dash-2.png",
                          alt: "Axign My Tasks table view preview",
                          caption: "My Tasks — Table view (sample)",
                        },
                        {
                          src: "/dashboardImage/dash-3.png",
                          alt: "Axign My Tasks grid view preview",
                          caption: "My Tasks — Grid view (sample)",
                        },
                      ]}
                    />

                    <div className="mt-8 rounded-2xl border border-[#9b7a19]/25 bg-[#9b7a19]/5 p-6">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#9b7a19]/30">
                          <Lightbulb className="h-5 w-5 text-[#9b7a19]" />
                        </span>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-950">
                            Pro Tip
                          </h3>
                          <p className="mt-2 text-sm text-gray-700 leading-relaxed max-w-3xl">
                            Use the dashboard as your daily starting point.
                            Review overdue tasks first, check team progress,
                            then create new assignments based on current
                            workload distribution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add more content sections as needed... */}
                {activeSection === "creating-tasks" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="Creating Tasks"
                      description=" Learn how to create comprehensive, actionable tasks for
                        your team."
                    />

                    {/* Step-by-step */}
                    <section className="rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-950">
                            Step-by-Step Guide
                          </h2>
                          <p className="mt-2 text-gray-700 max-w-2xl">
                            Follow these steps to create tasks that are clear,
                            trackable, and easy to execute.
                          </p>
                        </div>

                        <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                          <span className="h-2 w-2 rounded-full bg-[#9b7a19]" />
                          CEO / Admin
                        </span>
                      </div>

                      <div className="mt-6 grid gap-4">
                        {[
                          {
                            step: "1",
                            title: "Access Task Creation",
                            desc: 'Click "Create Task" on your dashboard or go to Tasks and click "New Task".',
                          },
                          {
                            step: "2",
                            title: "Fill in Basic Information",
                            desc: (
                              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                <li>
                                  • Title: Clear, action-oriented task name
                                </li>
                                <li>
                                  • Description: Detailed explanation of what
                                  needs to be done
                                </li>
                                <li>
                                  • Category: Select or create a custom category
                                </li>
                              </ul>
                            ),
                          },
                          {
                            step: "3",
                            title: "Assign Employees",
                            desc: "Select one or more team members from your organization.",
                          },
                          {
                            step: "4",
                            title: "Set Timeline",
                            desc: (
                              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                <li>• Start Date: When work should begin</li>
                                <li>• Due Date: Deadline for completion</li>
                                <li>
                                  • Estimated Hours: Expected time to complete
                                  (optional)
                                </li>
                              </ul>
                            ),
                          },
                          {
                            step: "5",
                            title: "Configure Priority & Status",
                            desc: (
                              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                <li>
                                  • Priority: Low, Medium, or High based on
                                  urgency
                                </li>
                                <li>• Initial Status: Usually “Not Started”</li>
                              </ul>
                            ),
                          },
                          {
                            step: "6",
                            title: "Add Optional Details",
                            desc: (
                              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                <li>• Tags for easy filtering</li>
                                <li>• File attachments</li>
                                <li>• Recurring schedule if applicable</li>
                              </ul>
                            ),
                          },
                          {
                            step: "7",
                            title: "Submit",
                            desc: 'Click "Create Task" to assign. Employees receive email notifications if enabled.',
                          },
                        ].map((s) => (
                          <div
                            key={s.step}
                            className="rounded-lg md:rounded-2xl border border-gray-200 bg-gray-50 p-5"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-gray-200 text-sm font-bold text-gray-900">
                                {s.step}
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-base font-semibold text-gray-950">
                                  {s.title}
                                </h3>

                                {typeof s.desc === "string" ? (
                                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                    {s.desc}
                                  </p>
                                ) : (
                                  <div className="mt-1">{s.desc}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Best practices */}
                    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 md:p-8 shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Best Practices
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-2xl">
                        Small improvements in task clarity make a big difference
                        in execution.
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {[
                          {
                            title: "Be Specific in Titles",
                            desc: "Use clear titles like “Review Q3 Financial Report” instead of “Report Review”.",
                          },
                          {
                            title: "Provide Context",
                            desc: "Include all necessary information in the description so employees can complete tasks independently.",
                          },
                          {
                            title: "Set Realistic Deadlines",
                            desc: "Consider employee workload and task complexity when setting due dates.",
                          },
                          {
                            title: "Use Categories Consistently",
                            desc: "Establish standard categories for your organization to make filtering and reporting easier.",
                          },
                        ].map((p) => (
                          <div
                            key={p.title}
                            className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 border border-green-200">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              </span>

                              <div>
                                <h3 className="text-base font-semibold text-gray-950">
                                  {p.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                  {p.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <PagePreview
                      title="Page Preview"
                      description="Sample screenshots of Task Creation Page."
                      images={[
                        {
                          src: "/dashboardImage/createtask1.png",
                          alt: "Axign My Tasks table view preview",
                          caption: "My Tasks — Table view (sample)",
                        },
                        {
                          src: "/dashboardImage/createtask2.png",
                          alt: "Axign My Tasks grid view preview",
                          caption: "My Tasks — Grid view (sample)",
                        },
                      ]}
                    />
                  </div>
                )}

                {/* Employee Dashboard Overview */}
                {activeSection === "employee-overview" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="Employee Dashboard Overview"
                      description="Your personal workspace for managing assigned tasks and
                        tracking your performance."
                    />

                    {/* Dashboard Components */}
                    <section className="rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950 mb-6">
                        Dashboard Components
                      </h2>

                      <div className="grid gap-6 md:grid-cols-2">
                        {[
                          {
                            title: "Personal Statistics",
                            icon: BarChart3,
                            desc: "Quick view of your task metrics:",
                            items: [
                              <>
                                <strong>Total Tasks:</strong> All tasks assigned
                                to you
                              </>,
                              <>
                                <strong>Pending:</strong> Tasks awaiting your
                                review
                              </>,
                              <>
                                <strong>In Progress:</strong> Tasks you&apos;re
                                actively working on
                              </>,
                              <>
                                <strong>Completed:</strong> Tasks you&apos;ve
                                finished
                              </>,
                            ],
                          },
                          {
                            title: "Task Status Pie Chart",
                            icon: PieChartIcon,
                            desc: "Visual breakdown of your tasks by status:",
                            items: [
                              "Color-coded task distribution",
                              "Quick status identification",
                              "Percentage calculations",
                              "Interactive chart segments",
                            ],
                          },
                          {
                            title: "My Tasks Table",
                            icon: FileText,
                            desc: "Recent tasks assigned to you with:",
                            items: [
                              "Task title and description preview",
                              "Current status indicator",
                              "Due date countdown",
                              "Priority badge",
                              "Progress percentage",
                              "Quick action buttons",
                            ],
                          },
                        ].map((section) => (
                          <div
                            key={section.title}
                            className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:shadow-md"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#9b7a19]/10 border border-[#9b7a19]/20">
                                <section.icon className="h-5 w-5 text-[#9b7a19]" />
                              </span>

                              <div>
                                <h3 className="text-lg font-semibold text-gray-950">
                                  {section.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                  {section.desc}
                                </p>
                              </div>
                            </div>

                            <ul className="mt-4 space-y-3 text-sm text-gray-700">
                              {section.items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#9b7a19] shrink-0" />
                                  <span className="leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    <PagePreview
                      title="Page Preview"
                      description="Sample screenshots of Employee Dashboard Overview."
                      images={[
                        {
                          src: "/dashboardImage/employeedash1.png",
                          alt: "Axign My Tasks table view preview",
                          caption: "My Tasks — Table view (sample)",
                        },
                        {
                          src: "/dashboardImage/employeedash2.png",
                          alt: "Axign My Tasks grid view preview",
                          caption: "My Tasks — Grid view (sample)",
                        },
                      ]}
                    />

                    {/* Daily Workflow Tip */}
                    <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-blue-200">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </span>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-950">
                            Daily Workflow Tip
                          </h3>
                          <p className="mt-2 text-sm text-gray-700 leading-relaxed max-w-3xl">
                            Start your day by checking your dashboard. Focus on
                            overdue tasks first, then high-priority items.
                            Update task statuses regularly to keep your CEO
                            informed of progress.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Viewing Tasks Section */}
                {activeSection === "viewing-tasks" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="Viewing Your Tasks"
                      description="Access and organize all tasks assigned to you with
                        powerful filtering and sorting options."
                    />

                    {/* Access */}
                    <section className="rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Accessing Your Tasks
                      </h2>

                      <p className="mt-2 text-gray-700 max-w-3xl">
                        Navigate to <strong>&quot;My Tasks&quot;</strong> from
                        the sidebar menu to view your complete task list.
                      </p>

                      {/* View Modes */}
                      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-3 md:p-6">
                        <h3 className="text-lg font-semibold text-gray-950">
                          View Modes
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          Switch between table and grid depending on how you
                          prefer to scan work.
                        </p>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                          {/* Table */}
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="text-sm font-semibold text-gray-950">
                                Table View
                              </h4>
                              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                                Detailed
                              </span>
                            </div>

                            <p className="mt-2 text-sm text-gray-600">
                              Compact, information-rich layout showing:
                            </p>

                            <ul className="mt-4 space-y-3 text-sm text-gray-700">
                              {[
                                "Task ID",
                                "Title & description",
                                "Assigned with (other team members)",
                                "Due date",
                                "Priority level",
                                "Status",
                                "Progress percentage",
                              ].map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />
                                  <span className="leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Grid */}
                          <div className="rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="flex items-start justify-between gap-4">
                              <h4 className="text-sm font-semibold text-gray-950">
                                Grid View
                              </h4>
                              <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                                Visual
                              </span>
                            </div>

                            <p className="mt-2 text-sm text-gray-600">
                              Card layout optimized for scanning tasks quickly:
                            </p>

                            <ul className="mt-4 space-y-3 text-sm text-gray-700">
                              {[
                                "Large task cards",
                                "Visual priority indicators",
                                "Progress bars",
                                "Category tags",
                                "Quick status updates",
                              ].map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />
                                  <span className="leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Filtering */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Filtering Tasks
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-3xl">
                        Use filters to focus on what matters most — especially
                        when your task list grows.
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                          {
                            title: "By Status",
                            desc: "Filter to show only: All, Not Started, In Progress, Pending Review, Completed, or Overdue tasks.",
                          },
                          {
                            title: "By Priority",
                            desc: "Focus on High, Medium, or Low priority tasks.",
                          },
                          {
                            title: "By Search",
                            desc: "Search by task title, ID, or category name.",
                          },
                        ].map((f) => (
                          <div
                            key={f.title}
                            className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                          >
                            <h3 className="text-sm font-semibold text-gray-950">
                              {f.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                              {f.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Sorting */}
                    <section className="mt-8 rounded-lg md:rounded-2xl border border-gray-200 bg-white p-3 md:p-8 shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Sorting Options
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-3xl">
                        Click column headers to sort tasks by:
                      </p>

                      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                        <ul className="grid gap-3 md:grid-cols-2 text-sm text-gray-700">
                          {[
                            <>
                              <strong>Due Date:</strong> Earliest to latest (or
                              reverse)
                            </>,
                            <>
                              <strong>Priority:</strong> High to Low (or
                              reverse)
                            </>,
                            <>
                              <strong>Status:</strong> Alphabetical order
                            </>,
                            <>
                              <strong>Progress:</strong> Least to most complete
                              (or reverse)
                            </>,
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#9b7a19] shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>

                    {/* Task Details */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Task Details
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-3xl">
                        Click on any task to view full details including:
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                          <h3 className="text-sm font-semibold text-gray-950">
                            Basic Information
                          </h3>
                          <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            {[
                              "Complete description",
                              "Assigned by (CEO name)",
                              "Team members (assigned with)",
                              "Category and tags",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                          <h3 className="text-sm font-semibold text-gray-950">
                            Timeline & Progress
                          </h3>
                          <ul className="mt-4 space-y-3 text-sm text-gray-700">
                            {[
                              "Start date",
                              "Due date with countdown",
                              "Estimated hours",
                              "Current progress",
                              "File attachments",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    <PagePreview
                      title="Page Preview"
                      description="Sample screenshots of Task List view."
                      images={[
                        {
                          src: "/dashboardImage/viewtask1.png",
                          alt: "Axign My Tasks table view preview",
                          caption: "My Tasks — Table view (sample)",
                        },
                        {
                          src: "/dashboardImage/viewtask2.png",
                          alt: "Axign My Tasks grid view preview",
                          caption: "My Tasks — Grid view (sample)",
                        },
                      ]}
                    />
                  </div>
                )}

                {/* Updating Tasks Section */}
                {activeSection === "updating-tasks" && (
                  <div className="max-w-none">
                    {/* Header */}
                    <SectionHeader
                      title="Updating Task Status"
                      description="Keep your CEO informed by regularly updating your task
                        progress and status."
                    />

                    {/* Important Note */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-amber-200">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                        </span>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-950">
                            Important note
                          </h3>
                          <p className="mt-2 text-sm text-gray-700 leading-relaxed max-w-3xl">
                            As an employee, you can only update the{" "}
                            <strong>status</strong> of your tasks. You can’t
                            modify other fields like due date, priority, or
                            assignees. Contact your CEO if you need changes to
                            these fields.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* How to Update */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        How to update a task
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-3xl">
                        Follow these steps to update your task status quickly
                        and correctly.
                      </p>

                      <div className="mt-6 grid gap-4">
                        {[
                          {
                            step: "1",
                            title: "Locate the task",
                            desc: 'Go to "My Tasks" and find the task you want to update.',
                          },
                          {
                            step: "2",
                            title: "Open the update action",
                            desc: 'Click the action button (three dots) or the "Update" button next to the task.',
                          },
                          {
                            step: "3",
                            title: "Select a new status",
                            desc: "Choose the appropriate status from the dropdown menu.",
                          },
                          {
                            step: "4",
                            title: "Add comments (optional)",
                            desc: "Include notes about your progress or any blockers.",
                          },
                          {
                            step: "5",
                            title: "Save changes",
                            desc: 'Click "Update" to save. Your CEO will be notified if notifications are enabled.',
                          },
                        ].map((s) => (
                          <div
                            key={s.step}
                            className="rounded-lg md:rounded-2xl border border-gray-200 bg-gray-50 p-5"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-gray-200 text-sm font-bold text-gray-900">
                                {s.step}
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-base font-semibold text-gray-950">
                                  {s.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                  {s.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Status Workflow */}
                    <section className="mt-8 rounded-lg md:rounded-2xl border border-gray-200 bg-white p-3 md:p-8 shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Status workflow
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-3xl">
                        Follow this recommended progression when updating task
                        status:
                      </p>

                      <div className="mt-6 grid gap-4">
                        {[
                          {
                            label: "Not Started",
                            hint: "When you begin working on the task",
                            toneBg: "bg-gray-100",
                            toneText: "text-gray-700",
                            dot: "bg-gray-400",
                          },
                          {
                            label: "In Progress",
                            hint: "While actively working on the task",
                            toneBg: "bg-blue-100",
                            toneText: "text-blue-700",
                            dot: "bg-blue-600",
                          },
                          {
                            label: "Pending Review",
                            hint: "When work is done and awaiting CEO approval",
                            toneBg: "bg-amber-100",
                            toneText: "text-amber-700",
                            dot: "bg-amber-600",
                          },
                          {
                            label: "Completed",
                            hint: "CEO marks as completed after verification",
                            toneBg: "bg-green-100",
                            toneText: "text-green-700",
                            dot: "bg-green-600",
                          },
                        ].map((w, idx, arr) => (
                          <div
                            key={w.label}
                            className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center gap-3">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${w.dot}`}
                                />
                                <span
                                  className={`inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold ${w.toneBg} ${w.toneText}`}
                                >
                                  {w.label}
                                </span>
                              </div>

                              <div className="text-sm text-gray-600 leading-relaxed sm:text-right">
                                {w.hint}
                              </div>
                            </div>

                            {idx < arr.length - 1 ? (
                              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-400">
                                <span className="h-px flex-1 bg-gray-200" />
                                <span>Next</span>
                                <ChevronRight className="h-4 w-4" />
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Best Practices */}
                    <section className="mt-8 rounded-2xl md:border border-gray-200 bg-white md:p-8 md:shadow-sm">
                      <h2 className="text-2xl font-semibold text-gray-950">
                        Best practices
                      </h2>
                      <p className="mt-2 text-gray-700 max-w-2xl">
                        Good updates make progress visible and reduce
                        unnecessary follow-ups.
                      </p>

                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                          {
                            title: "Update regularly",
                            desc: "Update task status at least once daily to keep stakeholders informed.",
                          },
                          {
                            title: "Be proactive",
                            desc: "If you encounter blockers, add comments and notify your CEO immediately.",
                          },
                          {
                            title: "Document progress",
                            desc: "Use comments to log important milestones or challenges encountered.",
                          },
                        ].map((p) => (
                          <div
                            key={p.title}
                            className="rounded-lg md:rounded-2xl border border-gray-200 bg-gray-50 p-5"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 border border-green-200">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              </span>

                              <div>
                                <h3 className="text-base font-semibold text-gray-950">
                                  {p.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                  {p.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    <PagePreview
                      title="Page Preview"
                      description="Sample screenshots of Task Update view."
                      images={[
                        {
                          src: "/dashboardImage/update1.png",
                          alt: "Axign My Tasks table view preview",
                          caption: "My Tasks — Table view (sample)",
                        },
                        {
                          src: "/dashboardImage/update2.png",
                          alt: "Axign My Tasks grid view preview",
                          caption: "My Tasks — Grid view (sample)",
                        },
                      ]}
                    />
                  </div>
                )}

                {/* Placeholder for other sections */}
                {![
                  "overview",
                  "registration",
                  "login",
                  "user-roles",
                  "task-management",
                  "ceo-overview",
                  "employee-overview",
                  "creating-tasks",
                  "viewing-tasks",
                  "updating-tasks",
                ].includes(activeSection) && (
                  <div className="text-center py-20">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Content Coming Soon
                    </h2>
                    <p className="text-gray-600">
                      This section is currently being developed.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Need Help Section */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                {/* Subtle background glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-5"
                  style={{
                    background:
                      "radial-gradient(circle at top right, #0f172a 0%, transparent 60%)",
                  }}
                />

                <div className="relative">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Still need help?
                  </h3>

                  <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-md">
                    Can’t find what you’re looking for? Our support team is
                    ready to assist you with onboarding, configuration, or
                    technical questions.
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-full bg-slate-900 px-4 lg:px-8 py-2 lg:py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Contact Support →
                  </Link>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
}
