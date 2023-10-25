<script setup lang="ts">
import type { Project } from '../../data/types';
import { pauseSymbols } from '../../data/constants';

const props = defineProps<{ item: Project }>()

const { play, pause } = useAudioPlayer();

if (props.item.sounds?.length) {
  useLoadAudio(props.item.sounds.map(sound => sound.url))
}

</script>

<template>
  <LayoutFlex
    :class="['pause', 'position-6', `duration-${item.duration}`]"
    justify-content="center"
    >
    <h3
      v-if="item.sounds?.[0]"
      :class="['pause__icon', `blink-hover-${item.duration}`]"
      @mouseenter="() => {
        const sound = item.sounds?.[0];
        if (sound) play(sound.url, sound.caption, { loop: true });
      }"
      @mouseleave="pause()"
    >
      {{ pauseSymbols[item.type as 'pause1' | 'pause2' | 'pause3'] }}
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

  @media (max-width: $breakpoint-mobile) {
    position: static;
    width: auto !important;
  }

  &__icon {
    display: inline;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    white-space: pre-wrap;
  }
}
</style>