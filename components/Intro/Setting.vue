<script setup>
import { WIDTH_UNIT } from '@/data/constants';

// Preload intro sound
const introSound = process.client ? useHomepage().sounds?.[0] : null;
if (introSound) useLoadAudio([introSound.url]);
</script>

<template>
  <LayoutFlex class="intro__setting" justify-content="center" align-items="center">
    <div class="intro__dialogue">

      <div class="intro__message">
        Please select your preference.<br/>Turn sound on for the best experience.
      </div>

      <LayoutFlex justify-content="center" :gap="WIDTH_UNIT * 2">
        <TextShuffle
          class="button intro__button intro__button--muted"
          text="Muted"
          @click="() => {
            setIsAudioAllowed(false);
            setIntroSetup(true);
            setIntroLoaded(false);
          }"
        />
        <TextShuffle
          class="button intro__button intro__button--sound"
          text="Sound on"
          @click="() => {
            setIsAudioAllowed(true);
            setIntroSetup(true);
            setIntroLoaded(false);
          }"
        />
      </LayoutFlex>

    </div>
  </LayoutFlex>
</template>