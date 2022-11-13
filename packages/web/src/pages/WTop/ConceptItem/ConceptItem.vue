<script setup lang="ts">
import { ref, watch } from 'vue'
import WTategakiTitle from '../../../components/WTategakiTitle/WTategakiTitle.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const storeConceptImgRef = ref<HTMLElement>()
const storeConceptTextPcRef = ref<HTMLElement>()
const storeConceptTategakiTitlePcRef = ref<HTMLElement>()
const storeConceptTextSpRef = ref<HTMLElement>()
const storeConceptTategakiTitleSpRef = ref<HTMLElement>()
const foodConceptTextRef = ref<HTMLElement>()
const foodConceptImgRef = ref<HTMLElement>()
const drinkConceptImgRef = ref<HTMLElement>()
const drinkConceptTextRef = ref<HTMLElement>()

// スクロール処理を実行する
// watch(windowScroll, () => {
//   const storeConceptImgEle = storeConceptImgRef.value!
//   const storeConceptTextEle = storeConceptTextPcRef.value!
//   const storeConceptTategakiTitlePcEle = storeConceptTategakiTitlePcRef.value!
//   const storeConceptTextSpEle = storeConceptTextSpRef.value!
//   const storeConceptTategakiTitleSpEle = storeConceptTategakiTitleSpRef.value!
//   const foodConceptTextEle = foodConceptTextRef.value!
//   const foodConceptImgEle = foodConceptImgRef.value!
//   const drinkConceptImgEle = drinkConceptImgRef.value!
//   const drinkConceptTextEle = drinkConceptTextRef.value!
//   if (windowWidth.value <= 729) {
//     // SP表示
//     if (windowScroll.value > 600) {
//       storeConceptImgEle.style.marginTop = '0px'
//       storeConceptImgEle.style.opacity = '1'
//       setTimeout(() => {
//         storeConceptTategakiTitleSpEle.style.marginTop = '0px'
//         storeConceptTategakiTitleSpEle.style.opacity = '1'
//       }, 500)
//       setTimeout(() => {
//         storeConceptTextSpEle.style.marginTop = '0px'
//         storeConceptTextSpEle.style.opacity = '1'
//       }, 1000)
//     }
//     if (windowScroll.value > 1200) {
//       foodConceptImgEle.style.marginTop = '0px'
//       foodConceptImgEle.style.opacity = '1'
//       setTimeout(() => {
//         foodConceptTextEle.style.marginTop = '0px'
//         foodConceptTextEle.style.opacity = '1'
//       }, 1000)
//     }
//     if (windowScroll.value > 1800) {
//       drinkConceptImgEle.style.marginTop = '0px'
//       drinkConceptImgEle.style.opacity = '1'
//       setTimeout(() => {
//         drinkConceptTextEle.style.marginTop = '0px'
//         drinkConceptTextEle.style.opacity = '1'
//       }, 1000)
//     }
//   } else {
//     // PC表示
//     if (windowScroll.value > 665) {
//       storeConceptTategakiTitlePcEle.style.marginTop = '0px'
//       storeConceptTategakiTitlePcEle.style.opacity = '1'
//       setTimeout(() => {
//         storeConceptTextEle.style.marginTop = '0px'
//         storeConceptTextEle.style.opacity = '1'
//       }, 300)
//       setTimeout(() => {
//         storeConceptImgEle.style.marginTop = '0px'
//         storeConceptImgEle.style.opacity = '1'
//       }, 600)
//     }
//     if (windowScroll.value > 1300) {
//       foodConceptImgEle.style.marginTop = '0px'
//       foodConceptImgEle.style.opacity = '1'
//       setTimeout(() => {
//         foodConceptTextEle.style.marginTop = '0px'
//         foodConceptTextEle.style.opacity = '1'
//       }, 300)
//     }
//     if (windowScroll.value > 1850) {
//       drinkConceptImgEle.style.marginTop = '0px'
//       drinkConceptImgEle.style.opacity = '1'
//       setTimeout(() => {
//         drinkConceptTextEle.style.marginTop = '0px'
//         drinkConceptTextEle.style.opacity = '1'
//       }, 300)
//     }
//   }
// })
</script>

