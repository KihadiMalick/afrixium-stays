import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title:     string;
  value:     string | number;
  subtitle?: string;
  icon:      LucideIcon;
  color?:    "brand" | "gold" | "green" | "blue";
  className?: string;
}

const colors = {
  brand: { bg: "bg-brand-50",  icon: "text-brand-500",  border: "border-brand-100" },
  gold:  { bg: "bg-gold-50",   icon: "text-gold-500",   border: "border-gold-100" },
  green: { bg: "bg-green-50",  icon: "text-green-500",  border: "border-green-100" },
  blue:  { bg: "bg-blue-50",   icon: "text-blue-500",   border: "border-blue-100" },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color     = "brand",
  className,
}: StatsCardProps) {
  const c = colors[color];

  return (
    <div className={cn("card p-5 flex items-start gap-4", className)}>
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border", c.bg, c.border)}>
        <Icon size={22} className={c.icon} />
      </div>
      <div>
        <p className="text-sm font-medium text-dark-500 mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-dark-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-dark-400 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
