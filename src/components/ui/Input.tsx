import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:   string;
  error?:   string;
  hint?:    string;
  icon?:    React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-dark-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "input-base",
            icon && "pl-10",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-sm text-dark-400">{hint}</p>
      )}
    </div>
  );
}
