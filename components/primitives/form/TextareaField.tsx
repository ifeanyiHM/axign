import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  rows?: number;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      error,
      containerClassName = "",
      labelClassName = "",
      textareaClassName = "",
      id,
      rows,
      ...textareaProps
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

        <Textarea
          ref={ref}
          id={id}
          rows={rows}
          className={textareaClassName}
          aria-invalid={!!error}
          {...textareaProps}
        />

        {error && (
          <span className="flex items-center gap-1 text-xs text-red-500">
            <AlertCircle size={12} className="sm:w-3 sm:h-3" />
            {error}
          </span>
        )}
      </div>
    );
  },
);

TextareaField.displayName = "TextareaField";

export default TextareaField;
