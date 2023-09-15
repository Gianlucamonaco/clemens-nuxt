<script setup lang="ts">

</script>

<template>
  <Html lang="en">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <Body>
      <div class="page">
        <AppHeader />

        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>

      </div>
    </Body>
  </Html>
</template>

<style lang="scss">
.page {
  display: flex;
}

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