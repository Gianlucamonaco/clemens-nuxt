<script setup lang="ts">
import { aboutQuery } from '~/queries'

definePageMeta({
  layout: "about",
});

const { queryApi, queryParams } = useQueryParams(aboutQuery);
const { data } = await useFetch(queryApi, queryParams);
const page = (data?.value as any)?.result;

setPage(page);

</script>

<template>
<div class="about">
  <div class="about__text kirbytext" v-html="page.text"></div>
</div>
</template>

<style lang="scss">
.about {
  width: calc(100vw - $width-sidebar-s);
  margin-left: $width-sidebar-s;
  margin-top: $height-unit;

  /* &__text {
  } */
}
</style>
