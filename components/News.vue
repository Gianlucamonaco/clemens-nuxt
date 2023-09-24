<script setup lang="ts">
import { newsQuery } from '~/queries'

const { queryApi, queryParams } = useQueryParams(newsQuery);
const { data } = await useFetch(queryApi, queryParams);
const page = (data.value as any)?.result;
const route = useRoute();

</script>

<template>
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
</template>

<style lang="scss">
.news {
  &__header {
    padding: $height-unit 0;

    @media (max-width: $breakpoint-mobile) {
      padding: $height-unit $width-unit;
      border-left: $width-unit solid $color-dark;
      border-right: $width-unit solid $color-dark;
    }
  }

  &__items {
    margin-top: $height-unit;
    margin-right: $height-unit;

    @media (max-width: $breakpoint-mobile) {
      margin-right: 0;
    }
  }

  &__item {
    border-bottom: 1px solid $color-dark;

    &:first-of-type {
      border-top: 1px solid $color-dark;
    }

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
