<script setup lang="ts">

const props = defineProps<{ text: string, delay?: number, duration?: number }>()

const animatedText = ref('');

// when shuffle text is triggered, disable new animations
// while title is still animating
let isAnimating = false;
const getShuffledText = (text: string) => {
  if (!isAnimating) useShuffle(text, animatedText, {
    onUpdate: () => isAnimating = true,
    onComplete: () => isAnimating = false,
  }, { duration: props.duration })
}

// on component mount, animate in with a delay
// based on item index and category index
setTimeout(() => {
  getShuffledText(props.text)
}, 100 * (props.delay ?? 1));

</script>

<template>
  <span class="project__title" @mouseenter="getShuffledText(text)">
    {{ animatedText }}
  </span>
</template>