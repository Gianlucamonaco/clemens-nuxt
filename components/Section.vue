<script setup lang="ts">
import type { Category } from 'data/types';

defineProps<{ category: Category }>()
const categoryEl = ref(null) as any;
const categoryItemsEl = ref(null) as any;
let scroll = 0;
let _raf: any;

const handleMouseEnter = () => { animate() };

const handleMouseLeave = () => { cancelAnimationFrame(_raf) }

const handleMouseMove = (e: MouseEvent) => {
  const { clientWidth, offsetLeft } = categoryEl.value;
  const { clientX } = e;
  const perc = (clientX - offsetLeft) / clientWidth;

  if ((perc > 0.25 && perc < 0.75) && scroll !== 0) {
    scroll = 0
  }
  else if (perc > 0.75 && scroll < 1) {
    scroll = 5 * (perc - 0.75)
  }
  else if (perc < 0.25 && scroll > -1) {
    scroll = -5 * (0.25 - perc)
  }
}

const animate = () => {
  categoryItemsEl.value.scrollLeft += 2 * scroll;
  _raf = requestAnimationFrame(animate)
}

</script>

<template>
<section ref="categoryEl" class="category" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">

  <h3 class="category__title">{{ category.symbol }}</h3>

  <div ref="categoryItemsEl" class="category__items">
    <div v-for="child in category.children" :key="child.id">

      <Project v-if="child.intendedTemplate === 'project'" :item="child" :category-index="category.num" />
      <Pause v-else-if="child.intendedTemplate === 'pause'" :item="child" />

    </div>
  </div>

</section>
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
  margin-bottom: $unit-vertical * 2;

  &__items {
    display: flex;
    align-items: stretch;
    height: calc(100% - $unit-vertical);
    overflow-y: hidden;
    overflow-x: hidden;
  }
}

</style>
