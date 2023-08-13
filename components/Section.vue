<script setup>
defineProps(['category']);

</script>

<template>
  <div>
    <h3 class="category__title">{{category.id}}</h3>

    <div
      v-for="project in category.children"
      :key="project.id"
      class="category__project"
    >
      {{ project.title }}
    </div>

</div>
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
