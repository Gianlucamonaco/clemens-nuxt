<script setup lang="ts">
const props = defineProps<{
  gap?: number,
  alignItems?: string,
  justifyContent?: string,
  flexWrap?: string,
}>();

const style = {
  gap: `${props.gap ?? 0.5}px`,
  alignItems: props.alignItems ?? 'flex-start',
  justifyContent: props.justifyContent ?? 'flex-start',
};
</script>

<template>
  <div class="flex" :style="style">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.flex {
  display: flex;
}
</style>