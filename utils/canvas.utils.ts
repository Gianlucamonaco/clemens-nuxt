import { INTRO_OPTIONS } from "@/data/constants";

export const getAreaColor = (ctx: any, x: number, y: number, width: number, height: number) => {
  const { data: imgData } = ctx.getImageData(x, y, width, height);
  const values = { r: [], g: [], b: [] };
  const num = width * height;

  for (let i = 0; i < num * 4; i += 4) {
    values.r.push( (imgData as never)[i] );
    values.g.push( (imgData as never)[i+1] );
    values.b.push( (imgData as never)[i+2] );
  }
  
  const r = arrayAverage(values.r);
  const g = arrayAverage(values.g);
  const b = arrayAverage(values.b);

  return [ r, g, b ];
}

export const arrayAverage = (arr: any) => {
  return arr.reduce((tot: any, val: any) => tot + val, 0) / arr.length;
}

export const getLuminosity = (r: number, g: number, b: number) => {
  return (
    0.2126 * r / 255 +
    0.7152 * g / 255 +
    0.0722 * b / 255
  );
}

export const getLuminosityValues = (ctx: any, rows: number, cols: number) => {
  const values = [] as number[][];
  const w = ctx.canvas.width / cols;
  const h = ctx.canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    values.push([]);

    for (let c = 0; c < cols; c++) {
      const color = getAreaColor(
        ctx,
        Math.floor(c * w),
        Math.floor(r * h),
        Math.floor(w),
        Math.floor(h),
      );

      const luminosity = getLuminosity(color[0], color[1], color[2]);
      values[r].push(luminosity);
    }
  }
  return values;
}

// Draw rectangles based on luminosity of image area
export const drawIntroTitleBlocks = (ctx: any, values: number[][], padding: { x: number, y: number }, progress: number) => {
  const dpr = window.devicePixelRatio;
  const { threshold, unit } = INTRO_OPTIONS;
  const rows = values.length;
  const cols = values[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {

      ctx.fillStyle = 'black';

      if (values?.[r][c] < threshold) {
        if (Math.random() < progress) {
          drawIntroBlock(
            ctx,
            padding.x + Math.floor(c * unit.w * dpr * 2),
            padding.y + Math.floor(r * unit.h * dpr * 2),
            Math.ceil(unit.w * dpr * 2),
            Math.ceil(unit.h * dpr * 2),
            progress,
          );
        }
      }
    }
  }
}

export const drawIntroBlock = (ctx: any, x: number, y: number, w: number, h: number, progress: number = 1) => {
  const blocks = [
    () => {
      ctx.fillRect(x, y, w, h / 2);
    },
    () => {
      if (Math.random() < 1 - progress * 2) ctx.fillStyle = 'white'
      ctx.fillRect(x, y + h / 2, w, h / 2);
    },
    () => {
      ctx.fillRect(x, y, w, h);
    }
  ]
  blocks[Math.floor(Math.random() * blocks.length)]();
}

