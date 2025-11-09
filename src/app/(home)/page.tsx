import { Button } from "@/components/ui/button";
import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";
import Link from "next/link";
import { ViewTransition } from "react";

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-sky-200 via-sky-400 to-sky-600 text-sky-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-104 w-104 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute inset-x-16 top-1/2 h-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center p-4 md:px-6 md:py-24">
        <ViewTransition name="page-block">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 md:gap-8 rounded-[3rem] border border-white/25 bg-white/10 p-6 md:p-12 text-center shadow-[0_30px_90px_-35px_rgba(15,118,169,0.7)] backdrop-blur-2xl">
            <ViewTransition name="page-title">
              <h1
                className={cn(
                  "text-3xl md:text-4xl text-white drop-shadow-sm lg:text-5xl xl:text-7xl",
                  dynaPuff.className
                )}
              >
                Brain Flip
              </h1>
            </ViewTransition>
            <div className="flex max-w-2xl flex-col items-center gap-6 text-base text-sky-50/90 md:text-lg">
              <span className="h-px w-24 rounded-full bg-white/40" />
              <p>
                Spark your memory, challenge your friends, and flip your way to
                victory in our vibrant multiplayer memory showdown.
              </p>
            </div>
          </div>
        </ViewTransition>

        <div className="mt-14 flex w-full max-w-2xl flex-col items-center gap-5 sm:flex-row sm:items-stretch sm:justify-center">
          <Button
            asChild
            variant="primary"
            size="lg"
            className="w-full text-center sm:w-auto"
          >
            <Link href="/create">Create Game</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full text-center sm:w-auto"
          >
            <Link href="/join">Join Room</Link>
          </Button>
          <Button
            asChild
            variant="dark"
            size="lg"
            className="w-full text-center sm:w-auto"
          >
            <Link href="/about">Know More</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
