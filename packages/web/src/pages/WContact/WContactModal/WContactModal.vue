<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import WModal from '../../../components/WModal/WModal.vue'

const props = defineProps({
  /**
   * モーダルステート
   * @example true | false
   */
  modalState: { type: Boolean, default: false },
  /**
   * リクエスト値
   * @example request | success | error
   */
  requestVal: { type: String, default: '' }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'update:modalState', val: Boolean): void
  (e: 'update:requestVal', val: String): void
  (e: 'clickClose'): void
}>()

const isModalState = computed({
  get: () => props.modalState,
  set: value => {
    emit('update:modalState', value)
  }
})

const isRequestVal = computed({
  get: () => props.requestVal,
  set: value => {
    emit('update:requestVal', value)
  }
})

// モーダル詳細
const modalDetails = ref<number>(0)

// モーダルタイトル
const modalTitle = ref<string>('送信確認')

// モーダルテキスト
const modalText = ref<string>('送信します。よろしいですか？')

// 送信ボタンをクリックする
const clickSendBtn = () => {
  isRequestVal.value = 'request'
  modalDetails.value = 1
  modalTitle.value = '送信中'
  modalText.value = '送信中です。しばらくお待ちください。'
}

// 戻るボタンをクリックする
const clickBackBtn = () => {
  isModalState.value = false
}

watch(isRequestVal, () => {
  // 処理が成功した場合
  if (isRequestVal.value === 'success') {
    modalDetails.value = 2
    modalTitle.value = '送信完了'
    modalText.value = '送信が完了しました。'
  }

  // 処理が失敗した場合
  if (isRequestVal.value === 'error') {
    modalDetails.value = 2
    modalTitle.value = '送信失敗'
    modalText.value = '申し訳ございません。送信出来ませんでした。'
  }
})

// 閉じるボタンをクリックする
const clickCloseBtn = () => {
  isModalState.value = false
  isRequestVal.value = ''
  modalDetails.value = 0
  modalTitle.value = '送信確認'
  modalText.value = '送信します。よろしいですか？'
  emit('clickClose')
}
</script>

<template>
  <div>
    <WModal v-model="isModalState">
      <q-card square class="_contact_modal_card">
        <q-bar class="glossy _contact_modal_bar">{{ modalTitle }}</q-bar>

        <div
          class="_modal_text"
          :class="{ _error_text: modalTitle === '送信失敗' }"
        >
          {{ modalText }}
        </div>

        <div v-if="modalDetails === 0" class="_conf_btn_container">
          <q-btn
            class="glossy _btn_common"
            rounded
            color="grey-6"
            label="送信"
            @click="clickSendBtn"
          />
          <q-btn
            class="glossy _btn_common"
            rounded
            color="grey-6"
            label="戻る"
            @click="clickBackBtn"
          />
        </div>

        <div v-if="modalDetails === 1" class="_spinner">
          <q-spinner-ios color="grey-6" size="2em" />
        </div>

        <div v-if="modalDetails === 2" class="_close_btn_container">
          <q-btn
            class="glossy _btn_common"
            rounded
            color="grey-6"
            label="閉じる"
            @click="clickCloseBtn"
          />
        </div>
      </q-card>
    </WModal>
  </div>
</template>

<style lang="sass" scoped>
._contact_modal_card
  width: 700px
  padding-bottom: 50px
  @media screen and (max-width: 700px)
    width: calc(100vw - 40px)

._contact_modal_bar
  background: #000000
  height: 50px
  font-weight: bold
  color: $white
  margin-bottom: 50px

._modal_text
  font-weight: bold
  text-align: center
  margin-bottom: 25px
  color: $fontColor
._error_text
  color: #ff1010

._conf_btn_container
  display: flex
  justify-content: center
  gap: 25px

._btn_common
  font-weight: bold
  width: 125px

._spinner
  height: 36px
  display: flex
  justify-content: center
  align-items: center

._close_btn_container
  display: flex
  justify-content: center
</style>
