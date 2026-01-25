"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { LoginFormValues, loginSchema } from "@/schemas/loginSchema";
import InputField from "../primitives/form/InputField";

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

        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute top-9.5 right-3 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Forgot password */}
      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

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
        <Link href="/signup" className="text-sm text-blue-600 hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
}

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useAuth } from "@/context/AuthContext";
// import { LoginFormValues, loginSchema } from "@/schemas/loginSchema";

// export default function LoginForm() {
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     await login(data.email, data.password);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//       {/* Email */}
//       <div>
//         <input
//           {...register("email")}
//           type="email"
//           placeholder="Email"
//           className="border px-3 py-2 rounded w-full"
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       {/* Password */}
//       <div className="relative">
//         <input
//           {...register("password")}
//           type={showPassword ? "text" : "password"}
//           placeholder="Password"
//           className="border px-3 py-2 rounded w-full pr-10"
//         />

//         <button
//           type="button"
//           onClick={() => setShowPassword((v) => !v)}
//           className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500 hover:text-gray-700"
//           aria-label={showPassword ? "Hide password" : "Show password"}
//         >
//           {showPassword ? "Hide" : "Show"}
//         </button>

//         {errors.password && (
//           <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
//       >
//         {isSubmitting ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// }
