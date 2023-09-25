<script setup lang="ts">
import { categoriesQuery } from '~/queries';

const { queryApi, queryParams } = useQueryParams(categoriesQuery);
const { data } = await useFetch(queryApi, queryParams);
const rawCategories = (data?.value as any)?.result?.children?.filter((p: any) => p.isListed) ?? [];
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
  margin-left: $width-column * 3;
  padding-top: $height-unit;
  overflow: hidden;
  
  @media (max-width: $breakpoint-mobile) {
    width: 100%;
    margin-left: 0;
    padding-top: 0;
  }
}


</style>
