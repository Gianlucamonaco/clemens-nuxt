<script setup lang="ts">
import { categoriesQuery } from '~/queries';

const { isMobile } = useDevice();
const { queryApi, queryParams } = useQueryParams(categoriesQuery);
const { data } = await useAsyncData('categories', () => $fetch(queryApi, queryParams));
const rawCategories = (data?.value as any)?.result?.children?.filter((p: any) => p.isListed) ?? [];
const categories = useProcessCategories(rawCategories);
const loaded = useIntroLoaded();

</script>

<template>
<div v-if="loaded" class="categories">

  <Category
    v-for="category in categories"
    :key="category.id"
    :category="category"
  >
    {{ category.title }}
  </Category>

  <SectionMobileDetails v-if="isMobile" parent-url="/categories" />

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
