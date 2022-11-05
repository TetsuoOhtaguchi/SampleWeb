<script setup lang="ts">
import { ref, watch } from 'vue'
import Image from '../../../../components/src/components/Image/Image.vue'
import WTategakiTitleVue from '../../components/WTategakiTitle/WTategakiTitle.vue'

const imgRef1 = ref<HTMLElement>()
const imgRef2 = ref<HTMLElement>()
const imgRef3 = ref<HTMLElement>()

const viewFlag = ref<boolean>(false)
const timeCounter = ref<number>(0)

setTimeout(() => {
  const imgEle1 = imgRef1.value!
  if (!imgEle1) return
  imgEle1.style.opacity = '1'
  timeCounter.value++
  viewFlag.value = true
}, 0)

watch(viewFlag, () => {
  if (viewFlag.value) {
    setInterval(() => {
      timeCounter.value++
      if (timeCounter.value === 2) {
        const hiddenEle = imgRef1.value!
        if (!hiddenEle) return
        hiddenEle.style.opacity = '0'

        const showEle = imgRef2.value!
        if (!showEle) return
        showEle.style.opacity = '1'
      }
      if (timeCounter.value === 3) {
        const hiddenEle = imgRef2.value!
        if (!hiddenEle) return
        hiddenEle.style.opacity = '0'

        const showEle = imgRef3.value!
        if (!showEle) return
        showEle.style.opacity = '1'
      }

      if (timeCounter.value === 4) {
        const hiddenEle = imgRef3.value!
        if (!hiddenEle) return
        hiddenEle.style.opacity = '0'

        const showEle = imgRef1.value!
        if (!showEle) return
        showEle.style.opacity = '1'
        viewFlag.value = false
      }
    }, 10000)
  }
})
</script>

<template>
  <div class="_menu_box">
    <div class="_page_view_box">
      <WTategakiTitleVue class="_tategaki_title" />
      <div ref="imgRef1" class="_page_view_img_box">
        <Image
          src="sw-menu-pageview1.jpg"
          alt="お品書きファーストビュー1"
          class="_page_view_img"
        />
      </div>
      <div ref="imgRef2" class="_page_view_img_box">
        <Image
          src="sw-menu-pageview2.jpg"
          alt="お品書きファーストビュー2"
          class="_page_view_img"
        />
      </div>
      <div ref="imgRef3" class="_page_view_img_box">
        <Image
          src="sw-menu-pageview3.jpg"
          alt="お品書きファーストビュー3"
          class="_page_view_img"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// $
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

._page_view_img
  position: absolute
  @media screen and (min-width: 1080px)
    height: 500px
  @media screen and (max-width: 1079px)
    height: 300px

._tategaki_title
  position: absolute
  bottom: 0
  z-index: 1
  @media screen and (min-width: 1080px)
    right: 140px
  @media screen and (max-width: 1079px)
    right: 20px
</style>
