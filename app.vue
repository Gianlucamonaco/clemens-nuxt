<template>
  <Html lang="en">
    <Head>
      <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <Body>
      <div class="page">
        <AppHeader />

        <main class="main">
          <NuxtPage />
        </main>
      </div>
    </Body>
  </Html>
</template>

<style scoped lang="scss">
.page {
  display: flex;
}
</style>