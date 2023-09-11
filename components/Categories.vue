<script setup lang="ts">
import { categoriesQuery } from '~/queries';
import { queryApi, queryHeaders } from "~/data/constants";

const { data: dataCategories } = await useFetch(queryApi, {
  method: "post",
  body: categoriesQuery,
  headers: queryHeaders,
});

const categories = (dataCategories?.value as any)?.result?.children?.filter((p: any) => p.isListed) ?? {};

// On app load
categories.forEach((category: any) => {
  category.children?.forEach((project: any) => {

    // Assign vertical position to each project
    project.position = Math.floor(Math.random() * 7 + 1);

    const imageSpacing = Math.floor(Math.random() * 4 + 2);

    // Assign offset left to each image dot
    project.images?.forEach((image: any) => {
      image.left = `${image.indexOf * imageSpacing * 10.2}px`;
    })
  })
})

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
  margin-top: $unit-vertical;
  overflow: hidden;
}

</style>
