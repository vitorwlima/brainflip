"use client";

import { useUserId } from "@/lib/utils/user-id";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Select, SelectOption } from "@/components/ui/select";
import { Fieldset } from "@/components/ui/fieldset";
import { categoryOptions, difficultyOptions } from "@/data/game-options";
import { PageHeader } from "./page-header";
import { Loading } from "./loading";
import { GameNotFound } from "./game-not-found";
import { PlayerNotInGame } from "./player-not-in-game";
import { Button } from "@/components/ui/button";

export const LobbyView = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const userId = useUserId();

  const [isPending, startTransition] = useTransition();

  const game = useQuery(api.games.getGameByRoomCode, { roomCode });
  const updateGameSettings = useMutation(api.games.updateGameSettings);

  const player = game?.players.find((player) => player.id === userId);
  const isPlayerInGame = Boolean(player);
  const isPlayerTheHost = Boolean(player?.isHost);

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
        <PageHeader roomCode={roomCode} />

        <section className="mt-12 flex w-full max-w-4xl flex-col gap-10 rounded-[2.5rem] border border-white/25 bg-white/12 p-8 shadow-[0_40px_120px_-45px_rgba(15,118,169,0.8)] backdrop-blur-2xl sm:p-10">
          <Loading show={isLoading} />

          <GameNotFound roomCode={roomCode} show={!isLoading && !hasGame} />

          <PlayerNotInGame
            roomCode={roomCode}
            show={!isLoading && hasGame && !isPlayerInGame}
          />

          {hasGame && isPlayerInGame ? (
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
                    disabled={isPending || !isPlayerTheHost}
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
                    disabled={isPending || !isPlayerTheHost}
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

              {isPlayerTheHost && (
                <div className="flex justify-end">
                  <Button variant="primary" size="md" disabled={isPending}>
                    Start Game
                  </Button>
                </div>
              )}
            </>
          ) : null}
        </section>
      </div>
    </main>
  );
};
