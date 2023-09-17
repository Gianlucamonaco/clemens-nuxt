<script setup lang="ts">
import type { Project } from '../../data/types';
import { soundSymbol } from '../../data/constants';

const props = defineProps<{ 
  item: Project,
  categoryIndex: number,
}>()

const route = useRoute();

const projectClass = ['project', `duration-${props.item.duration}`, `position-${props.item.position}`];
const soundClass = ['project__icon', 'project__sound', 'blink-hover-4'];

</script>

<template>
  <NuxtLink
    :to="route.path.startsWith(`/${props.item.id}`) ? '/' : `/${item.id}`"
    :aria-current="route.path.startsWith(`/${props.item.id}`) ? 'page' : undefined"
  >
    <div :class="projectClass">
      <h3 class="project__title">
        <TextShuffle :text="item.title" :delay="item.num + categoryIndex" />
      </h3>

      <div v-if="item.sounds" class="project__sounds">
        <div
          v-for="sound in item.sounds"
          :key="sound.id"
          :class="soundClass"
          :style="{
            left: sound.left,
            top: (sound.top ?? 'auto'),
            bottom: (sound.bottom ?? 'auto'),
          }"
          >
          <!-- 
            @mouseenter="play(sound.url)"
            @mouseleave="stop()"
            {{ item.id }}
          -->
          {{ soundSymbol }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
.project {
  position: relative;
  flex-shrink: 0;
  padding-right: $width-unit * 4;

  &__title {
    display: inline;
  }

  &__icon {
    position: absolute;
    width: $width-unit;
    height: $height-unit;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__sound {
    position: absolute;
    width: $width-column;
    font-size: $fontsize-m;
    color: $color-light;
    transition: all .25s;
  }
}

.project-wrap {

  &:hover,
  [aria-current=page] {
    .project__title {
      background-color: $color-highlight;
      color: $color-light;
    }
  }

  a {
    display: block;
    height: 100%;
  }
}

</style>