import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  className = "",
  variant = "neutral",
  size = "md",
  dot = false,
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, { bg: string; dot: string }> = {
    success: {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      dot: "bg-emerald-500",
    },
    warning: {
      bg: "bg-amber-50 text-amber-700 border-amber-200/80",
      dot: "bg-amber-500",
    },
    danger: {
      bg: "bg-rose-50 text-rose-700 border-rose-200/80",
      dot: "bg-rose-500",
    },
    info: {
      bg: "bg-blue-50 text-blue-700 border-blue-200/80",
      dot: "bg-blue-500",
    },
    neutral: {
      bg: "bg-slate-100 text-slate-700 border-slate-200/80",
      dot: "bg-slate-400",
    },
  };

  const current = variantStyles[variant] || variantStyles.neutral;
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-lg border ${current.bg} ${sizeClasses} ${className}`}
      {...props}
    >
      {dot && <span className={`size-1.5 rounded-full ${current.dot}`} aria-hidden="true" />}
      {children}
    </span>
  );
}
