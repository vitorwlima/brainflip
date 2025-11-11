"use client";

import { useEffect, useState, useTransition } from "react";
import { ViewTransition } from "react";
import { useMutation, useQuery } from "convex/react";

import { Fieldset } from "@/components/ui/fieldset";
import { Select, type SelectOption } from "@/components/ui/select";
import { categoryOptions, difficultyOptions } from "@/data/game-options";
import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";
import { api } from "@convex/_generated/api";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserId } from "@/lib/utils/user-id";

const GamePage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const userId = useUserId();

  const [isPending, startTransition] = useTransition();
  const [copiedType, setCopiedType] = useState<"code" | "link" | null>(null);

  const game = useQuery(api.games.getGameByRoomCode, { roomCode });
  const updateGameSettings = useMutation(api.games.updateGameSettings);

  useEffect(() => {
    if (!copiedType) {
      return;
    }

    const timeout = window.setTimeout(() => setCopiedType(null), 2000);
    return () => window.clearTimeout(timeout);
  }, [copiedType]);

  const handleCopy = async (value: string | null, type: "code" | "link") => {
    if (!value) {
      return;
    }

    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.clipboard?.writeText === "function"
      ) {
        await navigator.clipboard.writeText(value);
        setCopiedType(type);
      }
    } catch (error) {
      console.error("Failed to copy text", error);
    }
  };

  const handleSelectChange =
    (field: "category" | "difficulty") => (value: SelectOption["value"]) => {
      if (!game?._id) {
        return;
      }

      if (game[field] === value) {
        return;
      }

      startTransition(() => {
        updateGameSettings({
          gameId: game._id,
          [field]: value,
        });
      });
    };

  const isLoading = game === undefined;
  const hasGame = !isLoading && game !== null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-sky-200 via-sky-400 to-sky-600 text-sky-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-white/35 blur-3xl" />
        <div className="absolute -bottom-40 -right-12 h-96 w-96 rounded-full bg-emerald-300/35 blur-3xl" />
        <div className="absolute inset-x-12 top-1/3 h-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center p-4 md:px-6 md:py-24">
        <ViewTransition name="page-block">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 rounded-[2.75rem] border border-white/25 bg-white/10 px-8 py-10 text-center shadow-[0_30px_90px_-35px_rgba(15,118,169,0.7)] backdrop-blur-2xl">
            <ViewTransition name="page-title">
              <h1
                className={cn(
                  "text-3xl text-white drop-shadow-sm md:text-4xl lg:text-5xl",
                  dynaPuff.className
                )}
              >
                Game Lobby
              </h1>
            </ViewTransition>
            <p className="max-w-xl text-base text-sky-50/90 md:text-lg">
              Manage the game settings and keep an eye on the lobby while
              everyone gets ready to flip.
            </p>
            <div className="flex w-full flex-col items-center gap-4 rounded-[1.75rem] border border-white/30 bg-white/12 px-6 py-5 text-white/85 shadow-[0_25px_80px_-45px_rgba(15,118,169,0.75)] backdrop-blur-xl sm:flex-row sm:justify-between sm:px-8">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-xs uppercase tracking-wider text-white/70">
                  Room Code
                </span>
                <span className="text-xl font-semibold tracking-[0.35em] text-white">
                  {roomCode}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(roomCode, "code")}
                >
                  {copiedType === "code" ? "Copied!" : "Copy Code"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleCopy(
                      `${process.env.NEXT_PUBLIC_HOST}/game/${roomCode}`,
                      "link"
                    )
                  }
                >
                  {copiedType === "link" ? "Link Copied!" : "Copy Invite Link"}
                </Button>
              </div>
            </div>
          </div>
        </ViewTransition>

        <section className="mt-12 flex w-full max-w-4xl flex-col gap-10 rounded-[2.5rem] border border-white/25 bg-white/12 p-8 shadow-[0_40px_120px_-45px_rgba(15,118,169,0.8)] backdrop-blur-2xl sm:p-10">
          {isLoading ? (
            <div className="flex min-h-[200px] items-center justify-center text-sm uppercase tracking-[0.3em] text-white/70">
              Loading game…
            </div>
          ) : null}

          {!isLoading && !hasGame ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-3xl border border-white/30 bg-white/10 p-8 text-center text-white/80">
              <h2 className="text-2xl font-semibold text-white">
                Game not found
              </h2>
              <p className="max-w-sm text-sm">
                We couldn&apos;t find a game with the code{" "}
                <span className="font-medium">{roomCode}</span>. Double-check
                the code or ask your host for a new invite.
              </p>
            </div>
          ) : null}

          {hasGame ? (
            <>
              <div className="grid gap-8 lg:grid-cols-2">
                <Fieldset
                  label="Category"
                  description="Pick the deck theme everyone will play with."
                >
                  <Select
                    value={game.category}
                    onValueChange={handleSelectChange("category")}
                    placeholder="Choose category"
                    options={categoryOptions}
                    disabled={isPending}
                  />
                </Fieldset>
                <Fieldset
                  label="Difficulty"
                  description="Choose how many cards the board will have."
                >
                  <Select
                    value={game.difficulty}
                    onValueChange={handleSelectChange("difficulty")}
                    placeholder="Choose difficulty"
                    options={difficultyOptions}
                    disabled={isPending}
                  />
                </Fieldset>
              </div>

              <div className="flex flex-col gap-5 rounded-3xl border border-white/30 bg-white/10 p-6">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold uppercase tracking-widest text-white/80">
                    Players in Lobby
                  </h2>
                  <span className="rounded-full border border-white/40 bg-white/15 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                    {game.players.length}{" "}
                    {game.players.length === 1 ? "Player" : "Players"}
                  </span>
                </div>
                {game.players.length === 0 ? (
                  <div className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-10 text-sm uppercase tracking-[0.25em] text-white/60">
                    Waiting for players to join…
                  </div>
                ) : (
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {game.players.map((player) => (
                      <li
                        key={player.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/25 bg-white/12 px-5 py-4 text-white/90 shadow-[0_20px_60px_-35px_rgba(15,118,169,0.65)]"
                      >
                        <span className="text-sm font-semibold uppercase tracking-widest">
                          {player.username}
                        </span>

                        {player.id === userId ? (
                          <span className="rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/85">
                            You
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default GamePage;
