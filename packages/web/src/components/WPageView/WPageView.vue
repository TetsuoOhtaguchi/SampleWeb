<script setup lang="ts">
import Image from '../../../../components/src/components/Image/Image.vue'
import WTategakiTitleVue from '../WTategakiTitle/WTategakiTitle.vue'

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
</script>

<template>
  <div class="_page_view_box">
    <WTategakiTitleVue class="_tategaki_title" />
    <Image :src="src" :alt="alt" class="_image" />
  </div>
</template>

<style lang="sass" scoped>
._page_view_box
  position: relative
  background: $black
  @media screen and (min-width: 1080px)
    height: 600px
  @media screen and (max-width: 1079px)
    height: 390px

._image
  @media screen and (min-width: 1080px)
    height: 500px
  @media screen and (max-width: 1079px)
    height: 300px

._tategaki_title
  position: absolute
  bottom: 0
  @media screen and (min-width: 1080px)
    right: 140px
  @media screen and (max-width: 1079px)
    right: 20px
</style>
