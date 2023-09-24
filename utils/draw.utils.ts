// Draw offset canvas with text
import { FONTS, HEIGHT_UNIT, INTRO_OPTIONS, WIDTH_UNIT } from "@/data/constants";
import { randomChars } from '@/utils/text.utils';

export const drawLoadingOffsetCanvas = (ctx: any, text: string) => {
  const { unit } = INTRO_OPTIONS;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const portrait = vw < vh;
  const textLines = portrait ? text.split(' ') : [text];
  const titleFontSize = portrait ? 0.3 * vw : 0.21 * vw;

  // Measure title size
  ctx.font = `${titleFontSize}px ${FONTS.rocky}`;
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0';

  const { width: titleWidth, actualBoundingBoxAscent: titleAscent, actualBoundingBoxDescent: titleDescent } = ctx.measureText(textLines[0]);
  const titleHeight = (titleDescent - titleAscent);

  // Calculate rows and cols
  const rows = Math.ceil(titleHeight * textLines.length / unit.h);
  const cols = Math.ceil(titleWidth / unit.w);
  
  ctx.canvas.width = cols * unit.w;
  ctx.canvas.height = rows * unit.h;

  // Draw background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, vw, vh);

  // Draw title
  ctx.textBaseline = 'top';
  ctx.textAlign = 'center';
  ctx.font = `${titleFontSize}px ${FONTS.rocky}`;
  ctx.letterSpacing = '0';
  ctx.fillStyle = 'black';

  textLines.forEach((line, i) => {
    ctx.fillText(line, titleWidth / 2, i * titleHeight);
  })

  // Measure luminosity values
  return {
    padding: {
      x: (vw - ctx.canvas.width) * window.devicePixelRatio / 2,
      y: (vh - ctx.canvas.height) * window.devicePixelRatio / 2,
    },
    blockValues: getLuminosityValues(ctx, rows, cols),
  }

}

// Draw rectangles based on luminosity array values
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
            padding.x + Math.floor(c * unit.w * dpr),
            padding.y + Math.floor(r * unit.h * dpr),
            Math.ceil(unit.w * dpr),
            Math.ceil(unit.h * dpr),
            progress,
          );
        }
      }
    }
  }
}

// Draw animated frame made of characters
export const drawIntroFrameBlocks = (ctx: any, progress: number = 1, clearFrame: boolean = true) => {
  const framePadding = {
    x: HEIGHT_UNIT,
    y: HEIGHT_UNIT,
  };
  const frameWidth = HEIGHT_UNIT;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const { width: cw, height: ch } = ctx.canvas;
  const dpr = window.devicePixelRatio;

  ctx.fillStyle = 'white';

  if (clearFrame) {
    ctx.clearRect(0, 0, cw, frameWidth * 5);
    ctx.clearRect(0, 0, frameWidth * 5, ch);
    ctx.clearRect(cw - frameWidth * 5, 0, frameWidth * 5, ch);
    ctx.clearRect(0, ch - frameWidth * 5, cw, frameWidth * 5);
  }

  const topProgress = Math.min(0.3, progress) / 0.3;
  const sideProgress = Math.max(0, Math.min(0.3, progress - 0.3)) / 0.3;
  const bottomProgress = Math.max(0, Math.min(0.6, progress - 0.6)) / 0.4;

  const horzMaxChars = Math.floor((vw - framePadding.x * 2) / WIDTH_UNIT);
  const vertMaxChars = Math.floor((vh - framePadding.y * 2 - frameWidth * 2) / HEIGHT_UNIT);
  const opticalAdjustmentX = 0.875;

  framePadding.x = (vw - horzMaxChars * WIDTH_UNIT) / 2 * opticalAdjustmentX * dpr;
  framePadding.y = (vh - vertMaxChars * HEIGHT_UNIT) / 2;

  // top
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${frameWidth * dpr}px ${FONTS.prestige}`;

  ctx.fillText(
    randomChars(horzMaxChars / 2 * topProgress),
    cw / 2,
    framePadding.y,
  )

  ctx.textAlign = 'right';
  ctx.fillText(
    randomChars(horzMaxChars / 2 * topProgress),
    cw / 2,
    framePadding.y,
  )

  // left / right
  const lines = vertMaxChars * sideProgress * dpr;
  for (let l = 0; l < lines; l++) {
    ctx.textAlign = 'left';
    ctx.fillText(
      randomChars(2),
      framePadding.x,
      framePadding.y + frameWidth * l,
    )

    ctx.textAlign = 'right';
    ctx.fillText(
      randomChars(2),
      cw - framePadding.x,
      framePadding.y + frameWidth * l,
    )
  }

  // bottom
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${frameWidth * dpr}px ${FONTS.prestige}`;

  ctx.fillText(
    randomChars(horzMaxChars / 2 * bottomProgress),
    framePadding.x,
    framePadding.y + lines * HEIGHT_UNIT,
  )

  ctx.textAlign = 'right';
  ctx.fillText(
    randomChars(horzMaxChars / 2 * bottomProgress),
    cw - framePadding.x,
    framePadding.y + lines * HEIGHT_UNIT,
  )  
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
