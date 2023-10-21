<script setup lang="ts">
import type { Project } from '@/data/types';

const props = defineProps<{ 
  item: Project,
  categoryIndex: number,
}>()

const route = useRoute();
const { isDesktop } = useDevice();

// Load all sounds
if (props.item.sounds?.length) {
  useLoadAudio(props.item.sounds.map(sound => sound.url))
}

const projectClass = isDesktop
  ? ['project', `duration-${props.item.duration}`, `position-${props.item.position}`]
  : ['project'];

</script>

<template>
  <NuxtLink
    :to="route.path.startsWith(`/${props.item.id}`) ? '/categories' : `/${item.id}`"
    :aria-current="route.path.startsWith(`/${props.item.id}`) ? 'page' : undefined"
  >
    <div :class="projectClass">
      <h3 class="project__title">
        <TextShuffle :text="item.title" :delay="item.num + categoryIndex" />
      </h3>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
.project {
  position: relative;
  flex-shrink: 0;
  padding-right: $width-unit * 4;
  height: $height-unit;

  @media (max-width: $breakpoint-mobile) {
    position: static;
    width: 100%;
    height: auto;
    padding: $height-unit $width-unit;
  }

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