<script setup lang="ts">
const route = useRoute()
const site = useSite()

let isAnimating = false;
const siteTitle = ref('');

const [ home, about ] = computed(() =>
  (site.value?.children ?? []).filter((i: any) => i.isListed)
).value;

const getShuffledText = (text: string) => {
  if (!isAnimating) {
    useShuffle(text, siteTitle, {
      onUpdate: () => isAnimating = true,
      onComplete: () => isAnimating = false,
    })
  }
}

getShuffledText(site.value?.title);

</script>

<template>
  <header class="header">
    <h1 class="header__title">{{ siteTitle }}</h1>

    <nav class="header__nav">

      <li :key="home" class="header__item">
        <NuxtLink
          :to="`/${home.id}`"
          :aria-current="route.path.startsWith(`/${home.id}`) ? 'page' : undefined"
        >
          Live score
        </NuxtLink>
      </li>

      <li :key="about" class="header__item">
        <NuxtLink
          :to="`/biography`"
          :aria-current="route.path.startsWith(`/${about.id}`) ? 'page' : undefined"
        >
          About
        </NuxtLink>
      </li>

    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  flex-shrink: 0;
  width: $width-sidebar-s;
  padding: $unit-vertical $unit-horizontal * 2;

  &__title {
    text-transform: uppercase;
    margin-bottom: $unit-vertical;
  }

  &__item {
    padding-bottom: $unit-vertical;

    &::before {
      content: '▀ ';
    }
  }
}
</style>
