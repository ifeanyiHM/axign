"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);

          // Store user data
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          // Redirect to CEO dashboard after 2 seconds
          setTimeout(() => {
            router.push("/dashboard/ceo");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification");
        // console.error(error);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50"
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
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center"
      >
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Verifying Email...</h2>
            <p className="text-gray-600 text-sm">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h2 className="text-xl font-bold mb-2 text-green-600">Success!</h2>
            <p className="text-gray-600 mb-4 text-sm">{message}</p>
            <p className=" text-gray-500 text-xs">
              Redirecting to dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-4xl mb-4">✗</div>
            <h2 className="text-xl font-bold mb-2 text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4 text-sm">{message}</p>
            <Button onClick={() => router.push("/signup")} className="text-sm">
              Back to Signup
            </Button>
          </>
        )}
      </motion.div>{" "}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
