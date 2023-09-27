<script setup lang="ts">
const content = useContent();
const { isMobile } = useDevice();

</script>

<template>
  <Html lang="en">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <Body :class="[content?.title && isMobile && 'no-scroll']">
      <LayoutFlex class="page">
        <AppHeader />

        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>

      </LayoutFlex>
    </Body>
  </Html>
</template>

<style lang="scss">
.layout-enter-active,
.layout-leave-active {
  transition: all 0.5s;
}
.layout-enter-from {
  opacity: 0;
  transform: translate(0, $height-unit);
}
.layout-leave-to {
  opacity: 0;
  transform: translate(0, $height-unit);
}
</style>