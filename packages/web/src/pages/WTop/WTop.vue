<script setup lang="ts">
import { ref, watch } from 'vue'
import FirstView from './FirstView/FirstView.vue'
import ConceptItem from './ConceptItem/ConceptItem.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()

const newsAreaRef = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const newsAreaEle = newsAreaRef.value!
  if (windowWidth.value <= 729) {
    // SP表示
    if (windowScroll.value > 210) {
      newsAreaEle.style.marginTop = '0px'
      newsAreaEle.style.opacity = '1'
    }
  } else {
    // PC表示
    if (windowScroll.value > 215) {
      newsAreaEle.style.marginTop = '0px'
      newsAreaEle.style.opacity = '1'
    }
  }
})
</script>

<template>
  <div class="_top_box">
    <!-- ファーストビュー -->
    <FirstView />

    <!-- コンセプトエリア -->
    <div class="_concept_area_box">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />
      <!-- お知らせエリア -->
      <div ref="newsAreaRef" class="_news_area">
        <!-- v-for -->
        <div class="_news_container">
          <div>2022.12.31</div>
          <div class="_news_text">
            Webサイト開設のお知らせ
          </div>
        </div>
        <div class="_news_button_container">
          <Button design="webNomal" label="お知らせ一覧" />
        </div>
      </div>

      <!-- コンセプトアイテム -->
      <ConceptItem />
    </div>
  </div>
</template>

<style lang="sass" scoped>
._concept_area_box
  position: relative
  padding: 100px 0
  background-image: url(image/sw-top-bg1.jpg)
  background-size:  cover
  z-index: 0

._gradient_top_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0))
  width: 100%
  height: 990px
  top: 0
  z-index: -1

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 990px
  bottom: 0
  z-index: -1

._news_area
  padding-bottom: 150px
  margin-top: 25px
  opacity: 0
  transition: 1s
  @media screen and (max-width: 1079px)
    padding: 0 37px 100px 37px

._news_container
  display: flex
  align-items: center
  font-size: 16px
  font-weight: bold
  color: #ffffff
  border-bottom: 1px solid #ffffff
  margin: 0 auto
  width: 720px
  height: 57px
  padding: 0 35px
  gap: 78px
  @media screen and (max-width: 794px)
    width: 100%
    height: 56px
    padding: 0
    gap: 17px

._news_text
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

._news_button_container
  display: flex
  justify-content: center
  margin-top: 100px
</style>
