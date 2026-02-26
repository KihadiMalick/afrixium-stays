import { cn } from "@/lib/utils";

interface CardProps {
  children:   React.ReactNode;
  className?: string;
  padding?:   "none" | "sm" | "md" | "lg";
  hover?:     boolean;
  onClick?:   () => void;
}

const paddings = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export function Card({
  children,
  className,
  padding = "md",
  hover   = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "card",
        paddings[padding],
        hover && "cursor-pointer hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 pb-4 border-b border-dark-100", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-dark-900", className)}>
      {children}
    </h3>
  );
}
