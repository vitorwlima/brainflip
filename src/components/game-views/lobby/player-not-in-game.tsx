import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserId } from "@/lib/utils/user-id";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  roomCode: string;
  show: boolean;
};

export const PlayerNotInGame = ({ roomCode, show }: Props) => {
  const [username, setUsername] = useState("");
  const userId = useUserId();
  const router = useRouter();
  const joinGame = useMutation(api.games.joinGame);

  if (!show) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !roomCode || !userId) {
      return;
    }

    await joinGame({
      roomCode,
      username,
      playerId: userId,
    });

    router.push(`/game/${roomCode}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
            placeholder="What should other players call you?"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="roomCode"
            className="text-sm font-semibold uppercase tracking-wider text-white/90"
          >
            Room Code
          </label>
          <Input
            id="roomCode"
            name="roomCode"
            value={roomCode}
            placeholder="Enter the code shared by your host"
            autoComplete="off"
            disabled
          />
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
          >
            Join Lobby
          </Button>
        </div>
      </div>
    </form>
  );
};
