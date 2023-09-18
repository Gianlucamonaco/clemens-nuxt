<script setup lang="ts">
import { getPageQuery } from '~/queries'

definePageMeta({
  scrollToTop: false,
})

// Fetch page data
const kirbyPath = useRoute().path;
const { queryApi, queryParams } = useQueryParams(getPageQuery(kirbyPath));
const { data } = await useFetch(queryApi, queryParams);
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
    description: page?.text,
    links: page?.links,
    downloads: page?.downloads,
    images: page?.images,
  });
}, 250)

</script>

<template>
  <span></span>
</template>
