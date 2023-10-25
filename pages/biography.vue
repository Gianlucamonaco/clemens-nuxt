<script setup lang="ts">
import { aboutQuery } from '~/queries'

definePageMeta({
  layout: "about",
});

const { queryApi, queryParams } = useQueryParams(aboutQuery);
const { data } = await useAsyncData('about', () => $fetch(queryApi, queryParams));
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
  font-family: "rocky", serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 22.5px;
  letter-spacing: 0.015em;

  b, strong {
    font-weight: 700;
  }

  @media (max-width: $breakpoint-mobile) {
    width: 100%;
    margin-left: 0;
    margin-top: 0;

    font-size: 16px;
    line-height: 25px;
  }

  &__text {
    p, ul, h1, h2, h3, h4, h5, h6 {
     @media (max-width: $breakpoint-mobile) {
        padding: 0 $width-unit;
      }
    }
  }
}
</style>
