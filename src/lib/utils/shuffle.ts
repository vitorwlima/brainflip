export const shuffle = <T>(items: T[], randomFn: () => number = Math.random) => {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

