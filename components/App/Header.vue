<script setup lang="ts">

const site = useSite()
const route = useRoute()
const loaded = process.client && useIntroLoaded();
const audioTitle = useAudioTitle();
const isAudioAllowed = useIsAudioAllowed();
const { isDesktop, isMobile } = useDevice();

const pages = computed(() =>
  (site.value?.children ?? [])
).value;

const home = pages.find((p: any) => p.id == 'home');
const dates = pages.find((p: any) => p.id == 'dates' || p.id == 'news');
const biography = pages.find((p: any) => p.id == 'about' || p.id == 'biography');
const categories = pages.find((p: any) => p.id == 'categories');

</script>

<template>
  <header v-if="loaded" class="header">
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

      <li v-if="dates" :key="dates" class="header__item" :class="route.path.startsWith(`/${dates?.id}`) ? 'active' : null">
        <NuxtLink
          :to="`/${dates?.id}`"
          :aria-current="route.path.startsWith(`/${dates?.id}`) ? 'page' : undefined"
        >
        <TextShuffle text="Dates" :duration="0.2" />
        </NuxtLink>
      </li>

      <li v-if="biography" :key="biography" class="header__item" :class="route.path.startsWith(`/${biography?.id}`) ? 'active' : null">
        <NuxtLink
          :to="`/biography`"
          :aria-current="route.path.startsWith(`/${biography?.id}`) ? 'page' : undefined"
        >
        <TextShuffle :text="isMobile ? 'Bio' : 'Biography'" :duration="0.2" />
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
    z-index: 9999;
    flex-direction: row;
    justify-content: space-between;
    height: $height-unit * 3;
    width: 100%;
    background-color: $color-background;
    border-bottom: 1px solid $color-dark;
    padding-left: $width-unit;
    padding-right: $width-unit;

    &__nav {
      display: flex;
    }

    &__item {
      position: relative;
      &.active {
        margin-left: $width-unit * 2;
        background-color: $color-highlight;
        color: $color-light;
      }

      &.active::before {
        content: '';
        display: none;
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
