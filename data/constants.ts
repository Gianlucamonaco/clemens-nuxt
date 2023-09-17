// export const KIRBY_BASE_URL = 'https://backend.clemens.test';
export const KIRBY_BASE_URL = 'https://dev.vacanza.studio/clemens';

export const queryApi = `${KIRBY_BASE_URL}/api/query`;

export const queryHeaders = {
  // Authorization: `Basic ${btoa(KIRBY_API_USERNAME + ":" + KIRBY_API_PASSWORD)}`,
  // Authorization: `Bearer ${KIRBY_API_TOKEN}`,
  Accept: "application/json",
};

export const specialChars = {
  blockFull: '█',
  blockTop:  '▀',
  blockBtm:  '▄',
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

export const HEIGHT_UNIT = 17; 
export const HEIGHT_ROW = HEIGHT_UNIT * 10;