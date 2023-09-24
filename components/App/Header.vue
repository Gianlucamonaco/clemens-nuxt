<script setup lang="ts">

const site = useSite()
const route = useRoute()
const loading = useLoading()
const audioTitle = useAudioTitle();
const isAudioAllowed = useIsAudioAllowed();
const { isDesktop } = useDevice();

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

    <div v-if="isDesktop" class="header__controls">
      <Switch
        :text="`Sound ${ isAudioAllowed ? 'on' : 'off' }`"
        :is-audio-allowed="isAudioAllowed"
        :on-click="() => { setIsAudioAllowed(!isAudioAllowed) }"
      />

      <div class="header__now-playing">
        <span v-if="audioTitle && isAudioAllowed">Listening: {{ audioTitle }}</span>
        <span v-else-if="!isAudioAllowed">Enable sound for full experience.</span>
      </div>

    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  height: 100%;
  width: $width-sidebar-s;
  padding: $height-unit $width-unit * 2;

  &__title {
    text-transform: uppercase;
    margin-bottom: $height-unit;
    user-select: none;
    white-space: nowrap;
  }

  &__item {
    padding-bottom: $height-unit;
    user-select: none;

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
    }
    50% {
      content: '▀ ';
    }
  }

  &__controls {
    border-top: 1px solid $color-dark-muted;
  }

  &__nav {
    padding-bottom: 1px;
  }

  &__now-playing {
    padding-bottom: $height-unit;
  }
}

@media (max-width: $breakpoint-mobile) {
  .header {
    z-index: 99999;
    flex-direction: row;
    justify-content: space-between;
    height: $height-unit * 3;
    width: 100%;
    background-color: $color-background;
    border-bottom: 1px solid $color-dark;

    &__nav {
      display: flex;
    }

    &__item {
      position: relative;
      &.active {
        padding-left: $width-unit * 2;
      }

      &.active::before {
        content: '▀ ';
        z-index: -1;
        position: absolute;
        left: $width-unit;
      }
    }

    &__controls {
      display: none;
    }
  }
}
</style>
