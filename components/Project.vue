<script setup lang="ts">
import type { Project } from '../data/types';

defineProps<{ project: Project }>()

const pauseValues = {
  minima: 8,
  semiminima: 4,
  croma: 2,
}

</script>

<template>

<div
  v-if="project.intendedTemplate === 'pause'"
  class="pause"
  :class="[ `duration-${pauseValues[project.type.toLowerCase()]}`, `position-4` ]"
>
  <h3 class="pause-title">P</h3>

</div>

<div
  v-else
  class="project"
  :class="[ `duration-${project.duration}`, `position-${project.position}` ]"
>

  <h3 class="project-title">{{ project.title }}</h3>

</div>
</template>

<style scoped lang="scss">
</style>