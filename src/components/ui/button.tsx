"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils/classname";

type ButtonVariant = "primary" | "secondary" | "outline" | "dark";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 focus-visible:ring-emerald-400",
  secondary:
    "bg-white/20 text-white shadow-lg shadow-sky-900/20 hover:bg-white/30 focus-visible:ring-white/70",
  outline:
    "bg-white/50 text-sky-900 shadow-lg shadow-sky-300/20 hover:bg-white/80 focus-visible:ring-sky-300",
  dark: "bg-sky-900/80 text-white shadow-lg shadow-sky-900/20 hover:bg-sky-900 focus-visible:ring-sky-700/70",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-10 py-4 text-lg",
  icon: "h-10 w-10 p-0",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-center font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500/20 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
