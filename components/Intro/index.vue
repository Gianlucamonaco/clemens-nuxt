<script setup lang="ts">
const isSetup = useIntroSetup();
const isLoaded = useIntroLoaded();

</script>

<template>
  <div class="intro">
    <IntroSetting v-if="!isSetup" />
    <IntroLoading v-if="isSetup && !isLoaded" />
  </div>
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
  background-color: $color-background;

  &__button {
    text-align: center;
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

  &__setting {
    width: 100%;
    height: 100%;
  }

  &__message {
    text-align: center;
    padding-bottom: $height-unit;
  }

}
</style>