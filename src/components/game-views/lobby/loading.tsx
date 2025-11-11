type Props = {
  show: boolean;
};

export const Loading = ({ show }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <div className="flex min-h-[200px] items-center justify-center text-sm uppercase tracking-[0.3em] text-white/70">
      Loading game…
    </div>
  );
};
