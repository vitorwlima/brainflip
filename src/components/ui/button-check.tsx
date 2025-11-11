import { cn } from "@/lib/utils/classname";
import { Check } from "lucide-react";

type Props = {
  show: boolean;
  children: React.ReactNode;
};

export const ButtonCheck = ({ show, children }: Props) => {
  return (
    <>
      <div
        className={cn(
          "transition-all duration-200",
          show ? "opacity-0 scale-70" : "opacity-100 scale-100"
        )}
      >
        {children}
      </div>
      <Check
        className={cn(
          "size-4 absolute left-1/2 top-1/2 duration-200 transition-all -translate-x-1/2 -translate-y-1/2",
          show ? "opacity-100 scale-100" : "opacity-0 scale-0"
        )}
      />
    </>
  );
};
