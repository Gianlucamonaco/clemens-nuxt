<script setup lang="ts">
import type { Category } from 'data/types';

const props = defineProps<{ category: Category }>()

const descriptionIndex = useDescriptionIndex();
const content = useContent();

const categoryEl = ref(null) as any;
const categoryItemsEl = ref(null) as any;
const description = useDescription() as any;
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
  categoryItemsEl.value.scrollLeft += 2 * scroll;
  _raf = requestAnimationFrame(animate)
}

</script>

<template>
<div>
  <section
    ref="categoryEl"
    class="category"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >

    <h3 class="category__title">{{ category.symbol }}</h3>

    <div ref="categoryItemsEl" class="category__items">

      <div
        v-for="child in category.children"
        :key="child.id"
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

  <div class="category__content" :class="{ active: descriptionIndex === props.category?.num }">
    <img v-for="image in description" :key="image" :src="image.url"/>

    <div class="category__text" v-html="content"></div>
  </div>

</div>
</template>

<style scoped lang="scss">

.category {
  height: $row;
  border-top: 1px solid $color-primary;
  border-bottom: 1px solid $color-primary;
  background-image:
    /* Horizontal lines */    
    linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
    /* Vertical lines */
    linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
  background-size: $column * 2 $unit-vertical;
  background-repeat: repeat;
  margin-bottom: $unit-vertical;

  &__items {
    display: flex;
    align-items: stretch;
    height: calc(100% - $unit-vertical);
    overflow-y: hidden;
    overflow-x: hidden;
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
      padding-bottom: $unit-vertical;
    }
  }

}

</style>
