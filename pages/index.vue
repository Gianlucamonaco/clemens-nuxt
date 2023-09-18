<script setup lang="ts">
import { getPageQuery } from '~/queries'

// Set the current page data for the global page context
const { queryApi, queryParams } = useQueryParams(getPageQuery('home'));
const { data } = await useFetch(queryApi, queryParams);
const page = (data?.value as any)?.result;

setPage(page);

setContent({});

setDescriptionIndex(-1);

</script>

<template>
  <span></span>
</template>