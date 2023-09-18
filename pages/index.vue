<script setup lang="ts">
import { INTRO_DURATION } from '@/data/constants';
import { getPageQuery } from '~/queries'

const route = useRoute();

// Use loading component only on homepage
if (route.path === '/') {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
  }, INTRO_DURATION);
}

// Set the current page data for the global page context
const { queryApi, queryParams } = useQueryParams(getPageQuery('home'));
const { data } = await useFetch(queryApi, queryParams);
const page = (data?.value as any)?.result;
const loading = useLoading();

setPage(page);

setContent({});

setDescriptionIndex(-1);

</script>

<template>
  <Loading v-if="loading" />
</template>