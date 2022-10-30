<script setup lang="ts">
import { ref, watch } from 'vue'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()

const imgDoc1 = ref<HTMLElement>()
const imgDoc2 = ref<HTMLElement>()
const imgDoc3 = ref<HTMLElement>()
const imgDoc4 = ref<HTMLElement>()
const imgDoc5 = ref<HTMLElement>()
const timeCounter = ref<number>(0)
const viewFlag = ref<boolean>(false)
setTimeout(() => {
  const showDoc = imgDoc1.value!
  showDoc.style.height = '100%'
  showDoc.style.width = '100%'
  showDoc.style.top = '0%'
  showDoc.style.left = '0%'
  showDoc.style.opacity = '1'
  timeCounter.value++
  viewFlag.value = true
}, 0)

watch(viewFlag, () => {
  if (viewFlag.value) {
    setInterval(() => {
      timeCounter.value++
      if (timeCounter.value === 2) {
        const hiddenDoc = imgDoc1.value!
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc2.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 3) {
        const hiddenDoc = imgDoc2.value!
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc3.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 4) {
        const hiddenDoc = imgDoc3.value!
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc4.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 5) {
        const hiddenDoc = imgDoc4.value!
        hiddenDoc.style.opacity = '0'

        const zoomDoc = imgDoc1.value!
        zoomDoc.style.height = '150%'
        zoomDoc.style.width = '150%'
        zoomDoc.style.top = '-25%'
        zoomDoc.style.left = '-25%'

        const showDoc = imgDoc5.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 6) {
        const hiddenDoc = imgDoc5.value!
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc1.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
        viewFlag.value = false
      }
    }, 10000)
  }
})
</script>

<template>
  <div class="_first_view_box">
    <img
      ref="imgDoc1"
      src="/image/sw-first-view1.jpg"
      alt="ファーストビュー画像1"
      class="_img_doc"
    />
    <img
      ref="imgDoc2"
      src="/image/sw-first-view2.jpg"
      alt="ファーストビュー画像2"
      class="_img_doc"
    />
    <img
      ref="imgDoc3"
      src="/image/sw-first-view3.jpg"
      alt="ファーストビュー画像3"
      class="_img_doc"
    />
    <img
      ref="imgDoc4"
      src="/image/sw-first-view4.jpg"
      alt="ファーストビュー画像4"
      class="_img_doc"
    />
    <img
      ref="imgDoc5"
      src="/image/sw-first-view5.jpg"
      alt="ファーストビュー画像5"
      class="_img_doc"
    />

    <!-- メニューコンテナ -->
    <div class="_menu_container">
      <div class="_menu_text_common">お品書き</div>
      <div class="_menu_text_common">お知らせ</div>
      <div class="_menu_text_common">店舗情報</div>
      <div class="_menu_text_common">採用情報</div>
      <div class="_menu_text_common">お問合せ</div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._first_view_box
  position: relative
  background: black
  height: 100vh
  overflow: hidden

._img_doc
  position: absolute
  top: -25%
  left: -25%
  width: 150%
  height: 150%
  object-fit: cover
  transition: 10s
  opacity: 0

._menu_container
  position: absolute
  z-index: 10
  color: #FFFFFF
  font-size: 18px
  font-weight: bold
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 0.8rem
  display: grid
  gap: 65px
  top: 50px
  right: 59px

._menu_text_common
  cursor: pointer
  transition: 0.3s
._menu_text_common:hover
  opacity: 0.7
</style>
