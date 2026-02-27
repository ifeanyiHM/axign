import {
  CheckCircle2,
  Users,
  BarChart3,
  Shield,
  Bell,
  Clock,
} from "lucide-react";
import { theme } from "@/utils/constants";
import LandingCard from "./LandingCard";
import { HighlightCard } from "./HighlightCard";

export default function Features() {
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

  return (
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
          <HighlightCard
            title="Why teams love it"
            items={[
              "Clean, distraction-free interface",
              "Powerful reporting insights",
              "Easy onboarding experience",
              "Designed for scale",
            ]}
          />
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8">
          {features.map((feature, index) => (
            <LandingCard
              key={index}
              Icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
