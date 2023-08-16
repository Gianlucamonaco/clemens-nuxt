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
  height: 170px;
  border-top: 1px solid #ff0000;
  border-bottom: 1px solid #ff0000;
  background-image: linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 183.6px 17px;
  background-repeat: repeat;
  margin-bottom: 34px;

  &__items {
    display: flex;
    align-items: stretch;
    height: calc(100% - 34px);
    overflow-y: hidden;
    overflow-x: scroll;
  }
}

</style>
