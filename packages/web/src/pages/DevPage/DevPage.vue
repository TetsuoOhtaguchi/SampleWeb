<script setup lang="ts">
import { ref, watch } from 'vue'
import WTategakiTitleVue from '../../components/WTategakiTitle/WTategakiTitle.vue'
import WPageView from '../../components/WPageView/WPageView.vue'
import WCoursePanel from '../../components/WCoursePanel/WCoursePanel.vue'
import WNewsListCard from '../../components/WNewsListCard/WNewsListCard.vue'
import WPageNavi from '../../components/WPageNavi/WPageNavi.vue'
import WFooter from '../../components/WFooter/WFooter.vue'
import WMenu from '../../components/WMenu/WMenu.vue'
import WMokujiBtn from '../../components/WMokujiBtn/WMokujiBtn.vue'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()

// ページナビ（mode === 'A'）　基本丸コピでOK
const isCurrentLocationNumA = ref<number>(1) // 現在地ナンバー初期値
const isTotalNumberOfPagesA = ref<number>(3) // ページの合計数 ※算出する必要あり
const isClickBackDisableA = ref<boolean>(true) // 前disable初期値
const isClickNextDisableA = ref<boolean>(false) // 次disable初期値
// 現在地ナンバーを監視し、前次ボタンを制御する
watch(isCurrentLocationNumA, () => {
  if (isCurrentLocationNumA.value > 1) isClickBackDisableA.value = false
  if (isCurrentLocationNumA.value < isTotalNumberOfPagesA.value)
    isClickNextDisableA.value = false
})
// 前ボタンクリック
const clickBackA = () => {
  // 現在地ナンバーから1引く
  if (
    isCurrentLocationNumA.value !== 1 &&
    isCurrentLocationNumA.value <= isTotalNumberOfPagesA.value
  )
    isCurrentLocationNumA.value = isCurrentLocationNumA.value - 1
  // 前ボタンを制御する
  if (isCurrentLocationNumA.value === 1) isClickBackDisableA.value = true
}
// 次ボタンクリック
const clickNextA = () => {
  // 現在地ナンバーへ1足す
  if (isCurrentLocationNumA.value < isTotalNumberOfPagesA.value)
    isCurrentLocationNumA.value = isCurrentLocationNumA.value + 1
  // 次ボタンを制御する
  if (isCurrentLocationNumA.value === isTotalNumberOfPagesA.value)
    isClickNextDisableA.value = true
}

// ページナビ（mode === 'B'）　基本丸コピでOK
const isCurrentLocationNumB = ref<number>(1) // 現在地ナンバー初期値
const isTotalNumberOfNewsB = ref<number>(5) // お知らせの合計数 ※算出する必要あり
const isClickBackDisableB = ref<boolean>(true) // 前disable初期値
const isClickNextDisableB = ref<boolean>(false) // 次disable初期値
// 現在地ナンバーを監視し、前次ボタンを制御する
watch(isCurrentLocationNumB, () => {
  if (isCurrentLocationNumB.value > 1) isClickBackDisableB.value = false
  if (isCurrentLocationNumB.value < isTotalNumberOfNewsB.value)
    isClickNextDisableB.value = false
})
// 前ボタンクリック
const clickBackB = () => {
  // 現在地ナンバーから1引く
  if (
    isCurrentLocationNumB.value !== 1 &&
    isCurrentLocationNumB.value <= isTotalNumberOfNewsB.value
  )
    isCurrentLocationNumB.value = isCurrentLocationNumB.value - 1
  // 前ボタンを制御する
  if (isCurrentLocationNumB.value === 1) isClickBackDisableB.value = true
}
// 次ボタンクリック
const clickNextB = () => {
  // 現在地ナンバーへ1足す
  if (isCurrentLocationNumB.value < isTotalNumberOfNewsB.value)
    isCurrentLocationNumB.value = isCurrentLocationNumB.value + 1
  // 次ボタンを制御する
  if (isCurrentLocationNumB.value === isTotalNumberOfNewsB.value)
    isClickNextDisableB.value = true
}
const clickOshirase = () => {
  console.log('お知らせ一覧へ遷移する')
}

