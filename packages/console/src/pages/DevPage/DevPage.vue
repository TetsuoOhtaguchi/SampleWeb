<script setup lang="ts">
import { ref, watch } from 'vue'
import CModal from '../../components/CModal/CModal.vue'
import CDialogBasic from '../../components/CDialogBasic/CDialogBasic.vue'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'

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
const currentNum = ref<number>(0)
const totalNum = ref<number>(999)
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
      <div class="_components_container _btn_container">
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
      <div class="_components_container _btn_container">
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
      <div class="_components_container _btn_container">
        <CPageNavi v-model="currentNum" :totalNum="totalNum" />
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
