import { shuffle } from 'txt-shuffle';

export const useShuffle = (text: string, target: any, callback: { onUpdate: () => void, onComplete: () => void}) => {
  shuffle({
    text,
    fps: 30,
    duration: 1,
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