const clickContact = () => {
  console.log('お問合せフォームへ遷移する')
}

// メニュー
const menuFlag = ref<boolean>(false)
const selectMenu = ref<string>('')
const clickMokuji = () => {
  menuFlag.value = true
}
const clickMenu = (data: String) => {
  if (typeof data === 'string') {
    selectMenu.value = data
    menuFlag.value = false
  }
}
const clickTojiru = () => {
  menuFlag.value = false
}
</script>

<template>
  <div class="_dev_box">
    <!-- タイトルエリア -->
    <q-card
      style="background: radial-gradient(circle, #2846a8 0%, #0a1d5c 100%)"
      class="_dev_title_card"
    >
      <div class="_dev_title">webコンポーネント</div>
    </q-card>

    <!-- コンポーネントエリア -->
    <div class="_components_area">
      <!-- 縦書きタイトル -->
      <q-card class="_components_title_card">縦書きタイトル</q-card>
      <div class="_components_container _btn_container">
        <WTategakiTitleVue />
      </div>

      <!-- ページビュー -->
      <q-card class="_components_title_card">ページビュー</q-card>
      <div class="_components_container _btn_container">
        <WPageView />
      </div>

      <!-- コースパネル -->
      <q-card class="_components_title_card">コースパネル</q-card>
      <div class="_components_container _btn_container">
        <WCoursePanel />
      </div>

      <!-- ニュースリストカード -->
      <q-card class="_components_title_card">ニュースリストカード</q-card>
      <div class="_components_container _btn_container">
        <WNewsListCard />
      </div>

      <!-- ページナビ -->
      <q-card class="_components_title_card">ページナビ</q-card>
      <div class="_components_container _btn_container">
        <!-- mode === 'A' -->
        <WPageNavi
          v-model:currentLocationNum="isCurrentLocationNumA"
          v-model:clickBackDisable="isClickBackDisableA"
          v-model:clickNextDisable="isClickNextDisableA"
          :totalNumberOfPages="isTotalNumberOfPagesA"
          @clickBack="clickBackA"
          @clickNext="clickNextA"
          class="_w_page_navi_a"
        />

        <!-- mode === 'B' -->
        <WPageNavi
          v-model:currentLocationNum="isCurrentLocationNumB"
          v-model:clickBackDisable="isClickBackDisableB"
          v-model:clickNextDisable="isClickNextDisableB"
          :totalNumberOfPages="isTotalNumberOfNewsB"
          mode="B"
          @clickBack="clickBackB"
          @clickOshirase="clickOshirase"
          @clickNext="clickNextB"
        />
        <div>{{ isCurrentLocationNumB }}/{{ isTotalNumberOfNewsB }}</div>
      </div>

      <!-- フッター -->
      <q-card class="_components_title_card">フッター</q-card>
      <div class="_components_container _btn_container">
        <WFooter @clickContact="clickContact" />
      </div>

      <!-- もくじボタン / メニュー -->
      <q-card class="_components_title_card">もくじボタン / メニュー</q-card>
      <div class="_components_container _btn_container">
        <WMokujiBtn @clickMokuji="clickMokuji" />
        <WMenu
          v-model="menuFlag"
          @clickMenu="clickMenu"
          @clickTojiru="clickTojiru"
        />

        <div v-if="selectMenu">{{ selectMenu }}ページを表示する</div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._dev_box
    background: #F4F4F4
    padding: 50px 0
._dev_title_card
    width: fit-content
    padding: 20px
    margin: 0 auto
._dev_title
    font-size: 30px
    font-weight: bold
    color: $white

// コンポーネントエリア
._components_area
    padding: 100px 50px

._components_title_card
    width: fit-content
    padding: 10px 20px
    font-size: 24px
    font-weight: bold
    color: #0a1d5c
    margin-bottom: 10px
._components_container
    padding: 20px 0
    border-bottom: 2px solid #727272
    margin-bottom: 100px

._w_page_navi_a
  margin-bottom: 10px
</style>
