<script setup lang="ts">
const route = useRoute()
const site = useSite()

const pages = computed(() =>
  (site.value?.children ?? []).filter((i: any) => i.isListed)
).value;

</script>

<template>
  <header class="header">
    <NuxtLink
      to="/"
      :aria-current="route.path.startsWith('/') ? 'page' : undefined"
    >
      <h1 class="header__title">{{ site.title }}</h1>
    </NuxtLink>

    <nav class="header__nav">

      <li v-for="page in pages" :key="page.id" class="header__item">
        <NuxtLink
          :to="`/${page.id}`"
          :aria-current="route.path.startsWith(`/${page.id}`) ? 'page' : undefined"
        >
          {{page.title}}
        </NuxtLink>
      </li>

    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 20px;

  &__nav {
    display: flex;
  }

  &__item {
    [aria-current="page"] {
      text-decoration: underline;
    }
  }
}
</style>
