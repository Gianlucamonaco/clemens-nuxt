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
