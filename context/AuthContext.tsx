"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  email: string;
  username: string;
  userStatus: "ceo" | "employee";
  organizationId?: string;
}

interface SignupData {
  email: string;
  password: string;
  username: string;
  userStatus: "ceo" | "employee";
  organizationName?: string;
  organizationId?: string;
}

interface MessageObject {
  error?: string;
  details?: string;
  success?: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  message: MessageObject | null;
  setMessage: (message: MessageObject | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      console.error("Invalid user in localStorage, clearing it");
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const [message, setMessage] = useState<MessageObject | null>(null);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important for cookies
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("Login response:", data);

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Small delay to ensure cookie is set
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Redirect based on role
      const dashboardPath =
        data.user.userStatus === "ceo"
          ? "/dashboard/ceo"
          : "/dashboard/employee";
      console.log("Redirecting to:", dashboardPath);
      router.push(dashboardPath);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (signupData: SignupData) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      console.log("LKSJSLKFLKL", data);

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      console.log("Signup response:", data);
      setMessage(data);
      setUser(data.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage({
        error: error.message.includes("E11000")
          ? "User already exists. Please use a different email or username."
          : error.message,
      });
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, message, setMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
