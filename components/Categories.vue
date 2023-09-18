<script setup lang="ts">
import { categoriesQuery } from '~/queries';
import { queryApi, queryHeaders } from "~/data/constants";

const { data: dataCategories } = await useFetch(queryApi, {
  method: "post",
  body: categoriesQuery,
  headers: queryHeaders,
});

const rawCategories = (dataCategories?.value as any)?.result?.children?.filter((p: any) => p.isListed) ?? [];
const categories = useProcessCategories(rawCategories);

</script>

<template>
<div class="categories">

  <Category
    v-for="category in categories"
    :key="category.id"
    :category="category"
  >
    {{ category.title }}
  </Category>

</div>
</template>

<style scoped lang="scss">
.categories {
  width: calc(100vw - $width-sidebar-s);
  padding-top: $height-unit;
  overflow: hidden;
}

</style>
