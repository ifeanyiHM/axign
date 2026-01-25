import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
  containerClassName?: string;
  selectClassName?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      error,
      options,
      containerClassName,
      selectClassName,
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx("flex flex-col gap-1", containerClassName)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={id}
          className={clsx(
            "w-full rounded-md border px-3 py-3 text-sm",
            "outline-none transition-colors",
            "bg-transparent shadow-xs file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500 focus:ring-red-500" : "border-[#e5e5e5]",
            selectClassName,
          )}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";

export default SelectField;
