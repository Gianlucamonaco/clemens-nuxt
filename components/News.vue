<script setup lang="ts">
import { WIDTH_UNIT } from '~/data/constants';
import { newsQuery } from '~/queries'

const route = useRoute();
const { isMobile } = useDevice();
const { queryApi, queryParams } = useQueryParams(newsQuery);
const { data } = await useAsyncData('news', () => $fetch(queryApi, queryParams));
const page = (data.value as any)?.result;


</script>

<template>
<div class="news">
  <ul class="news__items">
    <li
      v-for="news in page?.children"
      :key="news.id"
      class="news__item"
    >
      <NuxtLink
        :to="route.path.startsWith(`/${news.id}`) ? '/news' : `/${news.id}`"
        :aria-current="route.path.startsWith(`/${news.id}`) ? 'page' : undefined">
        <LayoutFlex class="news__header" justify-content="space-between" :gap="WIDTH_UNIT">
          <h3 class="news__title"><TextShuffle :text="news.title" :delay="news.index" /></h3>
          <span class="news__location">{{news.location}}</span>
          <span class="news__date">{{useFormattedDate(news.date)}}</span>
        </LayoutFlex>
      </NuxtLink>

      <div class="news__content">
        <SectionDetails v-if="!isMobile" :category-index="news.index ?? -1" />
      </div>

    </li>
  </ul>

  <SectionMobileDetails v-if="isMobile" parent-url="/news" />
</div>
</template>

<style lang="scss">
.news {
  width: calc(100vw - $width-sidebar-s);
  margin-left: $width-sidebar-s;
  margin-top: $height-unit;

  @media (max-width: $breakpoint-mobile) {
    width: 100%;
    margin-left: 0;
    margin-top: 0;
  }

  &__header {
    padding: $height-unit 0;

    @media (max-width: $breakpoint-mobile) {
      flex-wrap: wrap;
      padding: $height-unit $width-unit;
    }
  }

  &__items {
    padding-right: $height-unit;
    border-top: 1px solid $color-dark;

    @media (max-width: $breakpoint-mobile) {
      padding-right: 0;
      border-top: none;
    }
  }

  &__item {
    width: 100%;
    border-bottom: 1px solid $color-dark;

    &:hover,
    [aria-current=page] {
      .news__title span {
        background-color: $color-highlight;
        color: $color-light;
      }
    }

    a {
      display: block;
    }
  }

  &__title {
    flex: 4;

    @media (max-width: $breakpoint-mobile) {
      min-width: 100%;
    }
  }

  &__location {
    flex: 1;

    @media (max-width: $breakpoint-mobile) {
      font-size: $fontsize-s;
    }
  }

  &__date {
    flex: 1;
    white-space: nowrap;
    text-align: right;

    @media (max-width: $breakpoint-mobile) {
      font-size: $fontsize-s;
    }
  }

  &__content .details.active {
    padding-top: $height-unit;
  }
}
</style>
