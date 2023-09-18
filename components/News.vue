<script setup lang="ts">
import { newsQuery } from '~/queries'
import { queryApi, queryHeaders } from "~/data/constants";

const { data: pageData } = await useFetch(queryApi, {
  method: "post",
  body: newsQuery,
  headers: queryHeaders,
});

const page = (pageData.value as any)?.result;
const route = useRoute();

</script>

<template>
<ul class="news__items">
  <li
    v-for="news in page.children"
    :key="news.id"
    class="news__item"
  >
    <NuxtLink
      :to="route.path.startsWith(`/${news.id}`) ? '/news' : `/${news.id}`"
      :aria-current="route.path.startsWith(`/${news.id}`) ? 'page' : undefined">
      <div class="news__header">
        <h3 class="news__title"><TextShuffle :text="news.title" :delay="news.num" /></h3>
        <span class="news__date">{{useFormattedDate(news.date)}}</span>
      </div>
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
    display: flex;
    justify-content: space-between;
  }

  &__items {
    padding-top: $height-unit;
    margin-right: $height-unit;
  }

  &__item {
    border-bottom: 1px solid $color-dark;

    &:first-of-type {
      border-top: 1px solid $color-dark;
    }

    &:hover,
    [aria-current=page] {
      .news__title {
        background-color: $color-highlight;
        color: $color-light;
      }
    }

    a {
      display: block;
      padding: $height-unit 0;
    }
  }
}
</style>
