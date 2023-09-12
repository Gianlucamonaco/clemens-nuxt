<script setup lang="ts">
import type { Project } from '../data/types';

const props = defineProps<{ 
  item: Project,
  categoryIndex: number,
}>()

const route = useRoute();
const imageChar = '▀▀▀▀▀▀▀▀';
const projectTitle = ref('');

let isAnimating = false;

const projectClass = (duration: number) => {
  return ['project', `duration-${duration}`, `position-${props.item.position}`]
}

const getShuffledText = (text: string) => {
  if (!isAnimating) useShuffle(text, projectTitle, {
    onUpdate: () => isAnimating = true,
    onComplete: () => isAnimating = false,
  })
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
    <h3
      class="project__title"
      @mouseenter="getShuffledText(item.title)"
    >
      {{ projectTitle }}
    </h3>
    </NuxtLink>
    <div v-if="item.images" class="project__images">
      <div
        v-for="image in item.images"
        :key="image"
        :class="['project__icon', 'project__image', 'blink-hover-4']"
        :style="{
          left: image.left,
          top: (image.top ?? 'auto'),
          bottom: (image.bottom ?? 'auto'),
        }"
        >
        <!-- 
        @mouseenter="setImageThumb(image)"
        @mousemove="(e) => { setMousePos(e)}"
        @mouseleave="setImageThumb(null)"
        -->
          <img :src="image.url" :alt="image.alt" />
        </div>
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
    cursor: crosshair;

    &:hover {
      background-color: $color-highlight;
      color: $color-secondary;
    }
  }


  &__icon {
    position: absolute;
    width: $unit-horizontal;
    height: $unit-vertical;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__image {
    position: absolute;
    font-size: $fontsize-m;
    /* bottom: $unit-vertical * 2; */
    /* padding: #{$unit-vertical * 0.5} 0 $unit-vertical; */
    width: $column; // #{$unit-horizontal * 6};
    max-height: 0;
    height: auto;
    /* color: $color-secondary; */
    border: #{$unit-vertical * 0.5} solid $color-secondary;
    overflow: hidden;
    transition: all .25s;
    cursor: crosshair;

    &:hover {
      max-height: 100px;
    }

    img {
      display: block;
      width: 100%;
    }
  }
}

</style>