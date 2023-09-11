<script setup lang="ts">
const thumb = useImageThumb();
const mousePos = useMousePos();
</script>

<template>
  <div v-if="thumb" class="image-thumb" :style="{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }">
    <img :src="thumb.url" :alt="thumb.alt">
  </div>
</template>

<style scoped lang="scss">
.image-thumb {
  position: fixed;
  bottom: 0;
  left: 0;
  pointer-events: none;
  
  img {
    width: $column * 3;
    height: auto;
    border: 10px solid $color-secondary;
  }
}
</style>