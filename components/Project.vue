<script setup lang="ts">
import type { Project } from '../data/types';

defineProps<{ item: Project }>()

const projectClass = (duration: Number, position: Number) => {
  return ['project', `duration-${duration}`, `position-${position}`]
}
</script>

<template>
  <div :class="projectClass(item.duration, item.position)">
    <h3 class="project__title">{{ item.title }}</h3>
    <div v-if="item.images" class="project__icon project__images"></div>
    <div v-if="item.links" class="project__icon project__links"></div>
    <div v-if="item.andamento" :class="['project__andamento', `project__${item.andamento}`]"></div>
  </div>
</template>

<style scoped lang="scss">
.project {
  position: relative;
  flex-shrink: 0;
  padding-right: $unit-horizontal * 4;

  &__title {
    display: inline;

    &:hover {
      background-color: $color-primary;
      color: $color-background;
      cursor: pointer;
    }
  }

  &__icon {
    position: absolute;
    top: 0;
    width: $unit-vertical;
    height: $unit-vertical;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
      background-color: $color-primary;
      color: $color-background;
      fill: $color-background;
      stroke: $color-background;
      cursor: pointer;
    }
  }

  &__andamento {
    width: 100%;
    height: $unit-vertical;
  }

  &__images {
    left: $unit-vertical * 0;
    background-image: $icon-images;
  }

  &__videos {
    left: $unit-vertical * 3;
    background-image: $icon-videos;
  }

  &__links {
    left: $unit-vertical * 5;
    background-image: $icon-links;
  }

  &__downloads {
    left: $unit-vertical * 9;
    background-image: $icon-downloads;
  }

  &__alternate {
    background-image: $symbol-alternate;
  }

  &__constant {
    background-image: $symbol-constant;
  }

  &__crescendo {
    background-image: $symbol-crescendo;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  &__diminuendo {
    background-image: $symbol-diminuendo;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  &__legato {
    background-image: $symbol-legato;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}

.pause {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  text-align: center;

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