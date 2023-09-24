<script setup lang="ts">
import { WIDTH_UNIT } from '@/data/constants';

defineProps<{
  text?: string,
  isAudioAllowed?: boolean,
  onClick?: () => void,
}>()
</script>

<template>
  <LayoutFlex
    :gap="WIDTH_UNIT"
    class="switch"
    :class="{ active: isAudioAllowed }"
    @click="onClick"
  >
    {{ text }}
  </LayoutFlex>
</template>

<style scoped lang="scss">
.switch {
  width: 100%;
  font-size: $fontsize-m;
  padding: $height-unit 0;
  user-select: none;
  cursor: crosshair;

  &:before {
    content: '';
    display: inline-block;
    position: relative;
    background-color: $color-dark-muted;
    border-left: $width-unit solid $color-light;
    border-right: none;
    width: $width-unit * 2;
    height: $height-unit;
  }

  &.active:before {
    background-color: $color-highlight;
    border-right: $width-unit solid $color-light;
    border-left: none;
  }
}
</style>