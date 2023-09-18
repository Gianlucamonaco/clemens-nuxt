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

export const useFormattedDate = (
  date: number,
  ) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as any;
  return new Date(date * 1000).toLocaleDateString("en-US", options);
}