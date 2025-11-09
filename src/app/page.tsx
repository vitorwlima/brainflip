import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";

const HomePage = () => {
  return (
    <main className="flex h-screen bg-linear-to-r from-sky-300 to-sky-600">
      <div className="flex flex-col items-center p-20 max-w-[1200px] w-full mx-auto">
        <header className="flex flex-col items-center justify-center gap-4">
          <h1
            className={cn(
              "text-7xl font-bold text-gray-50",
              dynaPuff.className
            )}
          >
            Brain Flip
          </h1>
          <p className="text-lg text-gray-200">
            Have fun with your friends in this exciting memory game.
          </p>
        </header>
      </div>
    </main>
  );
};

export default HomePage;
