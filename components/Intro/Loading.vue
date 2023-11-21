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
const progress = ref(0) as any;
const opacityProgress = ref(1) as any;
const ticker = ref(0) as any;
const site = useSite().value;
const home = useHomepage();
const introSound = home.sounds?.[0];
const { play } = useAudioPlayer();
const { isMobile } = useDevice();

if (introSound) play(introSound.url, '', { loop: false })

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

  const timeline = gsap.timeline();
  
  // Intro animation
  const animationIntro = gsap.to(progress, {
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
      
    },
  })

  // Fade-out animation
  const animationFade = gsap.to(opacityProgress, {
    value: 0,
    duration: 1,
    ease: EASING,
    onComplete: () => {
      setIntroLoaded(true);
    }
  })

  timeline.add(animationIntro);
  timeline.add(animationFade);
})

</script>

<template>
  <div class="intro__loading" :style="{ opacity: opacityProgress }">
    <TextShuffle v-if="isMobile" class="intro__mobile" text="Open on desktop for the best experience" :delay="6" :duration="1" />
    <canvas ref="canvas" class="intro__canvas" />
    <TextShuffle class="intro__subtitle" :text="content.subtitle" :delay="6" :duration="1" />
    <TextShuffle class="intro__date" :text="content.date" :delay="10" :duration="1" />
  </div>
</template>