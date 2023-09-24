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
  return ['pause', `pause__${type}`, 'position-6', `duration-${duration}`];
}

const pauseSymbol = (type: PauseTypes) => {
  return pauseSymbols[type as PauseTypes];
}

</script>

<template>
  <LayoutFlex
    :class="pauseClass(item.type.toLowerCase() as PauseTypes)"
    justify-content="center"
    >
    <h3
      v-if="item.sounds?.[0]"
      :class="['pause__icon', `blink-hover-${pauseValues[item.type.toLowerCase() as PauseTypes]}`]"
      @mouseenter="() => {
        const sound = item.sounds?.[0];
        if (sound) play(sound.url, sound.title, { loop: true });
      }"
      @mouseleave="pause()"
    >
      {{ pauseSymbol(item.type.toLowerCase() as PauseTypes) }}
    </h3>
  </LayoutFlex>
</template>

<style scoped lang="scss">
.pause {
  position: relative;
  flex-shrink: 0;
  text-align: center;
  color: $color-light;
  cursor: crosshair;

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