import BezierEasing from 'bezier-easing';

export const specialChars = {
  full: '█',
  top:  '▀',
  btm:  '▄',
}

export const pauseSymbols = {
  pause1: '    \n▀   \n   ▄\n    ' ,
  pause2: '    \n    \n▄▄▄▄\n    ' ,
  pause3: '        \n▀▀▀▀▀▀▀▀\n        \n        ' ,
}

export const soundSymbol = '▀▀▀▀▀▀▀▀';

export const EASING = BezierEasing(0.2, 0.0, 0.0, 1.0);

export const WIDTH_UNIT = 10.2;
export const HEIGHT_UNIT = 17;
export const HEIGHT_ROW = HEIGHT_UNIT * 10;

export const FONTS = {
  prestige: 'prestige-elite-std',
  rocky: 'rocky-compressed',
}

export const INTRO_DURATION = 7;
export const INTRO_OPTIONS = {
  threshold: 0.5,
  unit: {
    w: WIDTH_UNIT,
    h: HEIGHT_UNIT,
  },
};
