import * as React from "react";

import { cn } from "@/lib/utils/classname";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base text-white placeholder:text-white/60 shadow-lg shadow-sky-900/10 transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500/40",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

