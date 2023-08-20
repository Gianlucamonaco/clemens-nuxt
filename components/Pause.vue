<script setup lang="ts">
import type { PauseTypes, Project } from '../data/types';
import { pauseValues } from '../data/constants';

defineProps<{ item: Project }>()

const pauseClass = (type: PauseTypes) => {
  const duration = pauseValues[type as PauseTypes];
  return ['pause', `pause__${type}`, 'position-5', `duration-${duration}`]
}
</script>

<template>
  <div :class="pauseClass(item.type.toLowerCase() as PauseTypes)">
    <h3 class="pause__icon"></h3>
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

  &:hover {
    background-color: $color-primary;
  }

  &__icon {
    width: $unit-vertical;
    height: $unit-vertical;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__croma .pause__icon {
    background-image: $icon-pause-2;
  }

  &__semiminima .pause__icon {
    background-image: $icon-pause-4;
  }

  &__minima .pause__icon {
    background-image: $icon-pause-6;
  }
}
</style>