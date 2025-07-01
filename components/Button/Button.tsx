import React, { forwardRef } from "react";
import { cn } from "@/utils/classes";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-sapphire text-white hover:bg-sapphire-600 border border-sapphire-600",
  secondary: "bg-hot-cinnamon text-white hover:bg-sapphire",
  outline:
    "border border-gray-300 bg-gray-50 hover:bg-gray-100 hover:text-accent-foreground dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:hover:text-white",
  danger: "bg-red-500 text-white hover:bg-red-600 border border-red-600",
  ghost:
    "hover:bg-gray-100 text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  icon: "p-2 text-base aspect-square min-h-8",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", icon, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded focus-visible-ring inline-flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer font-medium text-md disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
