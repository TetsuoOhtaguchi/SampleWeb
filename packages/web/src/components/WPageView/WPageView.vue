<script setup lang="ts">
import { ref } from 'vue'
import Image from '../../../../components/src/components/Image/Image.vue'
import WTategakiTitle from '../WTategakiTitle/WTategakiTitle.vue'

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
  alt: { type: String, default: '写真未登録' },
  /**
   * label
   * @example ''
   */
  label: { type: String, default: '' }
})

const tategakiTitleBoxRef = ref<HTMLElement>()

setTimeout(() => {
  const tategakiTitleBoxEle = tategakiTitleBoxRef.value
  if (!tategakiTitleBoxEle) return
  tategakiTitleBoxEle.style.opacity = '1'
}, 0)

const imgRef = ref<HTMLElement>()

setTimeout(() => {
  const imgEle = imgRef.value!
  if (!imgEle) return
  imgEle.style.opacity = '1'
}, 0)
</script>

<template>
  <div class="_page_view_box">
    <div ref="tategakiTitleBoxRef" class="_tategaki_title_box">
      <WTategakiTitle :label="label" />
    </div>
    <div ref="imgRef" class="_page_view_img_box">
      <Image :src="src" :alt="alt" class="_image" />
    </div>
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

._page_view_img_box
  transition: 10s
  opacity: 0

._image
  @media screen and (min-width: 1080px)
    height: 500px
  @media screen and (max-width: 1079px)
    height: 300px

._tategaki_title_box
  position: absolute
  bottom: 0
  z-index: 1
  transition: 5s
  opacity: 0
  @media screen and (min-width: 1080px)
    right: 140px
  @media screen and (max-width: 1079px)
    right: 20px
</style>
