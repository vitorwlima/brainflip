"use client";

import { useState, type FormEvent } from "react";
import { ViewTransition } from "react";

import { Button } from "@/components/ui/button";
import { Select, type SelectOption } from "@/components/ui/select";
import { Fieldset } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";
import Link from "next/link";
import { categoryOptions, difficultyOptions } from "@/data/game-options";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUserId } from "@/lib/utils/user-id";

const CreatePage = () => {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState<SelectOption["value"]>();
  const [difficulty, setDifficulty] = useState<SelectOption["value"]>();

  const router = useRouter();
  const createGame = useMutation(api.games.createGame);
  const userId = useUserId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !category || !difficulty || !userId) {
      return;
    }

    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    await createGame({
      userId,
      username,
      category,
      difficulty,
      roomCode,
    });

    router.push(`/game/${roomCode}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-sky-200 via-sky-400 to-sky-600 text-sky-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-white/35 blur-3xl" />
        <div className="absolute -bottom-40 -right-12 h-96 w-96 rounded-full bg-emerald-300/35 blur-3xl" />
        <div className="absolute inset-x-12 top-1/3 h-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center p-4 md:px-6 md:py-24">
        <ViewTransition name="page-block">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 rounded-[3rem] border border-white/25 bg-white/10 px-8 py-12 text-center shadow-[0_30px_90px_-35px_rgba(15,118,169,0.7)] backdrop-blur-2xl">
            <ViewTransition name="page-title">
              <h1
                className={cn(
                  "text-3xl text-white drop-shadow-sm md:text-4xl lg:text-5xl",
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
          </div>
        </ViewTransition>

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
              <Button
                type="button"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                disabled={!userId}
              >
                Create Lobby
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePage;
