<script setup lang="ts">
import type { Project } from '../data/types';

const props = defineProps<{ 
  item: Project,
  categoryIndex: number,
}>()

// const page = usePage();

const route = useRoute();
const imageChar = '▀';
const projectPosition = ref(Math.floor(Math.random() * 7 + 1));
const projectTitle = ref('');
const imagePositions = ref(
  Array(props.item.images.length)
    .fill(undefined)
    .map(() => Math.floor(Math.random() * props.item.duration * 8))
    .sort((a, b) => { return a - b })
);

let isAnimating = false;

const projectClass = (duration: number) => {
  return ['project', `duration-${duration}`, `position-${projectPosition.value}`]
}

const getShuffledText = (text: string) => {
  if (!isAnimating) useShuffle(text, projectTitle, {
    onUpdate: () => isAnimating = true,
    onComplete: () => isAnimating = false,
  })
}

const imagePosition = (index: any) => {
  const left = `${imagePositions.value[index] * 10.2}px`;
  return { left };
}

setTimeout(() => {
  getShuffledText(props.item?.title)
}, 100 * (props.item?.num + props.categoryIndex));

</script>

<template>
  <div :class="projectClass(item.duration)">
    <NuxtLink
      :to="`/${item.id}`"
      :aria-current="route.path.startsWith(`/${item.id}`) ? 'page' : undefined"
    >
      <h3 class="project__title" @mouseenter="getShuffledText(item.title)">{{ projectTitle }}</h3>
    </NuxtLink>
    <div v-if="item.images" class="project__images">
      <div
        v-for="image in item.images"
        :key="image"
        :class="['project__icon', 'project__image', 'blink-hover-2']"
        :style="imagePosition(image.indexOf)"
        @mouseenter="setImageThumb(image)"
        @mouseleave="setImageThumb(null)"
        >{{ imageChar }}</div>
      </div>
    <!-- <div v-if="item.links" class="project__icon project__links"></div> -->
    <!-- <div v-if="item.andamento" :class="['project__andamento', `project__${item.andamento}`]"></div> -->
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

  &__image {
    font-size: $fontsize-m;
    bottom: $unit-vertical * 2;
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