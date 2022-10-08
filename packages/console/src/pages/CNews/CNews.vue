<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { testAllNewsData } from './CNews.test.data'
import { copy } from 'copy-anything'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import Image from '../../../../components/src/components/Image/Image.vue'
// import { createDate } from '../../modules/date/createDate'
import { NewsType } from 'types'

/**
 * * 全てのお知らせ情報配列を定義する
 */
const allNewsData = ref<NewsType[]>(copy(testAllNewsData))

// キーワードインプットフォーム
const keywordValue = ref<string>('')

// ページナビ
const totalNum = ref<number>(0)
totalNum.value = allNewsData.value.length

// セレクト値
const selectValue = ref<string>('全て')
// セレクトオプション
const selectOption = ref<string[]>(['全て', '公開中', '未公開'])

const currentNum = ref<number>(1)

// スクロールエリアref
const scrollArea = ref<HTMLElement>()
// 現在地を取得する
const getCurrentNum = (data: number) => {
  currentNum.value = data
  if (currentNum.value) {
    // スクロール処理
    const el = scrollArea.value!
    el.scrollTo({
      top: 0
    })
  }
}

/**
 * * フィルター処理後のお知らせ情報配列
 */
const isNewsData = computed(() => {
  const allTableArr = allNewsData.value
    .filter(d => !d.deleteFlag)
    .sort((a, b) => Number(b.dateCreated) - Number(a.dateCreated))

  let showArr
  // セレクトの値に一致した情報のみ表示する
  if (selectValue.value === '公開中') {
    totalNum.value = allNewsData.value.filter(d => d.publicFlag).length
    showArr = allTableArr.filter(d => d.publicFlag)
  } else if (selectValue.value === '未公開') {
    totalNum.value = allNewsData.value.filter(d => !d.publicFlag).length
    showArr = allTableArr.filter(d => !d.publicFlag)
  } else {
    totalNum.value = allNewsData.value.length
    showArr = allTableArr
  }

  // キーワード検索に値が入った場合、文字列を含む値のみ算出する
  if (keywordValue.value) {
    showArr = showArr.filter(d => {
      if (d.newsTitle.includes(keywordValue.value)) {
        return d
      }
      if (d.newsContents[0].contentsText.includes(keywordValue.value)) {
        return d
      }
    })
  }

  totalNum.value = showArr.length

  // ページナビの現在位置で表示するテーブルを算出する
  showArr = showArr.filter(
    (d, index) =>
      index >= (currentNum.value - 1) * 50 && index < currentNum.value * 50
  )
  return showArr
})

// 投稿ページへ遷移する
const router = useRouter()
// 新規投稿ボタンをクリック
const clickNewPost = () => {
  void router.push({
    name: 'NewsPost',
    params: {
      targetId: 'newpost'
    }
  })
}

// テーブルをクリック
const clickTable = (id: string) => {
  void router.push({
    name: 'NewsPost',
    params: {
      targetId: id
    }
  })
}
</script>

<template>
  <div>
    <!-- 上部エリア -->
    <div class="_top_part_area">
      <div class="_top_part_left">
        <Button
          design="consoleSmallMain"
          label="新規投稿"
          class="_add_btn"
          @click="clickNewPost"
        />
        <q-select
          v-model="selectValue"
          :options="selectOption"
          outlined
          dense
          class="_q_select"
        />
      </div>
      <div class="_top_part_center">
        <Inputform
          v-model="keywordValue"
          design="console"
          :dense="true"
          iconLeft="search"
          placeholder="お問合せ検索"
          class="_search_input"
        />
      </div>
      <div class="_top_part_right">
        <CPageNavi
          v-model="totalNum"
          pageNaviType="typeOne"
          @currentNum="getCurrentNum"
        />
      </div>
    </div>

    <!-- テーブルエリア -->
    <!-- テーブルタイトルコンテナ -->
    <div class="_c_news_table_title_container">
      <div>画像</div>
      <div>投稿日時</div>
      <div>タイトル</div>
      <div>お知らせ内容</div>
    </div>

    <!-- スクロールエリア -->
    <div ref="scrollArea" class="_scroll_area">
      <!-- 情報がありません。 -->
      <div v-if="totalNum === 0" class="_not_data">情報がありません。</div>

      <!-- テーブルコンテナ -->
      <div
        v-for="item in isNewsData"
        :key="item.id"
        class="_table_container"
        :class="{ _undisclosed_table_container: !item.publicFlag }"
        @click="clickTable(item.id)"
      >
        <Image class="_c_news_table_img" />
        <div class="_c_news_table_date">
          {{ item.dateCreated }}
        </div>
        <div class="_c_news_table_newstitle">
          {{ item.newsTitle }}
        </div>
        <div class="_c_news_table_contents">
          {{ item.newsContents[0].contentsText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// 上部エリア
._top_part_area
  display: flex
  align-items: center
  height: 50px
._top_part_left
  display: flex
  align-items: center
  width: 500px
._top_part_center
  margin-left: auto
._search_input
  width: 320px
._top_part_right
  display: flex
  justify-content: end
  width: 250px
// 新規投稿ボタン
._add_btn
  width: 180px
._q_select
  width: 140px
  margin-left: 25px

// テーブルエリア
._c_news_table_title_container
  display: grid
  grid-template-columns: 115px 170px 300px auto
  border-bottom: 1px solid $subColor
  font-size: 12px
  font-weight: bold
  color: $fontColor
  padding: 0px 10px 10px 10px
  margin-top: 50px

._not_data
  color: $subColor
  font-size: 14px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)

._scroll_area
  height: calc(100vh - 350px)
  overflow: scroll

._table_container
  display: grid
  grid-template-columns: 65px 120px 250px auto
  align-items: center
  gap: 50px
  padding: 15px 10px
  height: 95px
  border-bottom: 1px solid $subColor
  font-size: 12px
  color: $fontColor
  cursor: pointer
._undisclosed_table_container
  background: #ECEFFA
._table_container:hover
  position: relative
  z-index: 10
  padding: 15px 10px 15px 9px
  border-left: 1px solid $subColor
  border-right: 1px solid $subColor
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .3)

._c_news_table_img
  width: 65px
  height: 65px

._c_news_table_date
  width: 120px

._c_news_table_newstitle
  width: 250px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

._c_news_table_contents
  line-height: 1.8
  width: fit-content
  overflow: hidden
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 3
  text-align: justify
  text-justify: inter-ideograph
</style>
