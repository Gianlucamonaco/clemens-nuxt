<script setup lang="ts">
import { HEIGHT_UNIT, INTRO_DURATION, WIDTH_UNIT } from '@/data/constants';

let ctx: CanvasRenderingContext2D, offCtx: any;
const dpr = window.devicePixelRatio, vw = window.innerWidth * dpr, vh = window.innerHeight * dpr;
const canvas = ref(null) as any;
const offCanvas = new OffscreenCanvas(vw, vh);
const blockValues = [] as number[][];
const text = 'CLEMENS WENGER';
const heightUnit = HEIGHT_UNIT / 2;
const widthUnit = WIDTH_UNIT / 2;
const rows = Math.floor(vw / heightUnit);
const cols = Math.floor(vh / widthUnit);
const threshold = 0.65;
let time = 0;
let percent: number;

onMounted(async () => {
  canvas.value.width = vw;
  canvas.value.height = vh;

  document.fonts.load("1px rocky-compressed").then(() => {

    ctx = canvas.value?.getContext('2d', { willReadFrequently: true });
    offCtx = offCanvas?.getContext('2d', { willReadFrequently: true });

    drawOffset();

    const animate = () => {
      time++;

      if (time % 5 === 0) {
        percent = Math.min(threshold, time / (INTRO_DURATION / 20));
        draw();
      }

      requestAnimationFrame(animate);
    }

    animate()

  })
})

const drawOffset = async () => {
  const fontSize = 0.2 * vw;

  offCtx.font = `${fontSize}px rocky-compressed`;
  offCtx.textBaseline = 'top';

  // Draw offset canvas
  const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } = offCtx.measureText(text);
  const textHeight = (actualBoundingBoxDescent - actualBoundingBoxAscent);
  const textWidth = width;
  
  const padding = {
    x: (offCtx.canvas.width - textWidth) / dpr,
    y: (offCtx.canvas.height - textHeight) / dpr,
  }

  offCtx.fillStyle = 'white';
  offCtx.fillRect(0, 0, vw, vh);

  offCtx.fillStyle = 'black';
  offCtx.fillText(text, padding.x, padding.y);

  // Measure luminosity values
  for (let r = 0; r < rows; r++) {
    blockValues.push([]);

    for (let c = 0; c < cols; c++) {
      const color = getAreaColor(
        offCtx,
        Math.floor(c * widthUnit * dpr),
        Math.floor(r * heightUnit * dpr),
        Math.floor(widthUnit * dpr),
        Math.floor(heightUnit * dpr),
      );

      const luminosity = getLuminosity(color[0], color[1], color[2]);
      blockValues[r].push(luminosity);
    }
  }
}

const draw = () => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r > rows / 4) return;

      if (blockValues[r][c] < percent) {
        if (Math.random() < percent / 6) {
          ctx.fillRect(
            Math.floor(c * widthUnit * dpr),
            Math.floor(r * heightUnit * dpr),
            Math.ceil(widthUnit * dpr),
            Math.ceil(heightUnit * dpr),
          );
        }
        else if (Math.random() < threshold - percent + 0.001) {
          ctx.clearRect(
            Math.floor(c * widthUnit * dpr),
            Math.floor(r * heightUnit * dpr),
            Math.ceil(widthUnit * dpr),
            Math.ceil(heightUnit * dpr),
          );
        }
      }
    }
  }
}

</script>

<template>
  <canvas ref="canvas" class="loading" />
</template>

<style lang="scss">
.loading {
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: 200px;
  background-color: $color-background;
  overflow: hidden;
  /* pointer-events: none; */
}
</style>