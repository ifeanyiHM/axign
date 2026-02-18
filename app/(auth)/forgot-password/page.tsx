"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import InputField from "@/components/primitives/form/InputField";
import { Alert } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setEmail("");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-tr from-gray-100 to-gray-50 relative overflow-hidden"
      style={{
        backgroundColor: "#f8fafc",
        backgroundImage: `
      radial-gradient(rgba(0,0,0,0.2) 2px, transparent 1px)
    `,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Subtle background decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-purple-200/30 blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Forgot Password
        </h2>

        <p className="text-gray-600 mb-6 text-center text-sm">
          Enter your email address and we&apos;ll send you a secure link to
          reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-sm"
          />

          <Button type="submit" disabled={loading} className="text-sm">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          {/* Success message */}
          {(error || success) && (
            <Alert
              variant={error ? "danger" : "success"}
              title={error ? "Failed" : "Success"}
              description={error || success}
              dismissible={false}
            />
          )}

          <div className="text-center mt-4 text-sm">
            Back to{" "}
            <Link href="/login" className="hover:underline text-xs">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
