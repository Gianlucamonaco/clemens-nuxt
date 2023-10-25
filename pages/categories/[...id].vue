<script setup lang="ts">
import { getDefaultPageQuery, getPageQuery } from '~/queries'

definePageMeta({
  scrollToTop: false,
})

// Fetch page data
const route = useRoute();
const { queryApi, queryParams } = useQueryParams(route.path == '/categories' ? getDefaultPageQuery(route.path) : getPageQuery(route.path));
const { data } = await useAsyncData(route.path, () => $fetch(queryApi, queryParams));
const page = (data?.value as any)?.result;

setPage(page);
setDescriptionIndex(-1);

// Load images before setting new content and description index
if (page?.images) await Promise.all(
  page?.images?.map((img: any) => new Promise(res => {
    const el = new Image();
    el.onload = () => res('');
    el.src = img.url;
  }))
)

setTimeout(() => {
  setDescriptionIndex(page?.parentIndex);
  setContent({
    title: page?.title,
    description: page?.text,
    links: page?.links,
    downloads: page?.downloads,
    images: page?.images,
    videos: page?.videos,
  });
}, 250)

</script>

<template>
  <span></span>
</template>
