<script setup lang="ts">
import gsap from 'gsap';
import { EASING, HEIGHT_UNIT, INTRO_DURATION, INTRO_OPTIONS, WIDTH_UNIT } from '@/data/constants';
import { drawIntroTitleBlocks, getLuminosityValues } from '@/utils/canvas.utils';
import { randomChars } from '@/utils/text.utils';

let ctx: CanvasRenderingContext2D, offCtx: any;
let rows: number, cols: number, titleHeight: number;
let padding: { x: number, y: number };
let blockValues: number[][];

const dpr = window.devicePixelRatio, vw = window.innerWidth, vh = window.innerHeight;
const canvas = ref(null) as any;
const offCanvas = new OffscreenCanvas(1, 1);
const progress = ref(0) as any;
const loaded = ref(false) as any;
const { unit } = INTRO_OPTIONS;
let ticker = 0;

const site = useSite().value;
const home = site.children.find((p: any) => p.id === 'home');

const content = {
  title: site.title.toUpperCase(),
  subtitle: home.subtitle.toUpperCase(),
  date: home.date.toUpperCase(),
};

onMounted(async () => {
  canvas.value.width = vw * dpr;
  canvas.value.height = vh * dpr;

  await document.fonts.load("1px rocky-compressed");

  offCtx = offCanvas?.getContext('2d', { willReadFrequently: true });
  ctx = canvas.value?.getContext('2d');

  drawLoadingOffsetCanvas();

  // Start animation;
  gsap.to(progress, {
    value: 1,
    duration: INTRO_DURATION,
    ease: EASING,
    onUpdate: () => {
      ticker++;

      if (ticker % 10 == 0) {
        drawLoadingCanvas();
        ticker = 0;
      }
      
      // Trigger component fade-out
      if (progress.value >= 0.995 && !loaded.value) loaded.value = true;
    },
  })
})

const drawLoadingOffsetCanvas = async () => {
  const titleSize = 0.21 * vw;

  // Measure title size
  offCtx.font = `${titleSize}px rocky-compressed`;
  offCtx.textBaseline = 'top';
  offCtx.letterSpacing = '0';

  const { width: titleWidth, actualBoundingBoxAscent: titleAscent, actualBoundingBoxDescent: titleDescent } = offCtx.measureText(content.title);
  titleHeight = (titleDescent - titleAscent);

  // Calculate rows and cols
  rows = Math.ceil(titleHeight / unit.h);
  cols = Math.ceil(titleWidth / unit.w);
  
  offCanvas.width = cols * WIDTH_UNIT;
  offCanvas.height = rows * HEIGHT_UNIT;

  padding = {
    x: (canvas.value.width - offCanvas.width) / 2,
    y: (canvas.value.height - offCanvas.height) / 2,
  }

  // Draw background
  offCtx.fillStyle = 'white';
  offCtx.fillRect(0, 0, vw, vh);

  // Draw title
  offCtx.textBaseline = 'top';
  offCtx.font = `${titleSize}px rocky-compressed`;
  offCtx.letterSpacing = '0';
  offCtx.fillStyle = 'black';
  offCtx.fillText(content.title, 0, 0);

  // Measure luminosity values
  blockValues = getLuminosityValues(offCtx, rows, cols);
}

const drawLoadingCanvas = () => {

  drawIntroTitleBlocks(ctx, blockValues, padding, progress.value);

  // Draw loading frame
  const framePadding = HEIGHT_UNIT;
  const frameWidth = HEIGHT_UNIT;

  ctx.fillStyle = 'white';

  ctx.clearRect(0, 0, canvas.value.width * dpr, frameWidth * 4);
  ctx.clearRect(0, 0, frameWidth * 4, canvas.value.height * dpr);
  ctx.clearRect(canvas.value.width * dpr - frameWidth * 4, 0, frameWidth * 4, canvas.value.height * dpr);
  ctx.clearRect(0, canvas.value.height - frameWidth * 4, canvas.value.width * dpr, frameWidth * 4);

  const topProgress = Math.min(0.3, progress.value) / 0.3;
  const sideProgress = Math.max(0, Math.min(0.3, progress.value - 0.3)) / 0.3;
  const bottomProgress = Math.max(0, Math.min(0.6, progress.value - 0.6)) / 0.4;

  // top
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${frameWidth * dpr}px prestige-elite-std`;

  ctx.fillText(
    randomChars(Math.floor((vw - framePadding) / WIDTH_UNIT / 2) * topProgress),
    canvas.value.width / 2,
    framePadding,
  )

  ctx.textAlign = 'right';
  ctx.fillText(
    randomChars(Math.floor((vw - framePadding) / WIDTH_UNIT / 2) * topProgress),
    canvas.value.width / 2,
    framePadding,
  )

  // left / right
  ctx.textAlign = 'left';

  const lines = Math.floor((canvas.value.height - framePadding * 4) / HEIGHT_UNIT * sideProgress);
  for (let l = 0; l < lines; l++) {
    ctx.fillText(
      randomChars(2),
      framePadding,
      framePadding + framePadding * l,
    )

    ctx.fillText(
      randomChars(2),
      canvas.value.width - framePadding - frameWidth * 2.5,
      framePadding + framePadding * l,
    )
  }

  // bottom
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${frameWidth * dpr}px prestige-elite-std`;

  ctx.fillText(
    randomChars(Math.floor((vw - framePadding) / WIDTH_UNIT / 2) * bottomProgress),
    framePadding,
    framePadding + lines * HEIGHT_UNIT,
  )

  ctx.textAlign = 'right';
  ctx.fillText(
    randomChars(Math.floor((vw - framePadding) / WIDTH_UNIT / 2) * bottomProgress),
    canvas.value.width - framePadding,
    framePadding + lines * HEIGHT_UNIT,
  )
}

</script>

<template>
  <div class="loading" :class="{ loaded }">
    <canvas ref="canvas" />
    <TextShuffle class="loading__subtitle" :text="content.subtitle" :delay="6" :duration="1" />
    <TextShuffle class="loading__date" :text="content.date" :delay="10" :duration="1" />
  </div>
</template>

<style lang="scss">
.loading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: 200px;
  background-color: $color-background;
  opacity: 1;
  overflow: hidden;
  transition: opacity .5s;
  pointer-events: none;

  &.loaded {
    opacity: 0;
    pointer-events: none;
  }

  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__subtitle,
  &__date {
    font-size: $fontsize-m;
    position: fixed;
    left: 0;
    width: 100%;
    text-align: center;
    pointer-events: none;
  }

  &__subtitle {
    top: 75%;
  }
  &__date {
    top: calc(75% + $height-unit * 2);
  }
}
</style>