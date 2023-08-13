<script setup lang="js">
import { homeQuery, queryApi, queryHeaders } from '~/queries';

const { data: dataCategories } = await useFetch(queryApi, {
  method: "post",
  body: homeQuery,
  headers: queryHeaders,
});

const categories = dataCategories?.value?.result?.children?.filter(p => p.isListed) ?? {};

</script>

<template>
  <div>

    <Section v-for="category in categories" :key="category.id" :category="category">
      {{ category.title }}
    </Section>

</div>
</template>

<style scoped lang="scss">
</style>
