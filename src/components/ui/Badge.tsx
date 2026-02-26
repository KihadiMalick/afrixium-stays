import { cn } from "@/lib/utils";

interface BadgeProps {
  children:  React.ReactNode;
  variant?:  "default" | "success" | "warning" | "danger" | "info" | "gold";
  size?:     "sm" | "md";
  className?: string;
}

const variants = {
  default: "bg-dark-100 text-dark-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-orange-100 text-orange-700",
  danger:  "bg-red-100 text-red-700",
  info:    "bg-blue-100 text-blue-700",
  gold:    "bg-gold-100 text-gold-700",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  children,
  variant   = "default",
  size      = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "badge font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
