import { cn } from "@/lib/utils/classname";
import { Loader2 } from "lucide-react";

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const ButtonLoader = ({ isLoading, children }: Props) => {
  return (
    <>
      <div
        className={cn(
          "transition-all duration-200",
          isLoading ? "opacity-0 scale-70" : "opacity-100 scale-100"
        )}
      >
        {children}
      </div>
      <Loader2
        className={cn(
          "animate-spin size-4 absolute left-1/2 top-1/2 transition-all duration-200 -translate-x-1/2 -translate-y-1/2",
          isLoading ? "opacity-100 scale-100" : "opacity-0 scale-70"
        )}
      />
    </>
  );
};
