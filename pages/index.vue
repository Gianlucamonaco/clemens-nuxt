<script setup lang="ts">
import { homeQuery } from '~/queries';

const { queryApi, queryParams } = useQueryParams(homeQuery);
const { data } = await useFetch(queryApi, queryParams);
const page = (data?.value as any)?.result;

setPage(page);
</script>

<template>
<div class="content">

  <h1>{{ page?.title }}</h1>
  <div v-router-links v-html="page?.text" />
  <Section v-for="item in page.children" :key="item.id" :item="item" />

</div>
</template>