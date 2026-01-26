import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle, Info, AlertTriangle, X, Ban } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Variant styles
───────────────────────────────────────────── */

const alertVariants = cva(
  //  "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[21.813rem] rounded-lg border p-4 text-sm",
  "relative w-full rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "bg-green-50 border border-green-200 text-green-700",
        info: "border-blue-200 bg-blue-50 text-blue-800",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
        danger: "border-red-200 bg-red-50 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// const alertVariants = cva(
//   "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
//   {
//     variants: {
//       variant: {
//         default: "bg-card text-card-foreground",
//         danger:
//           "border-red-200 bg-red-50 text-red-800 [&>svg]:text-red-600 *:data-[slot=alert-description]:text-red-700",
//         success:
//           "bg-green-50 border border-green-200 text-green-700 [&>svg]:text-green-600 *:data-[slot=alert-description]:text-green-700",
//         warning:
//           "border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-600 *:data-[slot=alert-description]:text-yellow-700",
//         info: "border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-600 *:data-[slot=alert-description]:text-blue-700",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

/* ─────────────────────────────────────────────
   Variant → Icon mapping
───────────────────────────────────────────── */

const variantIcons = {
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  danger: Ban,
  default: Info,
};

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  footerText?: string;
  dismissible?: boolean;
  onClose?: () => void;
}

/* ─────────────────────────────────────────────
   Alert Component
───────────────────────────────────────────── */

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      footerText,
      dismissible = true,
      onClose,
      ...props
    },
    ref,
  ) => {
    const Icon = variantIcons[variant ?? "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {/* Close button */}
        {dismissible && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-md p-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Content */}
        <div className="flex gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0" />

          <div className="flex flex-col gap-1">
            {title && <p className="font-medium leading-none">{title}</p>}

            {description && <p className="opacity-90">{description}</p>}

            {footerText && (
              <span className="mt-2 cursor-pointer text-xs font-medium">
                {footerText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";

export { Alert };
