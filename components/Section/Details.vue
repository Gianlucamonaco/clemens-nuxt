
import { link } from 'fs';
<script setup lang="ts">

defineProps<{ categoryIndex: number }>()

const descriptionIndex = useDescriptionIndex();
const content = useContent();

</script>

<template>
  <div
    class="details"
    :class="{ active: descriptionIndex === categoryIndex }"
    :style="{ minHeight: descriptionIndex === categoryIndex ? `${content?.height}px` : 0 }"
  >

    <div v-if="content?.images?.length" class="details__images">
      <img v-for="image in content?.images" :key="image.id" :src="image.url" :alt="image.alt" />
    </div>

    <div class="details__text">
      <div class="details__description" v-html="content?.description"></div>

      <div v-if="content?.links?.length" class="details__links">
        <h6>Links:</h6>
        <ul>
          <li v-for="link in content?.links" :key="link.text">
            <a :href="link.url" target="blank">
              <TextShuffle :text="link.text" :duration="0.4" />
            </a>
          </li>
        </ul>
      </div>

      <div v-if="content?.downloads?.length" class="details__downloads">
        <h6>Downloads:</h6>
        <ul>
          <li v-for="download in content?.downloads" :key="download.id">
            <a :href="download.file" download>
              <TextShuffle :text="download.text" :duration="0.4" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.details {
  min-height: 0;
  height: 0;
  opacity: 0;
  font-size: $fontsize-s;
  overflow-y: scroll;
  transition: all .5s;

  &.active {
    min-height: $height-row * 2;
    opacity: 1;
  }

  img {
    height: 100%;
  }

  &__description {
    flex: 2;
    max-width: $width-column * 6;
    padding-bottom: $height-unit;

    p, ul {
      padding-bottom: $height-unit !important;
    }

    li {
      font-size: $fontsize-s !important;
    }
  }

  &__links,
  &__downloads {
    flex: 1;
    max-width: $width-column * 3;
    
    h6, li {
      font-size: $fontsize-s;
    }
  }

  &__images {
    display: flex;
    gap: $width-unit;
    height: $height-row * 1;
    margin-bottom: $height-unit;
  }

  &__text {
    display: flex;
    gap: $width-unit;
  }
  
}
</style>
