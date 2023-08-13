<script setup lang="js">

const { KIRBY_BASE_URL } = useRuntimeConfig().app;

const api = `${KIRBY_BASE_URL}/api/query`;
const headers = {
  // Authorization: `Basic ${btoa(KIRBY_API_USERNAME + ":" + KIRBY_API_PASSWORD)}`,
  // Authorization: `Bearer ${KIRBY_API_TOKEN}`,
  Accept: "application/json",
};

const queryCategories = 'page("categories")';

const selectCategories = {
  title: true,
  children: {
    query: `${queryCategories}.children`,
    select: {
      id: true,
      title: true,
      isListed: true,
      children: true,
    }
  },
};

const { data: dataCategories } = await useFetch(api, {
  method: "post",
  body: {
    query: queryCategories,
    select: selectCategories
  },
  headers,
});

const categories = dataCategories?.value?.result?.children?.filter(p => p.isListed) ?? {};

// ------------------------
</script>

<template>
  <div>


</div>
</template>

<style scoped lang="scss">
</style>
