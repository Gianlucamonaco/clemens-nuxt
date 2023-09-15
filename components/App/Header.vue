<script setup lang="ts">
const route = useRoute()
const site = useSite()

let isAnimating = false;
const siteTitle = ref('');

const pages = computed(() =>
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

const home = pages.find((p: any) => p.id == 'home');
const about = pages.find((p: any) => p.id == 'biography');
const archive = pages.find((p: any) => p.id == 'archive');

getShuffledText(site.value?.title);

</script>

<template>
  <header class="header">
    <h1 class="header__title">{{ siteTitle }}</h1>

    <nav class="header__nav">

      <li :key="home" class="header__item" :class="route.path.startsWith('/categories') || route.path === '/' ? 'active' : null">
        <NuxtLink
          :to="`/${home.id}`"
          :aria-current="route.path.startsWith(`/${home.id}`) ? 'page' : undefined"
        >
          Score
        </NuxtLink>
      </li>

      <li v-if="archive" :key="archive" class="header__item" :class="route.path.startsWith(`/${archive?.id}`) ? 'active' : null">
        <NuxtLink
          :to="`/${archive?.id}`"
          :aria-current="route.path.startsWith(`/${archive?.id}`) ? 'page' : undefined"
        >
          Archive
        </NuxtLink>
      </li>

      <li v-if="about" :key="about" class="header__item" :class="route.path.startsWith(`/${about?.id}`) ? 'active' : null">
        <NuxtLink
          :to="`/biography`"
          :aria-current="route.path.startsWith(`/${about?.id}`) ? 'page' : undefined"
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
  padding: $height-unit $width-unit * 2;

  &__title {
    text-transform: uppercase;
    margin-bottom: $height-unit;
  }

  &__item {
    padding-bottom: $height-unit;

    &:not(.active) {
      padding-left: $width-unit * 2;
    }

    &.active::before {
      content: '▀ ';
      color: $color-light;
      animation: activeItem 2s steps(1) infinite;
    }
  }

  @keyframes activeItem {
    0% {
      content: '▄ ';
      /* color: $color-highlight; */
    }
    50% {
      content: '▀ ';
      /* color: $color-light; */
    }
  }
}
</style>
