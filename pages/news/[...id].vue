<script setup lang="ts">
import { getPageQuery } from '~/queries'

definePageMeta({ layout: "news" });

const route = useRoute();
const { queryApi, queryParams } = useQueryParams(getPageQuery(route.path));
const { data } = await useFetch(queryApi, queryParams);
const page = (data?.value as any)?.result;

setPage(page);
setDescriptionIndex(-1);

setTimeout(() => {
  setDescriptionIndex(page?.num);
  setContent({ description: page?.text });
}, 250)

</script>

<template>
  <span></span>
</template>
