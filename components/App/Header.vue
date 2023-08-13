<script setup lang="ts">
const route = useRoute()
const site = useSite()

const listedChildren = computed(() =>
  (site.value?.children ?? []).filter((i) => i.isListed)
)
</script>

<template>
  <header class="header">
    <nav class="menu">
      <NuxtLink
        v-for="item in listedChildren"
        :key="item.id"
        :to="`/${item.id}`"
        :aria-current="
          route.path.startsWith(`/${item.id}`) ? 'page' : undefined
        "
      >
        {{ item.title }}
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
</style>
