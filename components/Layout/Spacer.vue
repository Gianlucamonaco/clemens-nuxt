<script setup lang="ts">
const props = defineProps<{
  top?: number,
  bottom?: number,
  left?: number,
  right?: number,
}>();

const style = {
  marginTop: `${props.top ?? 0}px`,
  marginBottom: `${props.bottom ?? 0}px`,
  marginLeft: `${props.left ?? 0}px`,
  marginRight: `${props.right ?? 0}px`,
};
</script>

<template>
  <div class="spacer-wrap" :style="style">
    <slot />
  </div>
</template>
