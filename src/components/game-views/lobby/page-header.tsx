import { Button } from "@/components/ui/button";
import { ButtonCheck } from "@/components/ui/button-check";
import { dynaPuff } from "@/fonts";
import { cn } from "@/lib/utils/classname";
import { useEffect, useState, ViewTransition } from "react";

type Props = {
  roomCode: string;
};

export const PageHeader = ({ roomCode }: Props) => {
  const [copiedType, setCopiedType] = useState<"code" | "link" | null>(null);

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

  useEffect(() => {
    if (!copiedType) {
      return;
    }

    const timeout = window.setTimeout(() => setCopiedType(null), 2000);
    return () => window.clearTimeout(timeout);
  }, [copiedType]);

  return (
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
          Manage the game settings and keep an eye on the lobby while everyone
          gets ready to flip.
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
              <ButtonCheck show={copiedType === "code"}>Copy Code</ButtonCheck>
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
              <ButtonCheck show={copiedType === "link"}>
                Copy Invite Link
              </ButtonCheck>
            </Button>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
};
