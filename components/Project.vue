<script setup lang="ts">
import type { Project } from '../data/types';
import { shuffle } from 'txt-shuffle';

const props = defineProps<{ 
  item: Project,
  categoryIndex: number
}>()

const projectPosition = ref(Math.floor(Math.random() * 7 + 1));
const projectTitle = ref('');
let isAnimating = false;

const projectClass = (duration: number) => {
  return ['project', `duration-${duration}`, `position-${projectPosition.value}`]
}

const getShuffled = (text: string) => {
  if (!isAnimating) {
    shuffle({
      text,
      fps: 30,
      duration: 1,
      glyphs: `█ ${text}`,
      onUpdate: (output: string) => {
        isAnimating = true;
        projectTitle.value = output
      },
      onComplete: () => {
        isAnimating = false;
      }
    });
  }
}

setTimeout(() => {
  getShuffled(props.item?.title)
}, 100 * (props.item?.num + props.categoryIndex));

</script>

<template>
  <div :class="projectClass(item.duration)">
    <h3 class="project__title" @mouseenter="getShuffled(item.title)">{{ projectTitle }}</h3>
    <!-- <div v-if="item.links" class="project__icon project__links"></div> -->
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
    width: $unit-horizontal;
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

</style>