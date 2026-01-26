"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/context/AuthContext";
import { SignupFormValues, signupSchema } from "@/schemas/signupSchema";
import Link from "next/link";
import InputField from "../primitives/form/InputField";
import SelectField from "../primitives/form/SelectField";
import { Button } from "../ui/button";
import { Alert } from "../ui/alert";

interface Organization {
  _id: string;
  name: string;
}

export default function SignupForm() {
  const { signup, message, setMessage } = useAuth();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userStatus: "employee",
    },
  });

  const userStatus = watch("userStatus");

  useEffect(() => {
    if (userStatus === "employee") {
      fetchOrganizations();
    }
  }, [userStatus]);

  const fetchOrganizations = async () => {
    setLoadingOrgs(true);
    try {
      const res = await fetch("/api/organizations");
      if (res.ok) {
        setOrganizations(await res.json());
      }
    } finally {
      setLoadingOrgs(false);
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    setMessage("");

    const payload =
      data.userStatus === "ceo"
        ? {
            username: data.username,
            email: data.email,
            password: data.password,
            userStatus: "ceo" as const,
            organizationName: data.organizationName!,
          }
        : {
            username: data.username,
            email: data.email,
            password: data.password,
            userStatus: "employee" as const,
            organizationId: data.organizationId!,
          };

    await signup(payload);
    reset();
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md flex flex-col gap-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Full name */}
          <InputField
            label="Full Name"
            placeholder="John Doe"
            error={errors.username?.message}
            {...register("username")}
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Password */}
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Role */}
          <Controller
            name="userStatus"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Account Type"
                error={errors.userStatus?.message}
                options={[
                  { label: "Employee", value: "employee" },
                  { label: "CEO", value: "ceo" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Conditional fields */}
        {userStatus === "ceo" ? (
          <InputField
            label="Organization Name"
            placeholder="Axign Inc."
            error={errors.organizationName?.message}
            {...register("organizationName")}
          />
        ) : (
          <>
            {loadingOrgs ? (
              <div className="border rounded px-3 py-2 text-sm text-gray-500">
                Loading organizations...
              </div>
            ) : (
              <Controller
                name="organizationId"
                control={control}
                render={({ field }) => (
                  <SelectField
                    label="Organization"
                    error={errors.organizationId?.message}
                    options={[
                      { label: "Select organization", value: "" },
                      ...organizations.map((org) => ({
                        label: org.name,
                        value: org._id,
                      })),
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            )}
          </>
        )}

        {/* Success message */}
        {message && (
          <Alert
            variant="success"
            title="Success"
            description={message}
            dismissible={false}
          />
        )}

        {/* Submit */}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
      {/* Login */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <Link href="/login" className="text-sm text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}

// "use client";
// import { useAuth } from "@/context/AuthContext";
// import { useState, useEffect } from "react";

// interface Organization {
//   _id: string;
//   name: string;
// }

// export default function SignupPage() {
//   // const { signup } = useAuth();
//   const { signup, message, setMessage } = useAuth();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     userStatus: "employee",
//     organizationName: "",
//     organizationId: "",
//   });

//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [loadingOrgs, setLoadingOrgs] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (form.userStatus === "employee") {
//       fetchOrganizations();
//     }
//   }, [form.userStatus]);

//   const fetchOrganizations = async () => {
//     setLoadingOrgs(true);
//     try {
//       const res = await fetch("/api/organizations");

//       if (res.ok) {
//         const data = await res.json();
//         setOrganizations(data);
//       } else {
//         setError("Failed to load organizations");
//       }
//     } catch (err) {
//       setError("Failed to load organizations");
//       console.error(err);
//     } finally {
//       setLoadingOrgs(false);
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const requestBody =
//         form.userStatus === "ceo"
//           ? {
//               username: form.username,
//               email: form.email,
//               password: form.password,
//               userStatus: "ceo" as const,
//               organizationName: form.organizationName,
//             }
//           : {
//               username: form.username,
//               email: form.email,
//               password: form.password,
//               userStatus: "employee" as const,
//               organizationId: form.organizationId,
//             };

//       await signup(requestBody);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Full Name"
//           value={form.username}
//           onChange={handleChange}
//           required
//           className="border px-3 py-2 rounded"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="border px-3 py-2 rounded"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="border px-3 py-2 rounded"
//         />

//         <select
//           name="userStatus"
//           value={form.userStatus}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="employee">Employee</option>
//           <option value="ceo">CEO</option>
//         </select>

//         {form.userStatus === "ceo" ? (
//           <input
//             type="text"
//             name="organizationName"
//             placeholder="Organization Name"
//             value={form.organizationName}
//             onChange={handleChange}
//             required
//             className="border px-3 py-2 rounded"
//           />
//         ) : (
//           <div>
//             {loadingOrgs ? (
//               <div className="border px-3 py-2 rounded text-gray-500">
//                 Loading organizations...
//               </div>
//             ) : organizations.length === 0 ? (
//               <div className="border px-3 py-2 rounded text-red-500">
//                 No organizations available. Please contact admin or sign up as
//                 CEO.
//               </div>
//             ) : (
//               <select
//                 name="organizationId"
//                 value={form.organizationId}
//                 onChange={handleChange}
//                 required
//                 className="border px-3 py-2 rounded w-full"
//               >
//                 <option value="">-- Select Organization --</option>
//                 {organizations.map((org) => (
//                   <option key={org._id} value={org._id}>
//                     {org.name}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
//           disabled={loading}
//         >
//           {loading ? "Signing Up..." : "Sign Up"}
//         </button>

//         {message && (
//           <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
//             {message}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }
