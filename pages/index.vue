<script setup lang="ts">
import { getPageQuery } from '~/queries'

const route = useRoute();
const isIntroLoaded = useIntroLoaded();
const isIntroSetup = useIntroSetup();
const {isMobile} = useDevice();

const isHomepage = route.path === '/';
if (isHomepage) {
  if (!isIntroSetup.value && !isMobile) {
    setIntroSetup(false);
    setIntroLoaded(false)
  }
  else {
    setIntroSetup(true);
    setIntroLoaded(false)
  }
}

// Set the current page data for the global page context
const { queryApi, queryParams } = useQueryParams(getPageQuery('home'));
const { data } = await useFetch(queryApi, queryParams);
const page = (data?.value as any)?.result;

setPage(page);

setContent({});

setDescriptionIndex(-1);

</script>

<template>
  <Intro v-if="!isIntroLoaded || !isIntroSetup" />
</template>