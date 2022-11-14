<script setup lang="ts">
import { ref, watch } from 'vue'
import WTategakiTitle from '../../../components/WTategakiTitle/WTategakiTitle.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const storeConceptContainerRef = ref<HTMLElement>()
const foodConceptContainerRef = ref<HTMLElement>()
const drinkConceptContainerRef = ref<HTMLElement>()

watch(windowScroll, () => {
  const storeConceptContainerEle = storeConceptContainerRef.value!
  const foodConceptContainerEle = foodConceptContainerRef.value!
  const drinkConceptContainerEle = drinkConceptContainerRef.value!
  if (windowWidth.value <= 432) {
    // SP
    if (windowScroll.value > 725) {
      storeConceptContainerEle.style.marginTop = '0px'
      storeConceptContainerEle.style.opacity = '1'
    }
    if (windowScroll.value > 1410) {
      foodConceptContainerEle.style.marginTop = '150px'
      foodConceptContainerEle.style.opacity = '1'
    }
    if (windowScroll.value > 2085) {
      drinkConceptContainerEle.style.marginTop = '150px'
      drinkConceptContainerEle.style.opacity = '1'
    }
  } else {
    // PC
    if (windowScroll.value > 915) {
      storeConceptContainerEle.style.marginTop = '0px'
      storeConceptContainerEle.style.opacity = '1'
    }
    if (windowScroll.value > 1470) {
      foodConceptContainerEle.style.marginTop = '150px'
      foodConceptContainerEle.style.opacity = '1'
    }
    if (windowScroll.value > 2070) {
      drinkConceptContainerEle.style.marginTop = '150px'
      drinkConceptContainerEle.style.opacity = '1'
    }
  }
})
</script>

<template>
  <div>
    <!-- 店舗コンセプト -->
    <div ref="storeConceptContainerRef" class="_store_concept_container">
      <img
        src="image/sw-top-concept1.jpg"
        alt="店舗コンセプトの写真"
        class="_img_common"
      />
      <div class="_store_concept_text_container">
        <div class="_store_concept_text">
          どのようなコンセプトの<br />お店なのかを簡単に<br />説明するテキストエリア<br />どのようなコンセプトの<br />お店なのかを簡単に<br />説明するテキストエリア
        </div>
        <div>
          <WTategakiTitle v-if="windowWidth >= 1001" label="◯◯◯◯◯について" />
          <WTategakiTitle v-else label="◯◯◯◯◯について" :miniSize="true" />
        </div>
      </div>
    </div>

    <!-- 料理コンセプト -->
    <div ref="foodConceptContainerRef" class="_food_concept_container">
      <div v-if="windowWidth >= 1001" class="_food_concept_text">
        食事に関するテキストエリアです。食事に<br />
        関するテキストエリアです。<br />
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。食事に<br />
        関するテキストエリアです。食事に関する<br />
        テキストエリアです。
      </div>
      <div
        v-if="windowWidth < 1001 && windowWidth >= 853"
        class="_food_concept_text"
      >
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。
      </div>
      <img
        src="image/sw-top-concept2.jpg"
        alt="料理コンセプトの写真"
        class="_img_common"
      />
      <div v-if="windowWidth <= 852" class="_food_concept_text">
        食事に関するテキストエリアです。食事に<br />
        関するテキストエリアです。<br />
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。食事に<br />
        関するテキストエリアです。食事に関する<br />
        テキストエリアです。
      </div>
    </div>

    <!-- 酒コンセプト -->
    <div ref="drinkConceptContainerRef" class="_drink_concept_container">
      <img
        src="image/sw-top-concept3.jpg"
        alt="料理コンセプトの写真"
        class="_img_common"
      />
      <div v-if="windowWidth >= 1001" class="_drink_concept_text">
        お酒に関するテキストエリアです。お酒に<br />
        関するテキストエリアです。<br />
        お酒に関するテキストエリアです。<br />
        お酒に関するテキストエリアです。お酒に<br />
        関するテキストエリアです。お酒に関する<br />
        テキストエリアです。
      </div>
      <div
        v-if="windowWidth < 1001 && windowWidth >= 853"
        class="_drink_concept_text"
      >
        お酒に関するテキストエリアです。<br />
        お酒に関するテキストエリアです。<br />
        お酒に関するテキストエリアです。<br />
        お酒に関するテキストエリアです。<br />
        お酒に関するテキストエリアです。<br />
        お酒に関するテキストエリアです。
      </div>
      <div v-if="windowWidth <= 852" class="_drink_concept_text">
        お酒に関するテキストエリアです。お酒に<br />
        関するテキストエリアです。<br />
        お酒に関するテキストエリアです。<br />
        お酒に関するテキストエリアです。お酒に<br />
        関するテキストエリアです。お酒に関する<br />
        テキストエリアです。
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

._store_concept_container
  display: flex
  gap: 62px
  width: fit-content
  margin: 25px auto 0 auto
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1140px)
    gap: 42px
  @media screen and (max-width: 1000px)
    gap: 22px
  @media screen and (max-width: 852px)
    display: block
  @media screen and (max-width: 530px)
    padding-right: 37px

._img_common
  height: auto
  width: 628px
  vertical-align: bottom
  @media screen and (max-width: 1140px)
    width: 529px
  @media screen and (max-width: 1000px)
    width: 457px
  @media screen and (max-width: 530px)
    width: 100%

._store_concept_text_container
  display: flex
  gap: 62px
  width: fit-content
  @media screen and (max-width: 1140px)
    gap: 42px
  @media screen and (max-width: 1000px)
    gap: 22px
  @media screen and (max-width: 852px)
    margin: 25px auto 0 auto
  @media screen and (max-width: 432px)
    margin: 25px 0 0 auto

._store_concept_text
  width: fit-content
  color: #ffffff
  font-size: 20px
  font-weight: bold
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 0.3rem
  line-height: 2.5rem
  padding-top: 100px
  @media screen and (max-width: 1140px)
    padding-top: 50px
  @media screen and (max-width: 1000px)
    font-size: 16px
  @media screen and (max-width: 852px)
    padding-top: 25px
    line-height: 3.5rem
  @media screen and (max-width: 432px)
    line-height: 2.5rem

._food_concept_container
  display: flex
  gap: 69px
  align-items: center
  width: fit-content
  margin: 175px auto 0 auto
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1140px)
    gap: 49px
  @media screen and (max-width: 852px)
    display: block
    gap: 0px
  @media screen and (max-width: 530px)
    padding-left: 37px

._food_concept_text
  color: #ffffff
  font-size: 16px
  font-weight: bold
  letter-spacing: 0.2rem
  line-height: 2.4rem
  @media screen and (max-width: 1000px)
    font-size: 14px
  @media screen and (max-width: 852px)
    margin-top: 40px
  @media screen and (max-width: 530px)
    letter-spacing: 0.1rem

._drink_concept_container
  display: flex
  gap: 69px
  align-items: center
  width: fit-content
  margin: 175px auto 0 auto
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1140px)
    gap: 49px
  @media screen and (max-width: 852px)
    display: block
    gap: 0px
  @media screen and (max-width: 530px)
    padding-right: 37px

._drink_concept_text
  color: #ffffff
  font-size: 16px
  font-weight: bold
  letter-spacing: 0.2rem
  line-height: 2.4rem
  @media screen and (max-width: 1000px)
    font-size: 14px
  @media screen and (max-width: 852px)
    margin-top: 40px
  @media screen and (max-width: 530px)
    letter-spacing: 0.1rem
    padding-left: 37px
</style>
