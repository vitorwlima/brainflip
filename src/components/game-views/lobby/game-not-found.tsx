type Props = {
  roomCode: string;
  show: boolean;
};

export const GameNotFound = ({ roomCode, show }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-3xl border border-white/30 bg-white/10 p-8 text-center text-white/80">
      <h2 className="text-2xl font-semibold text-white">Game not found</h2>
      <p className="max-w-sm text-sm">
        We couldn&apos;t find a game with the code{" "}
        <span className="font-medium">{roomCode}</span>. Double-check the code
        or ask your host for a new invite.
      </p>
    </div>
  );
};
