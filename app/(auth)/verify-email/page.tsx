"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification");
        console.error(error);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Verifying Email...</h2>
            <p className="text-gray-600">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Success!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => router.push("/signup")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
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
