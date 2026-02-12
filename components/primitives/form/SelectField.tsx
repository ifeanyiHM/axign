import { ReactNode, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

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
  labelClassName?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode | undefined;
}

const SelectField = ({
  label,
  error,
  options,
  containerClassName,
  selectClassName,
  labelClassName,
  id,
  value,
  onValueChange,
  placeholder,
  icon,
}: SelectFieldProps) => {
  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx("text-sm font-medium", labelClassName)}
        >
          {label}
        </label>
      )}

      <Select value={value as string} onValueChange={onValueChange}>
        <SelectTrigger
          className={clsx("w-full flex items-center gap-2", selectClassName)}
          id={id}
          aria-invalid={!!error}
        >
          {icon && <span className="shrink-0">{icon}</span>}
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

      {error && (
        <p className=" flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} className="sm:w-3 sm:h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
