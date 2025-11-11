"use client";

import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { useUserId } from "@/lib/utils/user-id";
import { cn } from "@/lib/utils/classname";

const SAMPLE_CARDS = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  label: String.fromCharCode(65 + (index % 24)),
}));

export const InGameView = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const userId = useUserId();

  const game = useQuery(api.games.getGameByRoomCode, { roomCode });
  if (!game) return null;

  const activePlayer = game.players.find(
    (player) => player.id === game.playerToPlay
  );

  const onPlayCard = (card: string) => {
    console.log(card);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-sky-300 via-sky-400 to-sky-600 text-sky-950">
      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col items-center justify-center ">
        <section>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold uppercase tracking-widest text-white/85">
                  Memory Board
                </h2>
                <p className="text-sm text-white/70">
                  Match the pairs to climb the leaderboard.
                </p>
              </div>
              {activePlayer ? (
                <div className="flex flex-col items-start gap-2 text-left sm:items-end sm:text-right">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/70">
                    Taking Turn
                  </span>
                  <span className="rounded-full border border-emerald-200/60 bg-emerald-200/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-50">
                    {activePlayer.username}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3 grid-cols-12">
              {SAMPLE_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="flex size-28 aspect-square items-center justify-center rounded-3xl border border-white/25 bg-white/12 text-xl font-semibold uppercase tracking-[0.35em] text-white/85 shadow-[0_25px_80px_-45px_rgba(15,118,169,0.65)] transition duration-200 hover:border-white/40 hover:bg-white/20 hover:text-white"
                >
                  {card.label}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-lg mt-10 font-semibold uppercase tracking-widest text-white/85">
            Players
          </h2>
          <ul className="grid gap-4 mt-3 sm:grid-cols-2 lg:grid-cols-3">
            {game.players.map((player) => {
              const isCurrent = player.id === game.playerToPlay;
              const isYou = player.id === userId;

              return (
                <li
                  key={player.id}
                  className={cn(
                    "flex flex-col gap-3 rounded-2xl border border-white/25 bg-white/12 px-5 py-4 text-white/90 shadow-[0_20px_70px_-55px_rgba(15,118,169,0.6)] transition duration-200",
                    isCurrent &&
                      "border-emerald-200/70 bg-emerald-200/20 shadow-[0_30px_90px_-55px_rgba(16,185,129,0.7)]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-semibold uppercase tracking-widest">
                      {player.username}
                    </span>
                    <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
                      {player.score.toString().padStart(2, "0")} pts
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em]">
                    <span className="text-white/60">{isYou ? "You" : ""}</span>
                    <span
                      className={cn(
                        "font-semibold",
                        isCurrent ? "text-emerald-100" : "text-white/55"
                      )}
                    >
                      {isCurrent && isYou
                        ? "Your Turn"
                        : isCurrent
                        ? "Their Turn"
                        : "Waiting"}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};
