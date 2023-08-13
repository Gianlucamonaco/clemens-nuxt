<script setup lang="ts">
const site = useSite()
const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

<template>
  <footer class="footer">

    <li v-for="item in listedChildren" :key="item.id">
      <NuxtLink :to="`/${item.id}`">{{ item.title }}</NuxtLink>
    </li>

  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 9rem 0 6rem;
  line-height: 1.5em;
}
</style>
