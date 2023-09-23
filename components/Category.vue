<script setup lang="ts">
import type { Category } from 'data/types';

defineProps<{ category: Category }>()

const categoryEl = ref(null) as any;
const categoryItemsEl = ref(null) as any;
const scrollSpeed = 10;
const loading = useLoading();
const { isMobile, isDesktop } = useDevice();

let scroll = 0;
let _raf: any;

const handleMouseEnter = () => { if (isDesktop) animate() };

const handleMouseLeave = () => { if (isDesktop) cancelAnimationFrame(_raf) }

const handleMouseMove = (e: MouseEvent) => {
  if (isDesktop) {
    scroll = useScrollAnimation({ width: categoryEl?.value?.clientWidth, offset: categoryEl?.value?.offsetLeft, x: e.clientX })
  }
}

// Section animation on mouse move
const animate = () => {
  if (!categoryItemsEl.value) return;
  categoryItemsEl.value.scrollLeft += scrollSpeed * scroll;
  _raf = requestAnimationFrame(animate)
}

</script>

<template>
<div v-if="!loading" class="category-wrap">
  <section
    ref="categoryEl"
    class="category"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >

    <div ref="categoryItemsEl" class="category__items">
      <div
        v-for="child in category.children"
        :key="child.id"
        class="project-wrap"
      >

        <SectionProject
          v-if="child.intendedTemplate === 'project'"
          :item="child"
          :category-index="category.num"
        />

        <SectionPause v-else-if="child.intendedTemplate === 'pause' && !isMobile" :item="child" />

      </div>
    </div>

  </section>

  <SectionDetails :category-index="category.num" />

</div>
</template>

<style lang="scss">

.category {
  height: $height-row;
  border-top: 1px solid $color-dark;
  border-bottom: 1px solid $color-dark;
  background-image:
    /* Horizontal lines */    
    linear-gradient($color-dark-muted 1px, transparent 1px);
    /* Vertical lines */
    /* linear-gradient(to right, $color-dark-muted 1px, transparent 1px); */
  background-size: $width-column * 2 $height-unit * 2;
  background-repeat: repeat;
  margin-bottom: $height-unit;

  @media (max-width: $breakpoint-mobile) {
    height: auto;
  }

  &__items {
    display: flex;
    align-items: stretch;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;

    &::before {
      margin-right: #{$width-unit * 4};
    }
    &::after {
      margin-left: #{$width-unit * 4};
      margin-right: #{$width-unit * 1.6};
    }

    &::before,
    &::after {
      content: '';
      position: relative;
      width: $width-unit;
      height: 100%;
      background-color: $color-dark;
      flex-shrink: 0;
    }

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
      padding-top: calc($height-unit + 4px);
      border-left: $width-unit solid $color-dark;
      border-right: $width-unit solid $color-dark;
    }
  }

  &__title {
    position: absolute;
    white-space: pre-wrap;
  }
}

</style>
