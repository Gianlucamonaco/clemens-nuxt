<script setup lang="ts">
import gsap from 'gsap';
import { EASING, FONTS, INTRO_DURATION } from '@/data/constants';
import {
  drawIntroFrameBlocks,
  drawIntroTitleBlocks,
  drawLoadingOffsetCanvas,
} from '@/utils/draw.utils';

let ctx: CanvasRenderingContext2D, offCtx: any;

const dpr = window.devicePixelRatio, vw = window.innerWidth, vh = window.innerHeight;
const offCanvas = new OffscreenCanvas(1, 1);
const canvas = ref(null) as any;
const loaded = ref(false) as any;
const progress = ref(0) as any;
const ticker = ref(0) as any;
const site = useSite().value;
const home = site.children.find((p: any) => p.id === 'home');
const introSound = home.sounds?.[0];
const isAudioAllowed = useIsAudioAllowed();

const { play, isPlaying } = useAudioPlayer();

if (introSound) {
  useLoadAudio([introSound.url])
  ?.then(() => {
    if (introSound) play(introSound.url, '', { loop: false }).then(() => loaded.value = true)
  });
}

const content = {
  title: site.title.toUpperCase(),
  subtitle: home.subtitle.toUpperCase(),
  date: home.date.toUpperCase(),
};

onMounted(async () => {
  canvas.value.width = vw * dpr;
  canvas.value.height = vh * dpr;

  await document.fonts.load(`1px ${FONTS.rocky}`);
  await document.fonts.load(`1px ${FONTS.prestige}`);

  offCtx = offCanvas?.getContext('2d', { willReadFrequently: true });
  ctx = canvas.value?.getContext('2d');

  const { padding, blockValues } = drawLoadingOffsetCanvas(offCtx, content.title);

  // Start animation;
  gsap.to(progress, {
    value: 1,
    duration: INTRO_DURATION,
    ease: EASING,
    onUpdate: () => {
      ticker.value++;

      // Redraw every 10 frames
      if (ticker.value % 5 == 0) {
        drawIntroTitleBlocks(ctx, blockValues, padding, progress.value);
        drawIntroFrameBlocks(ctx, progress.value, false);
        ticker.value = 0;
      }
      
      // Trigger component fade-out
      if (progress.value >= 0.995 && !loaded.value && !isPlaying()) loaded.value = true;
    },
  })
})

</script>

<template>
  <div
    :class="['loading', loaded ? 'loaded' : null ]"
    @click="() => {
      setIsAudioAllowed(true);
      if (introSound && !isPlaying()) {
        play(introSound.url, '', { loop: false }).then(() => loaded = true)
      }
    }"
  >
    <Switch
      class="loading__enable"
      text="Click anywhere to activate sound"
      :is-audio-allowed="isAudioAllowed"
    />
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
  cursor: crosshair;

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

  &__date,
  &__enable,
  &__subtitle {
    font-size: $fontsize-m;
    position: fixed;
    left: 0;
    width: 100%;
    text-align: center;
    pointer-events: none;
    user-select: none;
  }

  &__enable {
    top: 15%;
    justify-content: center !important;
  }

  &__subtitle {
    top: 80%;
  }
  &__date {
    top: calc(80% + $height-unit * 2);
  }
}
</style>