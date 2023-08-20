<script setup lang="ts">
import { homeQuery } from '~/queries';
import { queryApi, queryHeaders } from "~/data/constants";

const { data: dataCategories } = await useFetch(queryApi, {
  method: "post",
  body: homeQuery,
  headers: queryHeaders,
});

const categories = (dataCategories?.value as any)?.result?.children?.filter((p: any) => p.isListed) ?? {};

</script>

<template>
<div class="categories">

  <Category v-for="category in categories" :key="category.id" :category="category">
    {{ category.title }}
  </Category>

</div>
</template>

<style scoped lang="scss">
.categories {
  width: calc(100vw - $width-sidebar-s);
  margin-top: $unit-vertical;
  overflow: hidden;
}

</style>
