import { Game } from "@convex/schema";
import { LucideTrophy } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";

type Props = {
  game: Game;
};

export const FinishedView = ({ game }: Props) => {
  const sortedPlayers = [...game.players].sort((a, b) => b.score - a.score);
  const topScore = sortedPlayers[0]?.score ?? 0;
  const winners =
    sortedPlayers.length === 0
      ? []
      : sortedPlayers.filter((player) => player.score === topScore);

  const winnerNames =
    winners.length > 0
      ? winners.map((player) => player.username)
      : ["Everyone"];

  const hasMultipleWinners = winnerNames.length > 1;

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-sky-200 via-sky-400 to-sky-600 text-sky-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-white/35 blur-3xl" />
        <div className="absolute -bottom-40 -right-12 h-96 w-96 rounded-full bg-emerald-300/35 blur-3xl" />
        <div className="absolute inset-x-12 top-1/3 h-56 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center p-4 md:px-6 md:py-24">
        <section className="flex w-full max-w-3xl flex-col items-center gap-8 rounded-[3rem] border border-white/25 bg-white/12 px-10 py-16 text-center shadow-[0_40px_120px_-45px_rgba(15,118,169,0.8)] backdrop-blur-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-[0_20px_60px_-30px_rgba(15,118,169,0.75)]">
            <LucideTrophy className="size-8" />
          </div>

          <div className="flex flex-col gap-4">
            <h1
              className={cn(
                "text-3xl text-white drop-shadow-sm md:text-4xl lg:text-5xl",
                dynaPuff.className
              )}
            >
              Game Over
            </h1>

            <p className="text-base font-semibold uppercase tracking-[0.35em] text-white/80 md:text-lg">
              {hasMultipleWinners ? "Champions" : "Champion"}
            </p>

            <p className="text-2xl font-semibold text-white md:text-3xl">
              {winnerNames.join(" & ")}
            </p>

            <p className="text-sm text-white/75 md:text-base">
              Congratulations{hasMultipleWinners ? "" : ","}{" "}
              {winnerNames.join(" & ")}!{" "}
              {hasMultipleWinners
                ? "You share the crown this round."
                : "You conquered the board."}
            </p>
          </div>

          <Button variant="primary" size="md" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </section>
      </div>
    </main>
  );
};
