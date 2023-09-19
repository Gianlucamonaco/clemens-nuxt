import BezierEasing from 'bezier-easing';

export const specialChars = {
  full: '█',
  top:  '▀',
  btm:  '▄',
}

export const pauseValues = {
  croma: 2,
  semiminima: 4,
  minima: 6,
}

export const pauseSymbols = {
  croma: '    \n▀   \n   ▄\n    ' ,
  semiminima: '    \n    \n▄▄▄▄\n    ' ,
  minima: '    \n▀▀▀▀\n    \n    ' ,
}

export const soundSymbol = '▀▀▀▀▀▀▀▀';

export const WIDTH_UNIT = 10.2;
export const HEIGHT_UNIT = 17;
export const HEIGHT_ROW = HEIGHT_UNIT * 10;

export const EASING = BezierEasing(0.2, 0.0, 0.0, 1.0);

export const INTRO_DURATION = 6;
export const INTRO_OPTIONS = {
  threshold: 0.5,
  unit: {
    w: WIDTH_UNIT / 2,
    h: HEIGHT_UNIT / 2,
  },
};
