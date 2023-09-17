<script setup lang="ts">
import { getPageQuery } from '~/queries'
import { queryApi, queryHeaders } from "~/data/constants";

definePageMeta({ layout: "news" });

const route = useRoute();

const { data: pageData } = await useFetch(queryApi, {
  method: "post",
  body: getPageQuery(route.path),
  headers: queryHeaders,
});

const data = pageData.value;
const page = (data as any)?.result;

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