<template>
  <div class="_concept_item_box">
    <!-- 店舗コンセプト -->
    <div class="_store_concept_container">
      <img
        ref="storeConceptImgRef"
        src="image/sw-top-concept1.jpg"
        alt="店舗コンセプトの写真"
        class="_store_concept_img"
      />
      <div
        v-if="windowWidth > 729"
        ref="storeConceptTextPcRef"
        class="_store_concept_text"
      >
        どのようなコンセプトの<br />お店なのかを簡単に<br />説明するテキストエリア<br />どのようなコンセプトの<br />お店なのかを簡単に<br />説明するテキストエリア
      </div>
      <div
        v-if="windowWidth > 729"
        ref="storeConceptTategakiTitlePcRef"
        class="_store_concept_tategaki_title_pc"
      >
        <WTategakiTitle v-if="windowWidth > 1066" label="◯◯◯◯◯について" />
        <WTategakiTitle v-else label="◯◯◯◯◯について" :miniSize="true" />
      </div>

      <div v-if="windowWidth <= 729" class="_store_concept_sp_container">
        <div ref="storeConceptTextSpRef" class="_store_concept_text">
          どのようなコンセプトの<br />お店なのかを簡単に<br />説明するテキストエリア<br />どのようなコンセプトの<br />お店なのかを簡単に<br />説明するテキストエリア
        </div>
        <div
          ref="storeConceptTategakiTitleSpRef"
          class="_store_concept_tategaki_title_sp"
        >
          <WTategakiTitle label="◯◯◯◯◯" :miniSize="true" />
        </div>
      </div>
    </div>

    <!-- 料理コンセプト -->
    <div class="_food_concept_container">
      <div ref="foodConceptTextRef" class="_food_concept_text">
        食事に関するテキストエリアです。食事に<br />
        関するテキストエリアです。<br />
        食事に関するテキストエリアです。<br />
        食事に関するテキストエリアです。食事に<br />
        関するテキストエリアです。食事に関する<br />
        テキストエリアです。
      </div>
      <img
        ref="foodConceptImgRef"
        src="image/sw-top-concept2.jpg"
        alt="料理コンセプトの写真"
        class="_food_concept_img"
      />
    </div>

    <!-- 酒コンセプト -->
    <div class="_drink_concept_container">
      <img
        ref="drinkConceptImgRef"
        src="image/sw-top-concept3.jpg"
        alt="料理コンセプトの写真"
        class="_drink_concept_img"
      />
      <div ref="drinkConceptTextRef" class="_drink_concept_text">
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
._concept_item_box
  width: fit-content
  margin: 0 auto

._store_concept_container
  display: grid
  grid-template-columns: 628px 240px 75px
  gap: 62px
  margin-bottom: 150px
  @media screen and (max-width: 1079px)
    grid-template-columns: 628px 240px 68px
  @media screen and (max-width: 1066px)
    grid-template-columns: auto 240px 38px
    gap: 30px
  @media screen and (max-width: 729px)
    display: initial

._store_concept_img
  height: 100%
  width: 628px
  transition: 1s
  // margin-top: 25px
  // opacity: 0
  @media screen and (max-width: 1066px)
    width: 100%
  @media screen and (max-width: 729px)
    width: 391px
  @media screen and (max-width: 428px)
    width: 100%
    padding-right: 37px

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
  transition: 1s
  // margin-top: 25px
  // opacity: 0
  @media screen and (max-width: 1066px)
    font-size: 16px
    padding-top: 50px
  @media screen and (max-width: 729px)
    padding-top: 25px
    line-height: 2.8rem

._store_concept_tategaki_title_pc
  transition: 1s
  // margin-top: 25px
  // opacity: 0

._store_concept_sp_container
  display: flex
  background: pink
  @media screen and (max-width: 729px)
    margin-top: 25px
    margin-bottom: 100px
    justify-content: center
    gap: 25px
  @media screen and (max-width: 428px)
    justify-content: end
    padding-right: 37px

._store_concept_tategaki_title_sp
  // margin-top: 25px
  // opacity: 0
  transition: 1s

._food_concept_container
  display: grid
  grid-template-columns: 370px 628px
  gap: 69px
  align-items: center
  margin-bottom: 150px
  @media screen and (max-width: 1066px)
    grid-template-columns: 340px auto
    gap: 39px
  @media screen and (max-width: 729px)
    display: flex
    flex-direction: column-reverse
    gap: 50px
    margin-bottom: 100px
  @media screen and (max-width: 428px)
    align-items: initial

._food_concept_text
  color: #ffffff
  font-size: 16px
  font-weight: bold
  letter-spacing: 0.2rem
  line-height: 2.4rem
  transition: 1s
  // margin-top: 25px
  // opacity: 0
  @media screen and (max-width: 1066px)
    font-size: 14px
  @media screen and (max-width: 729px)
    width: 100%
  @media screen and (max-width: 428px)
    letter-spacing: 0.1rem
    padding: 0 37px

._food_concept_img
  height: 100%
  width: 628px
  transition: 1s
  // margin-top: 25px
  // opacity: 0
  @media screen and (max-width: 1066px)
    width: 100%
  @media screen and (max-width: 729px)
    width: 391px
  @media screen and (max-width: 428px)
    width: 100%
    padding-left: 37px

._drink_concept_container
  display: grid
  grid-template-columns: 628px 370px
  gap: 69px
  align-items: center
  @media screen and (max-width: 1066px)
    grid-template-columns: auto 340px
    gap: 39px
  @media screen and (max-width: 729px)
    display: initial
    gap: 50px
  @media screen and (max-width: 428px)
    align-items: initial

._drink_concept_img
  height: 100%
  width: 628px
  transition: 1s
  // margin-top: 25px
  // opacity: 0
  @media screen and (max-width: 1066px)
    width: 100%
  @media screen and (max-width: 729px)
    width: 391px
    margin-bottom: 50px
  @media screen and (max-width: 428px)
    width: 100%
    padding-right: 37px

._drink_concept_text
  color: #ffffff
  font-size: 16px
  font-weight: bold
  letter-spacing: 0.2rem
  line-height: 2.4rem
  transition: 1s
  // margin-top: 25px
  // opacity: 0
  @media screen and (max-width: 1066px)
    font-size: 14px
  @media screen and (max-width: 729px)
    width: 100%
  @media screen and (max-width: 428px)
    letter-spacing: 0.1rem
    padding: 0 37px
</style>
