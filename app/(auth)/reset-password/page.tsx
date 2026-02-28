"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import InputField from "@/components/primitives/form/InputField";
import { Alert } from "@/components/ui/alert";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError(data.error || "Password reset failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Invalid link fallback
  if (!token) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-linear-to-tr from-gray-100 to-gray-50 relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px),
            radial-gradient(at 20% 20%, #f1f5f9, #e2e8f0)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      >
        {/* Background decorations */}
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

        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center relative z-10">
          <div className="text-red-500 text-4xl mb-4">✗</div>
          <h2 className="text-2xl font-extrabold mb-2 text-red-600">
            Invalid Link
          </h2>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Button variant="default" className="mt-4">
            <Link href="/forgot-password" className="text-sm">
              Request New Link
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px),
          radial-gradient(at 20% 20%, #f1f5f9, #e2e8f0)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
      }}
      className="min-h-screen flex items-center justify-center bg-linear-to-tr from-gray-100 to-gray-50 relative overflow-hidden"
    >
      {/* Reset password card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md relative z-10"
      >
        <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-900">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <InputField
              type="password"
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters
            </p>
          </div>

          <div>
            <InputField
              type="password"
              label="Confirm Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="text-sm"
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

          {/* Success message */}
          {(error || success) && (
            <Alert
              variant={error ? "danger" : "success"}
              title={error ? "Failed" : "Success"}
              description={
                error ? (
                  error
                ) : (
                  <>
                    {success}
                    <p className="text-xs mt-2 text-gray-500">
                      Redirecting to login...
                    </p>
                  </>
                )
              }
              dismissible={false}
            />
          )}

          <div className="text-center mt-4 text-sm">
            Back to {""}
            <Link href="/login" className="hover:underline text-sm sm:text-xs">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
