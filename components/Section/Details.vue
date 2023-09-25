
import { link } from 'fs';
<script setup lang="ts">
import { HEIGHT_UNIT, WIDTH_UNIT } from '@/data/constants';


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

    <LayoutFlex v-if="content?.images?.length" class="details__images" :gap="HEIGHT_UNIT">
      <img v-for="image in content?.images" :key="image.id" :src="image.url" :alt="image.alt" />
    </LayoutFlex>

    <LayoutFlex v-if="content?.description || content?.download?.length || content?.links?.length" class="details__text" :gap="WIDTH_UNIT">
      <div class="details__description kirbytext" v-html="content?.description"></div>

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
    </LayoutFlex>
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

  @media (min-width: $breakpoint-mobile) {
    &.active {
      min-height: $height-row * 2;
      opacity: 1;
    }
  }

  img {
    max-height: 100%;
    max-width: $width-column * 6;
    height: fit-content;
  }

  &__description {
    flex: 2;
    padding-bottom: $height-unit;

    @media (max-width: $breakpoint-mobile) {
      padding-bottom: 0;
    }
  }

  &__links,
  &__downloads {
    flex: 1;
    max-width: $width-column * 3;

    h6 {
      padding-bottom: $height-unit;
    }

    h6, li {
      font-size: $fontsize-s;
    }
  }

  &__images {
    height: $height-row * 2;
    margin-bottom: $height-unit;
    overflow-x: scroll;

    @media (max-width: $breakpoint-mobile) {
      padding-left: $width-unit;
    }

    img {
      transition: all .25s;
      filter: grayscale(1) contrast(0.6);

      &:hover {
        filter: none;
      }
    }
  }

  &__text {
    padding: 0 $width-unit;

    @media (max-width: $breakpoint-mobile) {
      gap: $height-unit !important;
      flex-direction: column;
      padding-bottom: $height-unit;

      li {
        padding-left: $width-unit * 2;
      }
    }

  }
  
}
</style>
