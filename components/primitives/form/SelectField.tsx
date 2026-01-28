import { SelectHTMLAttributes } from "react";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  label?: string;
  error?: string;
  options: Option[];
  containerClassName?: string;
  selectClassName?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

const SelectField = ({
  label,
  error,
  options,
  containerClassName,
  selectClassName,
  id,
  value,
  onValueChange,
  placeholder,
}: SelectFieldProps) => {
  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Select value={value as string} onValueChange={onValueChange}>
        <SelectTrigger
          className={clsx("w-full", selectClassName)}
          id={id}
          aria-invalid={!!error}
        >
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>

        <SelectContent>
          {options
            .filter((option) => option.value !== "")
            .map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;

// import { forwardRef, SelectHTMLAttributes } from "react";
// import clsx from "clsx";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Option {
//   label: string;
//   value: string;
// }

// interface SelectFieldProps extends Omit<
//   SelectHTMLAttributes<HTMLSelectElement>,
//   "onChange"
// > {
//   label?: string;
//   error?: string;
//   options: Option[];
//   containerClassName?: string;
//   selectClassName?: string;
//   onValueChange?: (value: string) => void;
//   placeholder?: string;
// }

// const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
//   (
//     {
//       label,
//       error,
//       options,
//       containerClassName,
//       selectClassName,
//       id,
//       value,
//       onValueChange,
//       placeholder,
//       // ...props
//     },
//     // ref,
//   ) => {
//     return (
//       <div className={clsx("flex flex-col gap-1", containerClassName)}>
//         {label && (
//           <label htmlFor={id} className="text-sm font-medium text-gray-700">
//             {label}
//           </label>
//         )}

//         <Select value={value as string} onValueChange={onValueChange}>
//           <SelectTrigger
//             className={clsx("w-full", selectClassName)}
//             id={id}
//             aria-invalid={!!error}
//           >
//             <SelectValue placeholder={placeholder || "Select an option"} />
//           </SelectTrigger>
//           <SelectContent>
//             {options
//               .filter((option) => option.value !== "")
//               .map((option) => (
//                 <SelectItem key={option.value} value={option.value}>
//                   {option.label}
//                 </SelectItem>
//               ))}
//           </SelectContent>
//         </Select>

//         {error && <p className="text-xs text-red-500">{error}</p>}
//       </div>
//     );
//   },
// );

// SelectField.displayName = "SelectField";

// export default SelectField;
