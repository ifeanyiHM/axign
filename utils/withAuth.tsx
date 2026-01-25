"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Changed from "next/router"
import { useEffect } from "react";

interface WithAuthOptions {
  role?: string;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: WithAuthOptions,
) {
  const Wrapper = (props: P) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Wait for user state to load
      if (user === null) {
        router.push("/login");
        return;
      }

      // Role-based redirection
      if (options?.role && user?.userStatus !== options.role) {
        const redirectPath =
          user?.userStatus === "ceo" ? "/dashboard/ceo" : "/dashboard/employee";
        router.replace(redirectPath);
      }
    }, [user, router]);

    // Show loading state while checking auth
    if (user === null) {
      return <div>Loading...</div>;
    }

    // Don't render if wrong role
    if (options?.role && user?.userStatus !== options.role) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return Wrapper;
}
