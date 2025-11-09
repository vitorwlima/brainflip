import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-sky-200 via-sky-400 to-sky-600 text-sky-950">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-104 w-104 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute inset-x-16 top-1/2 h-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center p-4 md:px-6 md:py-24">
        <header className="w-full">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 md:gap-8 rounded-[3rem] border border-white/25 bg-white/10 p-6 md:p-12 text-center shadow-[0_30px_90px_-35px_rgba(15,118,169,0.7)] backdrop-blur-2xl">
            <h1
              className={cn(
                "text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm lg:text-5xl xl:text-7xl",
                dynaPuff.className
              )}
            >
              Brain Flip
            </h1>
            <div className="flex max-w-2xl flex-col items-center gap-6 text-base text-sky-50/90 md:text-lg">
              <span className="h-px w-24 rounded-full bg-white/40" />
              <p>
                Spark your memory, challenge your friends, and flip your way to
                victory in our vibrant multiplayer memory showdown.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-14 flex w-full max-w-2xl flex-col items-center gap-5 sm:flex-row sm:items-stretch sm:justify-center">
          <Link
            href="/create"
            className="w-full rounded-full bg-linear-to-r text-center from-emerald-400 via-emerald-500 to-emerald-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/40 transition-colors duration-300 hover:from-emerald-300 hover:via-emerald-400 hover:to-emerald-500 focus-visible:shadow-xl focus-visible:shadow-emerald-400/60 focus-visible:from-emerald-300 focus-visible:via-emerald-400 focus-visible:to-emerald-500 focus-visible:outline-none"
          >
            Create Game
          </Link>
          <Link
            href="/join"
            className="rounded-full w-full border text-center border-white/60 bg-white/50 px-10 py-4 text-lg font-semibold text-sky-900 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-white/80 hover:shadow-xl hover:shadow-sky-400/60 focus-visible:bg-white/80 focus-visible:shadow-xl focus-visible:shadow-sky-400/60 focus-visible:outline-none"
          >
            Join Room
          </Link>
          <Link
            href="/about"
            className="rounded-full w-full text-center bg-sky-900/80 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-900/50 transition-all duration-300 hover:bg-sky-900 focus-visible:bg-sky-900 focus-visible:outline-none"
          >
            Know More
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
