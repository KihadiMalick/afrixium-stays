import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?:    "sm" | "md" | "lg";
  loading?: boolean;
}

const variants = {
  primary:   "bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-glow",
  secondary: "bg-dark-900 hover:bg-dark-800 text-white",
  outline:   "bg-transparent border-2 border-brand-500 text-brand-600 hover:bg-brand-50",
  ghost:     "bg-transparent hover:bg-dark-100 text-dark-700",
  danger:    "bg-red-500 hover:bg-red-600 text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size    = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold",
        "transition-all duration-200 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
