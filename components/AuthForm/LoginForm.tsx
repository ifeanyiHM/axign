"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { LoginFormValues, loginSchema } from "@/schemas/loginSchema";
import InputField from "../primitives/form/InputField";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setFormError("");
    try {
      await login(data.email, data.password);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Email */}
      <InputField
        label="Email"
        type="email"
        placeholder="Email"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Password */}
      <div className="relative">
        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          error={errors.password?.message}
          inputClassName="pr-12"
          {...register("password")}
        />

        <Button
          variant={"ghost"}
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="p-0 hover:bg-0 absolute top-9.5 right-3 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>

      {/* Forgot password */}
      <div className="text-right">
        <Link href="/forgot-password" className="text-sm hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>

      {/* Error */}
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {formError}
        </div>
      )}

      {/* Signup */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
        </span>
        <Link href="/signup" className="text-sm hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
