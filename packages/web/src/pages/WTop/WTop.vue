<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import FirstView from './FirstView/FirstView.vue'
import ConceptItem from './ConceptItem/ConceptItem.vue'
import Oshinagaki from './Oshinagaki/Oshinagaki.vue'
import StoreInfo from './StoreInfo/StoreInfo.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { windowWidth, windowScroll } from 'src/boot/window'
import { useRouter } from 'vue-router'
import { NewsType } from '@sw/types'
import { allNewsData } from '@sw/firebase'
import { dateStringYMD } from '../../modules/date/createDateString'

/**
 * * 全てのお知らせ情報配列を定義する
 */
const targetAllNewsData = ref<NewsType[]>(allNewsData.value)

watch(
  allNewsData,
  () => {
    targetAllNewsData.value = allNewsData.value
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
    if (index <= 1) return d
  })
  return showArr
})

const router = useRouter()

const newsAreaRef = ref<HTMLElement>()

const editTodayString = ref<string>(
  String(new Date().getFullYear()) +
    ('0' + (new Date().getMonth() + 1)).slice(-2) +
    ('0' + new Date().getDate()).slice(-2)
)
const isToday = ref<number>(Number(editTodayString.value))

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

const clickNewsListBtn = () => {
  void router.push('/NewsList')
}

const clickNewsTable = (id: string) => {
  void router.push({
    name: 'NewsDetails',
    params: {
      targetId: id
    }
  })
}
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
      <div v-if="isNewsData[0]" ref="newsAreaRef" class="_news_area">
        <div
          v-for="item in isNewsData"
          :key="item.id"
          class="_news_container"
          @click="clickNewsTable(item.id)"
        >
          <div>{{ dateStringYMD(item.publicationDate) }}</div>
          <div class="_news_text">
            {{ item.newsTitle }}
          </div>
        </div>
        <div class="_news_button_container">
          <Button
            design="webNomal"
            label="お知らせ一覧"
            @click="clickNewsListBtn"
          />
        </div>
      </div>
      <div v-else ref="newsAreaRef" class="_news_area">
        <div class="_does_not_exist_news_container">
          <div>{{ dateStringYMD(isToday) }}</div>
          <div class="_news_text">
            新着のお知らせ情報はございません。
          </div>
        </div>
      </div>

      <!-- コンセプトアイテム -->
      <ConceptItem />
    </div>

    <!-- お品書きエリア -->
    <Oshinagaki />

    <!-- 店舗情報エリア -->
    <StoreInfo />
  </div>
</template>

<style lang="sass" scoped>
._top_box
  background: #000000

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
  transition: 0.3s
  cursor: pointer
  @media screen and (max-width: 794px)
    width: 100%
    height: 56px
    padding: 0
    gap: 17px

._news_container:hover
  background: #535338

._does_not_exist_news_container
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
    padding: 0
    gap: 17px
  @media screen and (max-width: 459px)
    height: 47px
    font-size: 12px

._news_text
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

._news_button_container
  display: flex
  justify-content: center
  margin-top: 100px
</style>
