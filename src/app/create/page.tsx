"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { ViewTransition } from "react";

import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";

type CategoryOption = {
  value: string;
  label: string;
};

type DifficultyOption = {
  value: string;
  label: string;
  detail: string;
};

const categoryOptions: CategoryOption[] = [
  { value: "classic", label: "Classic Deck" },
  { value: "animals", label: "Animals" },
  { value: "space", label: "Cosmic" },
  { value: "fruits", label: "Fruits" },
];

const difficultyOptions: DifficultyOption[] = [
  { value: "easy", label: "Easy", detail: "8 cards · Slow flips" },
  { value: "medium", label: "Medium", detail: "16 cards · Balanced" },
  { value: "hard", label: "Hard", detail: "24 cards · Speedy play" },
];

const selectTriggerClasses =
  "flex w-full items-center justify-between gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-left text-white shadow-lg shadow-sky-900/10 transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500/40";

const selectContentClasses =
  "z-50 overflow-hidden rounded-3xl border border-white/25 bg-sky-950/95 backdrop-blur-xl shadow-[0_20px_60px_-25px_rgba(15,118,169,0.75)]";

const selectItemClasses =
  "relative cursor-pointer select-none rounded-2xl px-4 py-3 text-sm text-sky-100 outline-none transition-colors data-[highlighted]:bg-white/15";

const CreatePage = () => {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState<CategoryOption["value"]>();
  const [difficulty, setDifficulty] = useState<DifficultyOption["value"]>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-sky-200 via-sky-400 to-sky-600 text-sky-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-white/35 blur-3xl" />
        <div className="absolute -bottom-40 -right-12 h-96 w-96 rounded-full bg-emerald-300/35 blur-3xl" />
        <div className="absolute inset-x-12 top-1/3 h-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center p-4 md:px-6 md:py-24">
        <header className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 rounded-[3rem] border border-white/25 bg-white/10 px-8 py-12 text-center shadow-[0_30px_90px_-35px_rgba(15,118,169,0.7)] backdrop-blur-2xl">
          <ViewTransition name="create-game">
            <h1
              className={cn(
                "text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl lg:text-5xl",
                dynaPuff.className
              )}
            >
              Create Game
            </h1>
          </ViewTransition>
          <p className="max-w-xl text-base text-sky-50/90 md:text-lg">
            Set up a new match, invite your friends, and choose the challenge
            that fits your vibe.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-12 w-full max-w-3xl rounded-[2.5rem] border border-white/25 bg-white/12 p-8 shadow-[0_40px_120px_-45px_rgba(15,118,169,0.8)] backdrop-blur-2xl sm:p-10"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="username"
                className="text-sm font-semibold uppercase tracking-wider text-white/90"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="How should players call you?"
                className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-base text-white placeholder:text-white/60 shadow-lg shadow-sky-900/10 transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500/40"
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <Fieldset
                label="Category"
                description="Pick a theme to match cards."
              >
                <Select.Root value={category} onValueChange={setCategory}>
                  <Select.Trigger className={selectTriggerClasses}>
                    <Select.Value placeholder="Choose category" />
                    <Select.Icon className="text-white/80">
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      className={selectContentClasses}
                      position="popper"
                      sideOffset={12}
                    >
                      <Select.ScrollUpButton className="flex items-center justify-center bg-white/5 py-1 text-white/80">
                        <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="flex flex-col gap-1 p-3">
                        {categoryOptions.map((option) => (
                          <Select.Item
                            key={option.value}
                            value={option.value}
                            className={selectItemClasses}
                          >
                            <Select.ItemText>{option.label}</Select.ItemText>
                            <Select.ItemIndicator className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300">
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                      <Select.ScrollDownButton className="flex items-center justify-center bg-white/5 py-1 text-white/80">
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </Fieldset>

              <Fieldset
                label="Difficulty"
                description="Select the number of cards."
              >
                <Select.Root value={difficulty} onValueChange={setDifficulty}>
                  <Select.Trigger className={selectTriggerClasses}>
                    <Select.Value placeholder="Choose difficulty" />
                    <Select.Icon className="text-white/80">
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content
                      className={selectContentClasses}
                      position="popper"
                      sideOffset={12}
                    >
                      <Select.ScrollUpButton className="flex items-center justify-center bg-white/5 py-1 text-white/80">
                        <ChevronUp className="h-4 w-4" aria-hidden="true" />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="flex flex-col gap-1 p-3">
                        {difficultyOptions.map((option) => (
                          <Select.Item
                            key={option.value}
                            value={option.value}
                            className={selectItemClasses}
                          >
                            <Select.ItemText>
                              <span className="block text-sm font-semibold">
                                {option.label}
                              </span>
                              <span className="block text-xs text-sky-300/80">
                                {option.detail}
                              </span>
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300">
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                      <Select.ScrollDownButton className="flex items-center justify-center bg-white/5 py-1 text-white/80">
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </Fieldset>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/25 bg-white/10 p-6 text-center text-sm text-white/80">
              <p>
                Your lobby link will be generated after you create the game.
                Share it with your friends to start flipping!
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:gap-6">
              <button
                type="button"
                className="w-full rounded-full border border-white/40 bg-white/20 px-8 py-3 text-base font-semibold text-white shadow-md shadow-sky-900/20 transition-colors duration-200 hover:bg-white/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full rounded-full bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-10 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/40 transition-colors duration-200 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60 sm:w-auto"
              >
                Create Lobby
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

type FieldsetProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

const Fieldset = ({ label, description, children }: FieldsetProps) => {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-semibold uppercase tracking-wider text-white/90">
        {label}
      </legend>
      {description ? (
        <p className="text-xs uppercase tracking-wide text-white/60">
          {description}
        </p>
      ) : null}
      {children}
    </fieldset>
  );
};

export default CreatePage;
