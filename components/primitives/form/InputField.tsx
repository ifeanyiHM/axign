import React from "react";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

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

        {error && (
          <span className=" flex items-center gap-1 text-xs text-red-500">
            <AlertCircle size={12} className="sm:w-3 sm:h-3" />
            {error}
          </span>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
