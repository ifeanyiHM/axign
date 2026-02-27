"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { InfoRow } from "@/components/dashboard/taskId/InfoRow";
import InputField from "@/components/primitives/form/InputField";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

type FormState = {
  fullName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    msg: string;
  }>(null);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const isValid = useMemo(() => {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
    return (
      form.fullName.trim().length >= 2 &&
      emailOk &&
      form.subject.trim().length >= 3 &&
      form.message.trim().length >= 10
    );
  }, [form]);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setStatus(null);
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setStatus(null);

    try {
      await new Promise((r) => setTimeout(r, 900));

      setStatus({
        type: "success",
        msg: "Thanks — we’ve received your message. Our team will reply shortly.",
      });
      setForm({
        fullName: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus({
        type: "error",
        msg: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="relative mt-18 md:mt-18">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gray-200/60 blur-3xl" />
          <div className="absolute top-52 right-[-6rem] h-72 w-72 rounded-full bg-gray-100 blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[-8rem] h-80 w-80 rounded-full bg-gray-200/60 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <main className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-700">
              <MessageSquareText className="h-4 w-4" />
              Contact Axign Support
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Let’s help you move faster.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Reach out for product questions, onboarding, partnerships, or
              support. We usually respond within 24 hours on business days.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Form Card */}
            <motion.section
              initial="hidden"
              animate="show"
              variants={fadeUp}
              custom={1}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Send a message</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Fill the form and we’ll get back to you.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4" />
                  Secure & private
                </div>
              </div>

              {status && (
                <div
                  className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-red-300 bg-red-50 text-red-700"
                  }`}
                >
                  {status.msg}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Full name"
                    placeholder="Your name"
                    value={form.fullName}
                    onChange={onChange("fullName")}
                    required
                  />
                  <InputField
                    label="Work email"
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={onChange("email")}
                    type="email"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Company"
                    placeholder="Axign Inc. (optional)"
                    value={form.company ?? ""}
                    onChange={onChange("company")}
                  />
                  <InputField
                    label="Subject"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={onChange("subject")}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={onChange("message")}
                    rows={6}
                    placeholder="Tell us a bit about what you need…"
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-400"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold"
                >
                  {loading ? "Sending…" : "Send message"}
                  <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Button>

                <p className="text-xs text-gray-500">
                  By submitting, you agree to be contacted about your request.
                  No spam.
                </p>
              </form>
            </motion.section>

            {/* Support Section */}
            <div className="space-y-6">
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={2}
                className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-lg"
              >
                <h3 className="text-lg font-semibold">Contact details</h3>

                <div className="mt-5 space-y-4 text-sm text-gray-700">
                  <InfoRow
                    icon={Mail}
                    label="Email"
                    value="support@axign.app"
                  />

                  <InfoRow
                    icon={Phone}
                    label="Phone"
                    value="+234 000 000 0000"
                  />

                  <InfoRow
                    icon={Clock}
                    label="Support hours"
                    value="Mon–Fri, 9:00am–6:00pm (WAT)"
                  />

                  <InfoRow
                    icon={MapPin}
                    label="Location"
                    value=" Nigeria (Remote-first)"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
