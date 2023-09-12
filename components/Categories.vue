<script setup lang="ts">
import { categoriesQuery } from '~/queries';
import { queryApi, queryHeaders } from "~/data/constants";
import random from 'random';

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
    project.position = random.int(0, 4) * 2;

    const imageSpacing = 9;

    // Assign offset left to each image dot
    project.images?.forEach((image: any) => {
      image.left = `${image.indexOf * imageSpacing * 10.2}px`;

      if (project.position > 4) {
        image.top = `${17 + random.int(0, 4) * 17}px`;
      }
      else {
        image.bottom = `${34 + random.int(0, 4) * 17}px`;
      }
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
