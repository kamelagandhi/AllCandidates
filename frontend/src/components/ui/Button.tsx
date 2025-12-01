// frontend/src/components/ui/Button.tsx
import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({ variant = "primary", size = "md", icon, children, className = "", ...rest }: Props) {
  const base = "inline-flex items-center gap-2 rounded-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1";
  const sizes: Record<Size, string> = { sm: "px-3 py-1 text-sm h-9", md: "px-4 py-2 text-sm" };
  const variants: Record<Variant, string> = {
    primary: "bg-[var(--primary-blue)] text-white hover:bg-[var(--primary-blue-hover)]",
    secondary: "bg-white border border-[var(--border-gray)] text-[#374151] hover:bg-[var(--bg-gray-50)]",
    ghost: "bg-transparent text-[#374151] hover:bg-[var(--bg-gray-50)]",
  };
  const cls = [base, sizes[size], variants[variant], className, rest.disabled ? "opacity-50 cursor-not-allowed" : ""].filter(Boolean).join(" ");
  return (
    <button {...rest} className={cls}>
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
