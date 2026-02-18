"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function ApproveEmployeeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const action = searchParams.get("action");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const processApproval = async () => {
      if (!token || !action) {
        setStatus("error");
        setMessage("Invalid approval link");
        return;
      }

      try {
        const res = await fetch("/api/approve-employee", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.error || "Approval process failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during the approval process");
        console.error(error);
      }
    };

    processApproval();
  }, [token, action]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-gray-100 to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 1️⃣ Large Soft Gradient Circle (less blur) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-200/40 blur-2xl"
        />

        {/* 2️⃣ Medium Floating Circle */}
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
          className="absolute bottom-16 right-16 w-72 h-72 rounded-full bg-purple-200/40 blur-2xl"
        />

        {/* 3️⃣ Fine Grid Block (clearer lines) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
          className="absolute top-1/3 left-10 w-36 h-36 rounded-xl opacity-80"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px)
      `,
            backgroundSize: "22px 22px",
          }}
        />

        {/* 4️⃣ Dot Grid Block (stronger dots) */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 40, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-32 w-32 h-32 rounded-xl opacity-80"
          style={{
            backgroundImage: `
        radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* 5️⃣ Diagonal Line Block (more visible) */}
        <motion.div
          animate={{ rotate: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 60, ease: "easeInOut" }}
          className="absolute top-16 right-1/4 w-44 h-44 rounded-xl opacity-70"
          style={{
            backgroundImage: `
        repeating-linear-gradient(
          45deg,
          rgba(0,0,0,0.2),
          rgba(0,0,0,0.2) 1px,
          transparent 1px,
          transparent 28px
        )
      `,
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 sm:p-12 rounded-2xl shadow-md max-w-md w-full text-center relative z-10"
      >
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-gray-900 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Processing...
            </h2>
            <p className="text-gray-600">
              Please wait while we process your request.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-4xl mb-4">✗</div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              Something went wrong
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function ApproveEmployeePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <ApproveEmployeeContent />
    </Suspense>
  );
}
