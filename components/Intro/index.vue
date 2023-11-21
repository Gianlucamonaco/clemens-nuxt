<script setup lang="ts">
if (process.server) {
  setIsAudioAllowed(false);
  setTimeout(() => {
    setIntroSetup(true);
    setIntroLoaded(true);
  }, 1000)
}

const isSetup = useIntroSetup();
const isLoaded = useIntroLoaded();
</script>

<template>
  <ClientOnly>
    <div class="intro">
      <IntroSetting v-if="!isSetup" />
      <IntroLoading v-if="isSetup && !isLoaded" />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.intro {
  z-index: 99999;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-size: $fontsize-m;

  &__button {
    text-align: center;
    height: $height-unit * 3;
    width: $width-column * 2;

    &--muted:active {
      background-color: $color-dark-muted;
      color: $color-light;
      border-color: transparent;
    }

    &--sound:active {
      background-color: $color-highlight;
      color: $color-light;
      border-color: transparent;
    }
  }

  &__setting,
  &__loading {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: $color-background;
    overflow: hidden;
  }

  &__message {
    text-align: center;
    padding-bottom: $height-unit;
  }
  
  &__canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__date,
  &__subtitle,
  &__mobile {
    font-size: $fontsize-m;
    position: fixed;
    left: 0;
    width: 100%;
    text-align: center;
    pointer-events: none;
    user-select: none;
  }

  &__subtitle {
    top: 75%;
  }

  &__date {
    top: calc(75% + $height-unit * 2);
  }

  &__mobile {
    top: 20%;
    padding: 0 $width-unit * 6;
  }
}
</style>