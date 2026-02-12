"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from "@/context/ThemeContext";
import { themes } from "@/lib/themes";

export interface CheckboxFieldProps {
  id: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  subLabel?: string;
}

export const CheckboxField = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxFieldProps
>(
  (
    { id, label, subLabel, checked, disabled, onCheckedChange, className },
    ref,
  ) => {
    const { theme } = useTheme();
    const colors = themes[theme];

    return (
      <div
        className={`flex ${subLabel ? "items-baseline" : "items-center"} space-x-3 ${className}`}
      >
        <Checkbox
          ref={ref}
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(value) => onCheckedChange?.(Boolean(value))}
          className=""
        />
        {label && (
          <div className={`flex flex-col ${subLabel ? "-translate-y-1" : ""}`}>
            <label htmlFor={id} className="text-sm font-medium cursor-pointer">
              {label}
            </label>
            {subLabel && (
              <p className={`text-xs ${colors.textMuted}`}>{subLabel}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

CheckboxField.displayName = "CheckboxField";
