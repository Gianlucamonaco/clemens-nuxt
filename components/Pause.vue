<script setup lang="ts">
import type { PauseTypes, Project } from '../data/types';
import { pauseSymbols, pauseValues } from '../data/constants';

defineProps<{ item: Project }>()

const pauseClass = (type: PauseTypes) => {
  const duration = pauseValues[type as PauseTypes];
  return ['pause', `pause__${type}`, 'position-5', `duration-${duration}`]
}

const pauseSymbol = (type: PauseTypes) => {
  return pauseSymbols[type as PauseTypes];
}

</script>

<template>
  <div :class="pauseClass(item.type.toLowerCase() as PauseTypes)">
    <h3 class="pause__icon">{{ pauseSymbol(item.type.toLowerCase() as PauseTypes) }}</h3>
  </div>
</template>

<style scoped lang="scss">
.pause {
  position: relative;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  text-align: center;
  cursor: pointer;

  &__icon {
    display: inline;
    /* width: $unit-vertical; */
    /* height: $unit-vertical; */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    white-space: pre-wrap;
  }
}
</style>