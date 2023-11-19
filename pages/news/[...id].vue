<script setup lang="ts">
import { getDefaultPageQuery, getPageQuery } from '~/queries'

definePageMeta({ layout: "news" });

const route = useRoute();
const { queryApi, queryParams } = useQueryParams(route.path == '/news' ? getDefaultPageQuery(route.path) : getPageQuery(route.path));
const { data } = await useAsyncData(route.path, () => $fetch(queryApi, queryParams));
const page = (data?.value as any)?.result;

setPage(page);
setDescriptionIndex(-1);

setTimeout(() => {
  setDescriptionIndex(page?.index);
  setContent({
    title: page?.title,
    description: page?.text,
    links: page?.links,
    tickets: page?.tickets,
    images: page?.images,
    videos: page?.videos,
  });
}, 250)

</script>

<template>
  <span></span>
</template>