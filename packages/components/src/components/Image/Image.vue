<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  /**
   * url
   * @example 'noimage.jpg'
   */
  src: { type: String, default: 'noimage.jpg' },
  /**
   * alt
   * @example '写真未登録'
   */
  alt: { type: String, default: '写真未登録' }
})

const isSrc = ref<string>('image/' + props.src)
</script>

<template>
  <div class="_box">
    <img :src="isSrc" :alt="alt" class="_img" />
  </div>
</template>

<style lang="sass" scoped>
._box
    width: 100%
    height: 100%
    line-height: 0
    overflow: hidden
._img
    width: 100%
    height: 100%
    object-fit: cover
    vertical-align: bottom
</style>
