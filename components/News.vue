<script setup lang="ts">
import { newsQuery } from '~/queries'

const { queryApi, queryParams } = useQueryParams(newsQuery);
const { data } = await useFetch(queryApi, queryParams);
const page = (data.value as any)?.result;
const route = useRoute();

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
        <LayoutFlex class="news__header" justify-content="space-between">
          <h3 class="news__title"><TextShuffle :text="news.title" :delay="news.num" /></h3>
          <span class="news__date">{{useFormattedDate(news.date)}}</span>
        </LayoutFlex>
      </NuxtLink>

      <div class="news__content">
        <SectionDetails :category-index="news.num" />
      </div>

    </li>
  </ul>
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

  &__date {
    white-space: nowrap;
  }

  &__content .details.active {
    padding-top: $height-unit;
  }
}
</style>
