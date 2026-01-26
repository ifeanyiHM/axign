import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      containerClassName = "",
      labelClassName = "",
      inputClassName = "",
      id,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <div className={`flex flex-col gap-1 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className={`text-sm font-medium text-[#0f172a] ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <Input
          ref={ref}
          id={id}
          className={inputClassName}
          aria-invalid={!!error}
          {...inputProps}
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;

// import React from "react";

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   error?: string;
//   containerClassName?: string;
//   labelClassName?: string;
//   inputClassName?: string;
// }

// const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
//   (
//     {
//       label,
//       error,
//       containerClassName = "",
//       labelClassName = "",
//       inputClassName = "",
//       id,
//       ...inputProps
//     },
//     ref,
//   ) => {
//     return (
//       <div className={`flex flex-col gap-1 ${containerClassName}`}>
//         {label && (
//           <label
//             htmlFor={id}
//             className={`text-sm font-medium text-gray-700 ${labelClassName}`}
//           >
//             {label}
//           </label>
//         )}

//         <input
//           ref={ref}
//           id={id}
//           className={`
//             w-full rounded-md border px-3 py-3
//             outline-none transition-colors
//             border-input bg-transparent shadow-xs file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50
//             ${
//               error
//                 ? "border-red-500 focus:ring-2 focus:ring-red-400"
//                 : "border-[#e5e5e5] focus:ring-2 focus:ring-black/70"
//             }
//             ${inputClassName}
//           `}
//           {...inputProps}
//         />

//         {error && <span className="text-xs text-red-500">{error}</span>}
//       </div>
//     );
//   },
// );

// InputField.displayName = "InputField";

// export default InputField;
