<script setup lang="ts">
import type { PauseTypes, Project } from '../../data/types';
import { pauseSymbols, pauseValues } from '../../data/constants';

const props = defineProps<{ item: Project }>()

const { play, pause } = useAudioPlayer();

if (props.item.sounds?.length) {
  useLoadAudio(props.item.sounds.map(sound => sound.url))
}


const pauseClass = (type: PauseTypes) => {
  const duration = pauseValues[type as PauseTypes];
  return ['pause', `pause__${type}`, 'position-6', `duration-${duration}`, `blink-hover-${duration}`]
}

const pauseSymbol = (type: PauseTypes) => {
  return pauseSymbols[type as PauseTypes];
}

</script>

<template>
  <LayoutFlex
    :class="pauseClass(item.type.toLowerCase() as PauseTypes)"
    justify-content="center"
    @mouseenter="() => {
      const sound = props.item.sounds?.[0];
      if (sound) play(sound.url, sound.title);
    }"
    @mouseleave="pause()"
  >
    <h3 class="pause__icon">
      {{ pauseSymbol(item.type.toLowerCase() as PauseTypes) }}
    </h3>
  </LayoutFlex>
</template>

<style scoped lang="scss">
.pause {
  position: relative;
  flex-shrink: 0;
  text-align: center;
  cursor: crosshair;

  color: $color-light;

  &:hover {
    /* background-color: $color-highlight; */
    color: $color-highlight;
  }

  &__icon {
    display: inline;
    /* width: $height-unit; */
    /* height: $height-unit; */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    white-space: pre-wrap;
  }
}
</style>