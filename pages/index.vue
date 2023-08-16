<script setup lang="js">
import { homeQuery } from '~/queries';
import { queryApi, queryHeaders } from "../data/constants";

const { data: dataCategories } = await useFetch(queryApi, {
  method: "post",
  body: homeQuery,
  headers: queryHeaders,
});

const categories = dataCategories?.value?.result?.children?.filter(p => p.isListed) ?? {};

</script>

<template>
  <div class="categories">

    <Section v-for="category in categories" :key="category.id" :category="category">
      {{ category.title }}
    </Section>

</div>
</template>

<style scoped lang="scss">
</style>
