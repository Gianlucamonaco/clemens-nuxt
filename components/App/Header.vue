<script setup lang="ts">
const site = useSite()
const route = useRoute()
const loading = useLoading()

const pages = computed(() =>
  (site.value?.children ?? [])
).value;

const home = pages.find((p: any) => p.id == 'home');
const news = pages.find((p: any) => p.id == 'news');
const about = pages.find((p: any) => p.id == 'biography');
const archive = pages.find((p: any) => p.id == 'archive');
const categories = pages.find((p: any) => p.id == 'categories');

</script>

<template>
  <header v-if="!loading" class="header">
    <h1 class="header__title">
      <NuxtLink to="/">
        <TextShuffle :text="site.title"/>
      </NuxtLink>
    </h1>

    <nav class="header__nav">

      <li :key="home" class="header__item" :class="route.path.startsWith(`/${categories?.id}`) || route.path === '/' ? 'active' : null">
        <NuxtLink
          :to="`/${categories?.id}`"
          :aria-current="
            home?.id && route.path.startsWith(`/${home.id}`) ||
            categories?.id && route.path.startsWith(`/${categories.id}`)
            ? 'page' : undefined"
        >
        <TextShuffle text="Score" :duration="0.2" />
        </NuxtLink>
      </li>

      <li v-if="archive" :key="archive" class="header__item" :class="route.path.startsWith(`/${archive?.id}`) ? 'active' : null">
        <NuxtLink
          :to="`/${archive?.id}`"
          :aria-current="route.path.startsWith(`/${archive?.id}`) ? 'page' : undefined"
        >
        <TextShuffle text="Archive" :duration="0.2" />
        </NuxtLink>
      </li>

      <li v-if="news" :key="news" class="header__item" :class="route.path.startsWith(`/${news?.id}`) ? 'active' : null">
        <NuxtLink
          :to="`/${news?.id}`"
          :aria-current="route.path.startsWith(`/${news?.id}`) ? 'page' : undefined"
        >
        <TextShuffle text="News" :duration="0.2" />
        </NuxtLink>
      </li>

      <li v-if="about" :key="about" class="header__item" :class="route.path.startsWith(`/${about?.id}`) ? 'active' : null">
        <NuxtLink
          :to="`/biography`"
          :aria-current="route.path.startsWith(`/${about?.id}`) ? 'page' : undefined"
        >
        <TextShuffle text="About" :duration="0.2" />
        </NuxtLink>
      </li>

    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
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
