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
    <NuxtLink :to="`/${news.id}`" :aria-current="route.path.startsWith(`/${news.id}`) ? 'page' : undefined">
      <div class="news__header">
        <TextShuffle :text="news.title" :delay="news.num" />
        <span>{{useFormattedDate(news.date)}}</span>
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
  &__content {
    padding-top: $height-unit;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__item {
    padding: $height-unit 0;
    border-bottom: 1px solid $color-dark;
  }

  &__wrap {
    width: 100%;
    margin-top: $height-unit;
    margin-right: $height-unit;
    border-top: 1px solid $color-dark;
  }
}
</style>
