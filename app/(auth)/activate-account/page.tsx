"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ActivateAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid activation link");
        return;
      }

      try {
        const res = await fetch("/api/activate-account", {
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

          // Redirect to employee dashboard after 2 seconds
          setTimeout(() => {
            router.push("/dashboard/employee");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(data.error || "Activation failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during activation");
        console.error(error);
      }
    };

    activateAccount();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Activating Account...</h2>
            <p className="text-gray-600">
              Please wait while we activate your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">
              Account Activated!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              Activation Failed
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ActivateAccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <ActivateAccountContent />
    </Suspense>
  );
}
