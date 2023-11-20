import { shuffle } from 'txt-shuffle';

export const useShuffle = (
  text: string,
  target: any,
  callback: { onUpdate: () => void, onComplete: () => void},
  options?: { duration: number | undefined, noIncrement?: boolean },
) => {
  shuffle({
    text,
    duration: options?.duration ?? 1,
    fps: 30,
    glyphs: '▀█▄',
    onUpdate: (output: string) => {
      // Keep text with all characters to prevent strange multiline animation
      if (options?.noIncrement) {
        target.value = output + text.replace(/\s+/g, '').substring(output.replace(/\s+/g, '').length)
      }
      // Animate from 0 to all chars
      else {
        target.value = output;
      }
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
  const options = { year: 'numeric', month: 'short', day: 'numeric' } as any;
  return new Date(date * 1000).toLocaleDateString("en-US", options);
}