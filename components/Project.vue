<script setup lang="ts">
import type { Project } from '../data/types';
import { soundSymbol } from '../data/constants';

const props = defineProps<{ 
  item: Project,
  categoryIndex: number,
}>()

const projectTitle = ref('');
const route = useRoute();

const projectClass = ['project', `duration-${props.item.duration}`, `position-${props.item.position}`];
const soundClass = ['project__icon', 'project__sound', 'blink-hover-4'];

// when shuffle text is triggered, disable new animations
// while title is still animating
let isAnimating = false;
const getShuffledText = (text: string) => {
  if (!isAnimating) useShuffle(text, projectTitle, {
    onUpdate: () => isAnimating = true,
    onComplete: () => isAnimating = false,
  })
}

// on component mount, animate in with a delay
// based on item index and category index
setTimeout(() => {
  getShuffledText(props.item?.title)
}, 100 * (props.item?.num + props.categoryIndex));

</script>

<template>
  <NuxtLink :to="`/${item.id}`" :aria-current="route.path.startsWith(`/${props.item.id}`) ? 'page' : undefined">
    <div :class="projectClass">
      <h3 class="project__title" @mouseenter="getShuffledText(item.title)">
        {{ projectTitle }}
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
  padding-right: $unit-horizontal * 4;

  &__title {
    display: inline;
  }

  &__icon {
    position: absolute;
    width: $unit-horizontal;
    height: $unit-vertical;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__sound {
    position: absolute;
    width: $column;
    font-size: $fontsize-m;
    color: $color-secondary;
    transition: all .25s;
  }
}


    img {
      display: block;
      width: 100%;
    }
  }
}

</style>