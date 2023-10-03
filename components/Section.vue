<script setup lang="ts">

defineProps<{ item: any }>()

</script>

<template>
<section class="section">
  <h3 class="section__title">{{ item.title }}</h3>
</section>
</template>

<style scoped lang="scss">

.section {
  background-color: #eee;
  border-radius: 5px;
  margin: 10px;
}

</style>
