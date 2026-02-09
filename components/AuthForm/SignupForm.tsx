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

  const { error, message: success } = message || {};

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
      const res = await fetch("/api/organizations/allOrganizations");
      if (res.ok) {
        setOrganizations(await res.json());
      }
    } finally {
      setLoadingOrgs(false);
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    setMessage(null);

    const payload =
      data.userStatus === "ceo"
        ? {
            username: data.username,
            email: data.email,
            password: data.password,
            userStatus: "ceo" as const,
            organizationName: data.organizationName!,
            avatar: "",
            companyName: data.organizationName,
            tasksAssigned: 0,
            tasksCompleted: 0,
            performanceRating: 0,
          }
        : {
            username: data.username,
            email: data.email,
            password: data.password,
            userStatus: "employee" as const,
            organizationId: data.organizationId!,
            avatar: "",
            companyName: organizations.find(
              (org) => org._id === data.organizationId,
            )?.name,
            tasksAssigned: 0,
            tasksCompleted: 0,
            performanceRating: 0,
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
              <div className="flex flex-col gap-0.5">
                {" "}
                <label className="text-sm font-medium">Organization</label>
                <div className="border-input flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-3 whitespace-nowrap shadow-xs transition-[color,box-shadow]">
                  Loading organizations...
                </div>
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
        {(error || success) && (
          <Alert
            variant={error ? "danger" : "success"}
            title={error ? "Failed" : "Success"}
            description={error || success}
            dismissible={false}
          />
        )}

        {/* Submit */}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
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
