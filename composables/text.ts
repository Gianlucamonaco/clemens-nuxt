import { shuffle } from 'txt-shuffle';

export const useShuffle = (
  text: string,
  target: any,
  callback: { onUpdate: () => void, onComplete: () => void},
  options?: { duration: number | undefined },
) => {
  shuffle({
    text,
    duration: options?.duration ?? 1,
    fps: 30,
    glyphs: '▀█▄',
    onUpdate: (output: string) => {
      target.value = output;
      callback.onUpdate();
    },
    onComplete: () => {
      callback.onComplete();
    }
  });
}