import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "emerald";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles: semantic button, focus-visible keyboard ring, active feedback
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles: Record<string, string> = {
      primary:
        "bg-[#059669] text-white hover:bg-[#047857] shadow-sm shadow-emerald-700/10 border border-transparent",
      emerald:
        "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/80 shadow-xs",
      outline:
        "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs",
      ghost:
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent",
      destructive:
        "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 shadow-xs",
    };

    const sizeStyles: Record<string, string> = {
      sm: "h-8 px-3 text-[12px] gap-1.5",
      md: "h-9.5 px-4 text-[13px] gap-2",
      lg: "h-11 px-5 text-[14px] gap-2.5",
      icon: "size-9 p-0 text-[13px]",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${
          sizeStyles[size] || sizeStyles.md
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          leftIcon && <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
