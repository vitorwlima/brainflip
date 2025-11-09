"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils/classname";

const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectPortal = SelectPrimitive.Portal;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-left text-white shadow-lg shadow-sky-900/10 transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500/40",
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectIcon = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Icon>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Icon
    ref={ref}
    className={cn("text-white/80", className)}
    {...props}
  />
));
SelectIcon.displayName = SelectPrimitive.Icon.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
  (
    { className, children, position = "popper", sideOffset = 12, ...props },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-3xl min-w-[200px] border border-white/25 bg-sky-950/95 backdrop-blur-xl shadow-[0_20px_60px_-25px_rgba(15,118,169,0.75)]",
          className
        )}
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectViewport = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Viewport
    ref={ref}
    className={cn("flex flex-col gap-1 p-3", className)}
    {...props}
  />
));
SelectViewport.displayName = SelectPrimitive.Viewport.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex items-center justify-center bg-white/5 py-1 text-white/80",
      className
    )}
    {...props}
  />
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex items-center justify-center bg-white/5 py-1 text-white/80",
      className
    )}
    {...props}
  />
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative cursor-pointer select-none rounded-2xl px-4 py-3 text-sm text-sky-100 outline-none transition-colors data-highlighted:bg-white/15",
      className
    )}
    {...props}
  >
    {children}
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectItemText = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ItemText>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ItemText
    ref={ref}
    className={cn("text-sm text-sky-100", className)}
    {...props}
  />
));
SelectItemText.displayName = SelectPrimitive.ItemText.displayName;

const SelectItemIndicator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ItemIndicator
    ref={ref}
    className={cn(
      "absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300",
      className
    )}
    {...props}
  />
));
SelectItemIndicator.displayName = SelectPrimitive.ItemIndicator.displayName;

type SelectOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  indicator?: React.ReactNode;
};

type PrimitiveSelectProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
>;

type SimpleSelectProps = Omit<PrimitiveSelectProps, "children"> & {
  placeholder?: React.ReactNode;
  options: SelectOption[];
  emptyMessage?: React.ReactNode;
  renderOption?: (option: SelectOption) => React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  viewportClassName?: string;
  icon?: React.ReactNode;
  scrollUpIcon?: React.ReactNode;
  scrollDownIcon?: React.ReactNode;
};

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SimpleSelectProps
>(
  (
    {
      options,
      placeholder,
      emptyMessage,
      renderOption,
      triggerClassName,
      contentClassName,
      itemClassName,
      viewportClassName,
      icon,
      scrollUpIcon,
      scrollDownIcon,
      ...props
    },
    ref
  ) => {
    const triggerIcon = icon ?? (
      <ChevronDown className="h-4 w-4" aria-hidden="true" />
    );
    const upIcon = scrollUpIcon ?? (
      <ChevronUp className="h-4 w-4" aria-hidden="true" />
    );
    const downIcon = scrollDownIcon ?? (
      <ChevronDown className="h-4 w-4" aria-hidden="true" />
    );

    return (
      <SelectRoot {...props}>
        <SelectTrigger ref={ref} className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
          <SelectIcon>{triggerIcon}</SelectIcon>
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          <SelectScrollUpButton>{upIcon}</SelectScrollUpButton>
          <SelectViewport className={viewportClassName}>
            {options.length === 0 && emptyMessage ? (
              <div className="px-4 py-3 text-sm text-sky-200">
                {emptyMessage}
              </div>
            ) : null}
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={itemClassName}
              >
                {renderOption ? (
                  <>
                    <SelectItemText className="sr-only">
                      {option.label}
                    </SelectItemText>
                    {renderOption(option)}
                  </>
                ) : (
                  <div className="flex flex-col">
                    <SelectItemText className="text-sm font-semibold text-sky-50">
                      {option.label}
                    </SelectItemText>
                    {option.description ? (
                      <span className="text-xs text-sky-300/80">
                        {option.description}
                      </span>
                    ) : null}
                  </div>
                )}
                <SelectItemIndicator>
                  {option.indicator ?? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  )}
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectViewport>
          <SelectScrollDownButton>{downIcon}</SelectScrollDownButton>
        </SelectContent>
      </SelectRoot>
    );
  }
);
Select.displayName = "Select";

export {
  Select,
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectPortal,
  SelectTrigger,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
};

export type { SelectOption, SimpleSelectProps };
