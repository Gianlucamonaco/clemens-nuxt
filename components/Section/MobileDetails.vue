
<script setup lang="ts">
defineProps<{ parentUrl: string }>();
const content = useContent();

</script>

<template>
  <div class="details" :style="{transform: `translateX(${content?.title && (content.description || content.images || content.videos) ? '0' : 'calc(100% + 1px)'})`}">
    <LayoutFlex class="details__header" justify-content="space-between">
      <h2 class="details__title">{{ content?.title }}</h2>
      <NuxtLink class="details__close" :to="parentUrl">Close</NuxtLink>
    </LayoutFlex>

    <div v-if="content?.description" class="details__description kirbytext" v-html="content?.description"></div>

    <div v-if="content?.links?.length" class="details__links">
      <h6 class="details__label">Links:</h6>
      <ul>
        <li v-for="link in content?.links" :key="link.text">
          <a :href="link.url" target="blank">
            <TextShuffle :text="link.text" :duration="0.4" />
          </a>
        </li>
      </ul>
    </div>

    <div v-if="content?.tickets?.length" class="details__tickets">
      <h6 class="details__label">Tickets:</h6>
      <ul>
        <li v-for="link in content?.tickets" :key="link.text">
          <a :href="link.url" target="_blank">
            <TextShuffle :text="link.text" :duration="0.4" />
          </a>
        </li>
      </ul>
    </div>

    <div v-if="content?.downloads?.length" class="details__downloads">
      <h6 class="details__label">Downloads:</h6>
      <ul>
        <li v-for="download in content?.downloads" :key="download.id">
          <a :href="download.file" download>
            <TextShuffle :text="download.text" :duration="0.4" />
          </a>
        </li>
      </ul>
    </div>

    <div v-if="content?.images?.length" class="details__images">
      <img v-for="image in content?.images" :key="image.id" :src="image.url" :alt="image.alt" />
    </div>

    <div v-for="video in content?.videos" :key="video.text" class="details__video">
      <iframe width="100%" height="100%" style="height: 56.25vw" :src="useVideo(video.src)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  </div>

</template>

<style scoped lang="scss">
.details {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: $color-background;
  padding-top: $height-unit * 3;
  border-left: 1px solid $color-dark;
  margin-left: -1px;
  overflow-y: scroll;
  transition: all .5s;

  img {
    max-height: 100%;
    max-width: $width-column * 6;
    height: fit-content;
  }

  &__title {
    padding: $height-unit $width-unit;
  }

  &__close {
    font-size: $fontsize-m;
    padding: $height-unit $width-unit;
  }

  &__description {
    flex: 2;
    padding-bottom: $height-unit;
    padding: 0 $width-unit;
  }

  &__description,
  &__label {
    font-family: "rocky", serif;
    font-size: $fontsize-m;
    line-height: 25px;
    letter-spacing: 0.015em;

    b, strong {
      font-weight: 500;
    }
  }

  &__label {
    font-weight: 700;
    padding-bottom: 1em;
  }

  &__links,
  &__downloads,
  &__tickets {
    flex: 1;
    max-width: $width-column * 3;
    padding: 0 $width-unit $height-unit * 3;

    li {
      padding-bottom: $height-unit * 0.5;
    }

    h6 {
      padding-bottom: $height-unit;
    }
  }

  &__images {
    margin-bottom: $height-unit;
    padding-left: $width-unit;

    img {
      width: 100%;
      height: 100%;
      transition: all .25s;
      /* filter: grayscale(1) contrast(0.6); */
  
      &:not(:last-of-type) {
        margin-bottom: $height-unit;
      }

      &:hover {
        filter: none;
      }
    }
  }

  &__video {
    margin-bottom: $height-unit;
    padding-left: $width-unit;
  }
}
</style>
