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
  // croma: ' ▄\n▀ ',
  // semiminima: '█ \n █' ,
  // minima: '▄▄▄▄\n▀▀▀▀',
  croma: () => `${randomChars(1)}\n${randomChars(1)}`,
  semiminima: () => `${randomChars(2)}\n${randomChars(2)}`,
  minima: () => `${randomChars(4)}\n${randomChars(4)}`,
}
