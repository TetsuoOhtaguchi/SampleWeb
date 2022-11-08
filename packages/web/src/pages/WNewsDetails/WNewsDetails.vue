<script setup lang="ts">
import { ref, watch } from 'vue'
import WPageView from '../../components/WPageView/WPageView.vue'
import { defaultsNews, NewsType } from '@sw/types'
import { allNewsData } from '@sw/firebase'
import { useRoute } from 'vue-router'
import { dateStringYMDJap } from '../../modules/date/createDateString'
import WPageNavi from '../../components/WPageNavi/WPageNavi.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const route = useRoute()

/**
 * * 全てのお知らせ情報配列を定義する
 */
const targetAllNewsData = ref<NewsType[]>(allNewsData.value)

// お知らせ情報の合計数
const isTotalNum = ref<number>(targetAllNewsData.value.length)

//　対象のお知らせ情報を定義する
const targetNewsData = ref<NewsType>(defaultsNews())

// パラメータID
const paramsId = ref<string | string[]>(route.params.targetId)

const paramsIndex = ref<string | string[]>(route.params.targetIndex)
const modeBCurrentNum = ref<number>(Number(paramsIndex.value))

// 展開時、対象のお知らせ情報を変数へ代入する
if (targetAllNewsData.value[0]) {
  targetNewsData.value = targetAllNewsData.value.find(
    d => d.id === paramsId.value
  )!
}

watch(
  allNewsData,
  () => {
    targetAllNewsData.value = allNewsData.value
    isTotalNum.value = targetAllNewsData.value.length
    targetNewsData.value = targetAllNewsData.value.find(
      d => d.id === paramsId.value
    )!
  },
  { deep: true }
)

const editContentsText = (text: string) => {
  const result = text.replace(/(\r\n|\n|\r)/gm, '<br />')
  return result
}

const getCurrentNum = (current: number) => {
  if (current) {
    let targetInnerHeight
    if (windowWidth.value > 1080) {
      targetInnerHeight = window.innerHeight - 50
    } else {
      targetInnerHeight = window.innerHeight - 250
    }
    // スクロール処理
    window.scroll({ top: targetInnerHeight, behavior: 'smooth' })
  }

  const targetIndex = current - 1

  const targetArr = targetAllNewsData.value
    .filter(d => !d.deleteFlag && d.publicFlag)
    .sort((a, b) => b.publicationDate - a.publicationDate)
  targetNewsData.value = targetArr.find((d, index) => index === targetIndex)!
}

const cardContainerRef = ref<HTMLElement>()
watch(windowScroll, () => {
  const cardContainerEle = cardContainerRef.value!
  if (windowWidth.value <= 400) {
    // SP
    if (windowScroll.value > 100) {
      cardContainerEle.style.marginTop = '0px'
      cardContainerEle.style.opacity = '1'
    }
  } else {
    // PC
    if (windowScroll.value > 500) {
      cardContainerEle.style.marginTop = '0px'
      cardContainerEle.style.opacity = '1'
    }
  }
})
</script>

<template>
  <div class="_news_details_box">
    <WPageView
      src="sw-news-pageview.jpg"
      alt="お知らせページビュー画像"
      label="お知らせ"
    />
    <div class="_news_details_item_container">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />
      <div class="_card_box">
        <div ref="cardContainerRef" class="_card_container">
          <q-card square class="_news_details_q_card">
            <!-- 日付 -->
            <div class="_date">
              {{ dateStringYMDJap(targetNewsData.publicationDate) }}
            </div>

            <!-- お知らせタイトル -->
            <div class="_news_title">{{ targetNewsData.newsTitle }}</div>
            <div class="_news_title_border" />

            <!-- お知らせコンテンツ -->
            <div class="_news_contents_container">
              <div
                v-for="item in targetNewsData.newsContents"
                :key="item.headerTitle"
                class="_news_contents_box"
              >
                <!-- ヘッダータイトル -->
                <div class="_header_title">
                  【&nbsp;{{ item.headerTitle }}&nbsp;】
                </div>

                <!-- 画像 -->
                <div class="_img_box">
                  <img
                    :src="item.imageURL"
                    :alt="item.headerTitle + 'の画像'"
                    class="_img"
                  />
                </div>

                <div
                  v-html="editContentsText(item.contentsText)"
                  class="_contents_text"
                ></div>
              </div>
            </div>
          </q-card>
        </div>

        <div class="_page_navi">
          <WPageNavi
            v-model="isTotalNum"
            mode="B"
            :modeBCurrentNum="modeBCurrentNum"
            @currentNum="getCurrentNum"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._news_details_box
  background: $black

._news_details_item_container
  position: relative
  width: 100%
  background-image: url(/image/sw-news-details-bg.jpg)
  background-position: center center
  padding: 100px 0
  font-weight: bold
  color: $fontColor

._gradient_top_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0))
  width: 100%
  height: 600px
  top: 0

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 600px
  bottom: 0

._card_box
  @media screen and (max-width: 962px)
    padding: 0px 37px

._card_container
  margin-top: 25px
  transition: 1s
  opacity: 0

._news_details_q_card
  width: 963px
  margin: 0 auto
  padding: 50px 108px
  @media screen and (max-width: 962px)
    width: 100%
    padding: 50px
  @media screen and (max-width: 699px)
    padding: 30px 15px

._date
  font-size: 16px
  width: fit-content
  margin-left: auto
  @media screen and (max-width: 699px)
    font-size: 14px

._news_title
  font-size: 24px
  padding: 20px 0
  @media screen and (max-width: 699px)
    font-size: 18px
    padding: 5px 0

._news_title_border
  height: 5px
  border-top: 1px solid #707070
  border-bottom: 1px solid #707070
  margin-bottom: 50px
  @media screen and (max-width: 699px)
    margin-bottom: 25px

._news_contents_container
  display: grid
  gap: 100px
  @media screen and (max-width: 699px)
    gap: 50px

._news_contents_box
  background: #F4F4F4
  padding: 20px
  @media screen and (max-width: 699px)
    padding: 10px

._header_title
  font-size: 18px
  margin-bottom: 10px
  @media screen and (max-width: 699px)
    font-size: 14px

._img_box
  margin-bottom: 25px
  @media screen and (max-width: 699px)
    margin-bottom: 5px

._img
  height: 100%
  width: 100%

._contents_text
  font-size: 16px
  @media screen and (max-width: 699px)
    font-size: 12px

._page_navi
  position: relative
  width: fit-content
  margin: 100px auto 0 auto
</style>
