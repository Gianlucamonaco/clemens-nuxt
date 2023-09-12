<script setup lang="ts">
import type { Category } from 'data/types';

const props = defineProps<{ category: Category }>()

const descriptionIndex = useDescriptionIndex();
const content = useContent();

const categoryEl = ref(null) as any;
const categoryItemsEl = ref(null) as any;
const description = useDescription() as any;
const scrollSpeed = 10;
let scroll = 0;
let _raf: any;

const handleMouseEnter = () => { animate() };

const handleMouseLeave = () => { cancelAnimationFrame(_raf) }

const handleMouseMove = (e: MouseEvent) => {
  scroll = useScrollAnimation({ width: categoryEl.value.clientWidth, offset: categoryEl.value.offsetLeft, x: e.clientX })
}

// Section animation on mouse move
const animate = () => {
  if (!categoryItemsEl.value) return;
  categoryItemsEl.value.scrollLeft += scrollSpeed * scroll;
  _raf = requestAnimationFrame(animate)
}

</script>

<template>
<div class="category-wrap">
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

        <Project
          v-if="child.intendedTemplate === 'project'"
          :item="child"
          :category-index="category.num"
        />

        <Pause v-else-if="child.intendedTemplate === 'pause'" :item="child" />

      </div>
    </div>

  </section>

  <div
    class="category__content"
    :class="{ active: descriptionIndex === props.category?.num }">

    <img v-for="image in description" :key="image" :src="image.url"/>

    <div class="category__text" v-html="content"></div>
  </div>

</div>
</template>

<style lang="scss">

.category {
  height: $row;
  border-top: 1px solid $color-primary;
  border-bottom: 1px solid $color-primary;
  background-image:
    /* Horizontal lines */    
    linear-gradient(rgba($color-primary, 0.1) 1px, transparent 1px);
    /* Vertical lines */
    /* linear-gradient(to right, rgba($color-primary, 0.1) 1px, transparent 1px); */
  background-size: $column * 2 $unit-vertical * 2;
  background-repeat: repeat;
  margin-bottom: $unit-vertical;

  &__items {
    display: flex;
    align-items: stretch;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;

    &::before {
      margin-right: #{$unit-horizontal * 4};
    }
    &::after {
      margin-left: #{$unit-horizontal * 4};
      margin-right: #{$unit-horizontal * 1.6};
    }

    &::before,
    &::after {
      content: '';
      position: relative;
      width: $unit-horizontal;
      height: 100%;
      background-color: $color-primary;
      flex-shrink: 0;
    }
  }

  &__content {
    height: 0;
    opacity: 0;
    transition: opacity .1s, height .5s;
    overflow-y: scroll;
    transition: all .5s;
    min-height: 0;

    &.active {
      min-height: $row;
      opacity: 1;
    }

    img {
      height: 100%;
    }
  }

  &__text {
    max-width: $column * 8;
    padding-bottom: $unit-vertical;

    p {
      padding-bottom: $unit-vertical !important;
    }

    li {
      font-size: $fontsize-s !important;
    }

  }

  &__title {
    position: absolute;
    white-space: pre-wrap;
  }

}

</style>
