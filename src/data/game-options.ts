import type { SelectOption } from "@/components/ui/select";

export const categoryOptions: SelectOption[] = [
  { value: "classic", label: "Classic Deck" },
  { value: "animals", label: "Animals" },
  { value: "space", label: "Cosmic" },
  { value: "fruits", label: "Fruits" },
];

export const difficultyOptions: SelectOption[] = [
  {
    value: "easy",
    label: "Easy",
    description: "32 cards · 16 pairs",
  },
  {
    value: "medium",
    label: "Medium",
    description: "48 cards · 24 pairs",
  },
  {
    value: "hard",
    label: "Hard",
    description: "64 cards · 32 pairs",
  },
  {
    value: "extreme",
    label: "Extreme",
    description: "80 cards · 40 pairs",
  },
];

