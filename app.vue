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

        <ImageThumb />
      </div>
    </Body>
  </Html>
</template>

<style lang="scss">
.page {
  display: flex;
}
</style>