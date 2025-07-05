import { useCallback } from 'react';

interface UseSoundOptions {
  volume?: number;
}

export const useSound = (src: string, options?: UseSoundOptions) => {
  const playSound = useCallback(() => {
    const audio = new Audio(src);
    if (options?.volume) {
      audio.volume = options.volume;
    }
    audio.play().catch(error => console.error("Error playing sound:", error));
  }, [src, options?.volume]);

  return playSound;
};
