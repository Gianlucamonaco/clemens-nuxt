<script setup lang="ts">
import type { Category } from 'data/types';

defineProps<{ category: Category }>()

</script>

<template>
<section class="category">

  <h3 class="category__title">{{ category.symbol }}</h3>

  <div class="category__items">
    <Project v-for="project in category.children" :key="project.id" :project="project" />
  </div>

</section>
</template>

<style scoped lang="scss">

.category {
  height: $row;
  border-top: 1px solid $color-primary;
  border-bottom: 1px solid $color-primary;
  background-image:
    /* Horizontal lines */    
    linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
    /* Vertical lines */
    linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
  background-size: $column * 2 $unit-vertical;
  background-repeat: repeat;
  margin-bottom: $unit-vertical * 2;

  &__items {
    display: flex;
    align-items: stretch;
    height: calc(100% - $unit-vertical * 2);
    overflow-y: hidden;
    overflow-x: scroll;
  }
}

</style>
