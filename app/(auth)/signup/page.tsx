import SignupForm from "@/components/AuthForm/SignupForm";
import AuthSplitLayout from "@/components/layout/AuthSplitLayout";
import Image from "next/image";

const heroImage = "/signUp.svg";
const logoSrc = "/axign_logo.png";

export default function RegisterPage() {
  // const headerActions = (
  //   <div className="grid grid-cols-3 gap-2">
  //     <Button
  //       type="button"
  //       variant="outline"
  //       className="h-11 w-full rounded-md border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
  //     >
  //       <Image
  //         src="/images/google_icon.svg"
  //         alt="Google logo"
  //         width={16}
  //         height={16}
  //         className="mr-2"
  //       />
  //       Google
  //     </Button>
  //     <Button
  //       type="button"
  //       variant="outline"
  //       className="h-11 w-full rounded-md border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
  //     >
  //       <Image
  //         src="/images/apple_icon.svg"
  //         alt="Google logo"
  //         width={16}
  //         height={16}
  //         className="mr-2"
  //       />
  //       Apple ID
  //     </Button>
  //     <Button
  //       type="button"
  //       variant="outline"
  //       className="h-11 w-full rounded-md border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
  //     >
  //       <Image
  //         src="/images/facebook_icon.svg"
  //         alt="Facebook logo"
  //         width={16}
  //         height={16}
  //         className="mr-2"
  //       />
  //       Facebook
  //     </Button>
  //   </div>
  // );

  return (
    <AuthSplitLayout
      heroImage={heroImage}
      title="Create your CCG account"
      subtitle="Join groups, events, volunteer, and grow in community."
      // headerActions={headerActions}
      header={
        <Image src={logoSrc} alt="CCG logo" width={120} height={60} priority />
      }
      form={<SignupForm />}
    />
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { useAuth } from "@/context/AuthContext";
// import { SignupFormValues, signupSchema } from "@/schemas/signupSchema";

// interface Organization {
//   _id: string;
//   name: string;
// }

// export default function SignupPage() {
//   const { signup, message, setMessage } = useAuth();

//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [loadingOrgs, setLoadingOrgs] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       userStatus: "employee",
//     },
//   });

//   const userStatus = watch("userStatus");

//   useEffect(() => {
//     if (userStatus === "employee") {
//       fetchOrganizations();
//     }
//   }, [userStatus]);

//   const fetchOrganizations = async () => {
//     setLoadingOrgs(true);
//     try {
//       const res = await fetch("/api/organizations");
//       if (res.ok) {
//         setOrganizations(await res.json());
//       }
//     } finally {
//       setLoadingOrgs(false);
//     }
//   };

//   const onSubmit = async (data: SignupFormValues) => {
//     setMessage("");

//     const payload =
//       data.userStatus === "ceo"
//         ? {
//             username: data.username,
//             email: data.email,
//             password: data.password,
//             userStatus: "ceo" as const,
//             organizationName: data.organizationName!,
//           }
//         : {
//             username: data.username,
//             email: data.email,
//             password: data.password,
//             userStatus: "employee" as const,
//             organizationId: data.organizationId!,
//           };

//     await signup(payload);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Sign Up</h2>

//         <input
//           {...register("username")}
//           placeholder="Full Name"
//           className="border px-3 py-2 rounded"
//         />
//         {errors.username && (
//           <p className="text-red-500 text-sm">{errors.username.message}</p>
//         )}

//         <input
//           {...register("email")}
//           type="email"
//           placeholder="Email"
//           className="border px-3 py-2 rounded"
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm">{errors.email.message}</p>
//         )}

//         <input
//           {...register("password")}
//           type="password"
//           placeholder="Password"
//           className="border px-3 py-2 rounded"
//         />
//         {errors.password && (
//           <p className="text-red-500 text-sm">{errors.password.message}</p>
//         )}

//         <select
//           {...register("userStatus")}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="employee">Employee</option>
//           <option value="ceo">CEO</option>
//         </select>

//         {userStatus === "ceo" ? (
//           <>
//             <input
//               {...register("organizationName")}
//               placeholder="Organization Name"
//               className="border px-3 py-2 rounded"
//             />
//             {errors.organizationName && (
//               <p className="text-red-500 text-sm">
//                 {errors.organizationName.message}
//               </p>
//             )}
//           </>
//         ) : (
//           <>
//             {loadingOrgs ? (
//               <div className="border px-3 py-2 rounded text-gray-500">
//                 Loading organizations...
//               </div>
//             ) : (
//               <>
//                 <select
//                   {...register("organizationId")}
//                   className="border px-3 py-2 rounded"
//                 >
//                   <option value="">-- Select Organization --</option>
//                   {organizations.map((org) => (
//                     <option key={org._id} value={org._id}>
//                       {org.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.organizationId && (
//                   <p className="text-red-500 text-sm">
//                     {errors.organizationId.message}
//                   </p>
//                 )}
//               </>
//             )}
//           </>
//         )}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
//         >
//           {isSubmitting ? "Signing Up..." : "Sign Up"}
//         </button>

//         {message && (
//           <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
//             {message}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }
