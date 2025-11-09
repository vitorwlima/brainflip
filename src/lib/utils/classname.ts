import { ClassNameValue, twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassNameValue[]): string => {
  return twMerge(...inputs);
}