export const useScrollAnimation = (props: { width: number, offset: number, x: number }) => {
  const { width, offset, x } = props;
  let scroll = 0;

  const perc = (x - offset) / width;

  if ((perc > 0.25 && perc < 0.75) && scroll !== 0) {
    scroll = 0
  }
  else if (perc > 0.75 && scroll < 1) {
    scroll = 5 * (perc - 0.75)
  }
  else if (perc < 0.25 && scroll > -1) {
    scroll = -5 * (0.25 - perc)
  }

  return scroll;
};