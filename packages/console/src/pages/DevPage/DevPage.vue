<script setup lang="ts">
import { ref, watch } from 'vue'
import CModal from '../../components/CModal/CModal.vue'
import CDialogBasic from '../../components/CDialogBasic/CDialogBasic.vue'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'
import CToggle from '../../components/CToggle/CToggle.vue'
import CCircleBtn from '../../components/CCircleBtn/CCircleBtn.vue'
// import CHeader from '../../components/CHeader/CHeader.vue'
import CMainLayoutCard from '../../components/CMainLayoutCard/CMainLayoutCard.vue'
import CGlobalNavi from '../../components/CGlobalNavi/CGlobalNavi.vue'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()

/**
 * * モーダル
 */
const modalState = ref<boolean>(false)
const clickOpenModal = () => {
  modalState.value = true
}

/**
 * * ダイアログベーシック
 */
const dialogBasicState = ref<boolean>(false)
const clickOpenDialogBasic = () => {
  dialogBasicState.value = true
}
const clickConfSub = () => {
  // ダイアログを閉じる
  dialogBasicState.value = false
}
const isRequest = ref<string>('')
watch(isRequest, () => {
  if (isRequest.value === 'request') {
    /**
     * todo Firebaseへ登録する
     * todo 処理が成功した場合'sucsess'を返す
     * ! 処理が失敗した場合'error'を返す
     */
    setTimeout(() => {
      isRequest.value = 'sucsess'
    }, 3000)

    /**
     * ! 10秒経過しても処理が完了しない場合'error'を返す
     */
    // setTimeout(() => {
    //   isRequest.value = 'error'
    // }, 10000)
  }
})
const clickClose = () => {
  // ダイアログを閉じる
  dialogBasicState.value = false
}

/**
 * * ページナビ
 */
// ページナビタイプOne
const currentNumTypeOne = ref<number>(1)
// ページナビタイプTwo
const currentNumTypeTwo = ref<number>(1)
const totalNum = ref<number>(99)

/**
 * * トグル
 */
const toggleValue = ref<boolean>(false)

/**
 * * サークルボタン
 */
const clickCircleBtn = ref<string>('')
const clickAddBtn = () => {
  clickCircleBtn.value = 'add'
}
const clickRemoveBtn = () => {
  clickCircleBtn.value = 'remove'
}
const clickDeleteBtn = () => {
  clickCircleBtn.value = 'delete'
}

/**
 * * ヘッダー
 */
const logout = () => {
  alert('ログアウトしました。')
}

/**
 * * グローバルメニュー
 */
//　メニュー配列を定義する
const menuArr = ref<{ index: number; menuLabel: string; menuPath: string }[]>([
  {
    index: 0,
    menuLabel: 'お問合せ',
    menuPath: '/Contact'
  },
  {
    index: 1,
    menuLabel: 'お知らせ',
    menuPath: '/News'
  },
  {
    index: 2,
    menuLabel: 'アカウント',
    menuPath: '/Account'
  },
  {
    index: 3,
    menuLabel: '利用規約',
    menuPath: '/Terms'
  }
])
</script>

<template>
  <div class="_dev_box">
    <!-- タイトルエリア -->
    <q-card
      style="background: radial-gradient(circle, #2846a8 0%, #0a1d5c 100%)"
      class="_dev_title_card"
    >
      <div class="_dev_title">consoleコンポーネント</div>
    </q-card>

    <!-- コンポーネントエリア -->
    <div class="_components_area">
      <!-- モーダル -->
      <q-card class="_components_title_card">モーダル</q-card>
      <div class="_components_container">
        <q-btn
          no-caps
          color="primary"
          label="Modal Open"
          @click="clickOpenModal"
        />
        <CModal v-model="modalState" />
      </div>

      <!-- ダイアログベーシック -->
      <q-card class="_components_title_card">ダイアログベーシック</q-card>
      <div class="_components_container">
        <q-btn
          no-caps
          color="primary"
          label="Dialog Basic Open"
          @click="clickOpenDialogBasic"
        />
        <CModal v-model="dialogBasicState">
          <CDialogBasic
            v-model="isRequest"
            action="保存"
            @clickConfSub="clickConfSub"
            @clickClose="clickClose"
          />
        </CModal>
      </div>

      <!-- ページナビ -->
      <q-card class="_components_title_card">ページナビ</q-card>
      <div class="_components_container">
        <!-- ページナビタイプOne -->
        <CPageNavi v-model="currentNumTypeOne" :totalNum="totalNum" />
        <div>ページナビタイプOneの現在地:{{ currentNumTypeOne }}</div>

        <!-- ページナビタイプTwo -->
        <CPageNavi
          v-model="currentNumTypeTwo"
          :totalNum="totalNum"
          pageNaviType="typeTwo"
        />
        <div>ページナビタイプTwoの現在地:{{ currentNumTypeTwo }}</div>
      </div>

      <!-- トグル -->
      <q-card class="_components_title_card">トグル</q-card>
      <div class="_components_container">
        <CToggle v-model="toggleValue" />
      </div>

      <!-- サークルボタン -->
      <q-card class="_components_title_card">サークルボタン</q-card>
      <div class="_components_container">
        <CCircleBtn btnType="add" @click="clickAddBtn" />
        <CCircleBtn btnType="remove" @click="clickRemoveBtn" />
        <CCircleBtn btnType="delete" @click="clickDeleteBtn" />
        click:<span v-if="clickCircleBtn">{{ clickCircleBtn }}をクリック</span>
      </div>

      <!-- ヘッダー -->
      <!-- <q-card class="_components_title_card">ヘッダー</q-card>
      <div class="_components_container">
        <CHeader @click="logout" />
        <div>上部へ表示</div>
      </div> -->

      <!-- メインレイアウトカード -->
      <q-card class="_components_title_card">メインレイアウトカード</q-card>
      <div class="_components_container">
        <CMainLayoutCard>
          <div>メインレイアウトカード</div>
          <div>コンテンツ</div>
        </CMainLayoutCard>
      </div>

      <!-- グローバルナビ -->
      <q-card class="_components_title_card">グローバルナビ</q-card>
      <div class="_components_container">
        <CGlobalNavi :menuArr="menuArr" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._dev_box
    position: relative
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
</style>
