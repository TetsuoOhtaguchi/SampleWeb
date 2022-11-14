<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import WPageView from '../../components/WPageView/WPageView.vue'
import WNewsListCard from '../../components/WNewsListCard/WNewsListCard.vue'
import WPageNavi from '../../components/WPageNavi/WPageNavi.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { NewsType } from '@sw/types'
import { allNewsData } from '@sw/firebase'
import { dateStringYMDJap } from '../../modules/date/createDateString'
import { useRouter } from 'vue-router'
import { windowWidth, windowScroll } from 'src/boot/window'

const router = useRouter()

/**
 * * 全てのお知らせ情報配列を定義する
 */
const targetAllNewsData = ref<NewsType[]>(allNewsData.value)

// お知らせ情報の合計数
const isTotalNum = ref<number>(
  targetAllNewsData.value.filter(d => !d.deleteFlag && d.publicFlag).length
)

// ページナビの現在地
const isCurrentNum = ref<number>(1)

const getCurrentNum = (num: number) => {
  let targetInnerHeight
  if (windowWidth.value > 1079) {
    targetInnerHeight = 500
  } else {
    targetInnerHeight = 0
  }
  // スクロール処理
  window.scroll({ top: targetInnerHeight, behavior: 'smooth' })

  isCurrentNum.value = num
}

watch(
  allNewsData,
  () => {
    targetAllNewsData.value = allNewsData.value
    isTotalNum.value = targetAllNewsData.value.filter(
      d => !d.deleteFlag && d.publicFlag
    ).length
  },
  { deep: true }
)

/**
 * * フィルター処理後のお知らせ情報配列
 */
const isNewsData = computed(() => {
  const targetArr = targetAllNewsData.value
    .filter(d => !d.deleteFlag && d.publicFlag)
    .sort((a, b) => b.publicationDate - a.publicationDate)

  const showArr = targetArr.filter((d, index) => {
    const startIndex = isCurrentNum.value * 5 - 5
    let endIndex = isCurrentNum.value * 5 - 1
    const totalNum = isTotalNum.value
    if (endIndex > totalNum) {
      endIndex = totalNum - 1
    }
    if (index >= startIndex && index <= endIndex) {
      return d
    }
  })
  return showArr
})

const doesNotExistContainerRef = ref<HTMLElement>()
const contentsContainerRef = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const doesNotExistContainerEle = doesNotExistContainerRef.value!
  const contentsContainerEle = contentsContainerRef.value!

  if (windowWidth.value <= 400) {
    // SP表示
    if (!isNewsData.value[0] && windowScroll.value > 0) {
      if (!doesNotExistContainerEle) return
      doesNotExistContainerEle.style.marginTop = '0px'
      doesNotExistContainerEle.style.opacity = '1'
    }
    if (isNewsData.value[0] && windowScroll.value > 0) {
      if (!contentsContainerEle) return
      contentsContainerEle.style.marginTop = '0px'
      contentsContainerEle.style.opacity = '1'
    }
  } else {
    // PC表示
    if (!isNewsData.value[0] && windowScroll.value > 200) {
      if (!doesNotExistContainerEle) return
      doesNotExistContainerEle.style.marginTop = '0px'
      doesNotExistContainerEle.style.opacity = '1'
    }
    if (isNewsData.value[0] && windowScroll.value > 260) {
      if (!contentsContainerEle) return
      contentsContainerEle.style.marginTop = '0px'
      contentsContainerEle.style.opacity = '1'
    }
  }
})

// TOPボタンクリック
const clickTopBtn = () => {
  void router.push('/')
}

// お知らせカードをクリック
const clickNewsCard = (id: string) => {
  const targetArr = targetAllNewsData.value
    .filter(d => !d.deleteFlag && d.publicFlag)
    .sort((a, b) => b.publicationDate - a.publicationDate)
  const indexNum = targetArr.findIndex(d => d.id === id)

  void router.push({
    name: 'NewsDetails',
    params: {
      targetIndex: indexNum,
      targetId: id
    }
  })
}
</script>

<template>
  <div class="_news_list_box">
    <WPageView
      src="image/sw-news-pageview.jpg"
      alt="お知らせページビュー画像"
      label="お知らせ"
    />
    <div
      v-if="isNewsData[0]"
      ref="contentsContainerRef"
      class="_contents_container"
    >
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />

      <!-- お知らせカード -->
      <div class="_news_list_container">
        <div
          v-for="item in isNewsData"
          :key="item.id"
          @click="clickNewsCard(item.id)"
        >
          <WNewsListCard
            :src="item.newsContents[0].imageURL"
            :alt="item.newsTitle + 'の画像'"
            :dateCreated="dateStringYMDJap(item.publicationDate)"
            :newsTitle="item.newsTitle"
            :newsContents="item.newsContents[0].contentsText"
          />
        </div>
      </div>

      <!-- ページナビ -->
      <div class="_page_navi_box">
        <WPageNavi v-model="isTotalNum" mode="A" @currentNum="getCurrentNum" />
      </div>
    </div>

    <div
      v-else
      ref="doesNotExistContainerRef"
      class="_does_not_exist_container"
    >
      <div class="_does_not_exist_text">
        新着のお知らせ情報はございません。
      </div>
      <div class="_top_btn">
        <Button label="TOP" @click="clickTopBtn" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._news_list_box
  background: $black

._contents_container
  position: relative
  width: 100%
  background-image: url(/image/sw-news-bg.jpg)
  background-position: center center
  z-index: 0
  padding: 100px 0
  margin-top: 25px
  transition: 1s
  opacity: 0

._gradient_top_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0))
  width: 100%
  height: 1000px
  top: 0
  z-index: -1

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 1300px
  bottom: 0
  z-index: -1

._news_list_container
  width: fit-content
  margin: 0 auto 100px auto
  display: grid
  gap: 100px
  @media screen and (max-width: 699px)
    gap: 50px

._does_not_exist_container
  margin-top: 25px
  transition: 1s
  opacity: 0

._page_navi_box
  width: fit-content
  margin: 0 auto

._does_not_exist_text
  width: fit-content
  color: #ffffff
  font-size: 16px
  font-weight: bold
  padding: 100px 0
  margin: 0 auto
  letter-spacing: 0.2rem
  @media screen and (max-width: 400px)
    font-size: 14px
    padding: 50px 0

._top_btn
  width: fit-content
  margin: 0 auto
  padding-bottom: 100px
  @media screen and (max-width: 400px)
    padding-bottom: 50px
</style>
