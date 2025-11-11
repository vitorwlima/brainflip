"use client";

import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { useParams } from "next/navigation";
import { LobbyView } from "@/components/game-views/lobby";

const GamePage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const game = useQuery(api.games.getGameByRoomCode, { roomCode });

  if (!game || game.status === "lobby") {
    return <LobbyView />;
  }
};

export default GamePage;
