<script setup lang="ts">
// Explicitly not using `computed` here to avoid new page's content being
// rendered before the new page is visited
const page = usePage().value
</script>

<template>
  <header class="h1">
    <h1>
      {{ page?.headline || page?.title }}
    </h1>
    <p v-if="page?.subheadline" class="color-grey">{{ page.subheadline }}</p>
  </header>
</template>
