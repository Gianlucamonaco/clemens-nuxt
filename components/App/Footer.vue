<script setup lang="ts">
const site = useSite()

const [ home, about ] = computed(() =>
  (site.value?.children ?? []).filter((i: any) => i.isListed)
).value;

</script>

<template>
  <footer class="footer">
    <div class="footer__items">
      <span>Copyright</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 20px;
}
</style>