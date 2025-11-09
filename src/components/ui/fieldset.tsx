import * as React from "react";

import { cn } from "@/lib/utils/classname";

type FieldsetProps = {
  label: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  legendClassName?: string;
  descriptionClassName?: string;
};

const Fieldset = ({
  label,
  description,
  children,
  className,
  legendClassName,
  descriptionClassName,
}: FieldsetProps) => {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend
        className={cn(
          "text-sm font-semibold uppercase tracking-wider text-white/90",
          legendClassName
        )}
      >
        {label}
      </legend>
      {description ? (
        <p
          className={cn(
            "text-xs uppercase tracking-wide text-white/60",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </fieldset>
  );
};

export { Fieldset };

