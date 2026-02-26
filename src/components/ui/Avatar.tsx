import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?:       string | null;
  name?:      string;
  size?:      "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: { px: 32,  cls: "w-8 h-8 text-xs" },
  md: { px: 40,  cls: "w-10 h-10 text-sm" },
  lg: { px: 56,  cls: "w-14 h-14 text-base" },
  xl: { px: 80,  cls: "w-20 h-20 text-xl" },
};

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const { px, cls } = sizes[size];

  if (src) {
    return (
      <div className={cn("relative rounded-full overflow-hidden", cls, className)}>
        <Image
          src={src}
          alt={name ?? "Avatar"}
          width={px}
          height={px}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-brand-100 text-brand-700 font-semibold",
        "flex items-center justify-center flex-shrink-0",
        cls,
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
