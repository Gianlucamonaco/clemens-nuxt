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

  &__title {
    padding: 10px;
  }

  &__project {
    padding: 10px 20px;
  }
}

</style>
