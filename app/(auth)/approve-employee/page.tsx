"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Processing...</h2>
            <p className="text-gray-600">
              Please wait while we process your request.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-bold mb-2 text-red-600">Error</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function ApproveEmployeePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <ApproveEmployeeContent />
    </Suspense>
  );
}
