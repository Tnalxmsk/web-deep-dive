export const throttle = <Args extends unknown[]>(callback: (...args: Args) => void, delay: number) => {
  let lastCall = 0;

  return (...args: Args) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
};
