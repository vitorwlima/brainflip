"use client";

import { useState, type FormEvent } from "react";
import { ViewTransition } from "react";

import { Select, type SelectOption } from "@/components/ui/select";
import { Fieldset } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";

const categoryOptions: SelectOption[] = [
  { value: "classic", label: "Classic Deck" },
  { value: "animals", label: "Animals" },
  { value: "space", label: "Cosmic" },
  { value: "fruits", label: "Fruits" },
];

const difficultyOptions: SelectOption[] = [
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
  { value: "hard", label: "Hard", description: "64 cards · 32 pairs" },
  {
    value: "extreme",
    label: "Extreme",
    description: "80 cards · 40 pairs",
  },
];

const CreatePage = () => {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState<SelectOption["value"]>();
  const [difficulty, setDifficulty] = useState<SelectOption["value"]>();

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
              <Input
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="How should other players call you?"
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <Fieldset
                label="Category"
                description="Pick a theme to match cards."
              >
                <Select
                  value={category}
                  onValueChange={setCategory}
                  placeholder="Choose category"
                  options={categoryOptions}
                />
              </Fieldset>

              <Fieldset
                label="Difficulty"
                description="Select the number of cards."
              >
                <Select
                  value={difficulty}
                  onValueChange={setDifficulty}
                  placeholder="Choose difficulty"
                  options={difficultyOptions}
                />
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

export default CreatePage;
