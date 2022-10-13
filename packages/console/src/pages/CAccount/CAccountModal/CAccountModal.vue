<script setup lang="ts">
import { ref, computed, watch, PropType } from 'vue'
import CModal from '../../../components/CModal/CModal.vue'
import CToggle from '../../../components/CToggle/CToggle.vue'
import CCircleBtn from '../../../components/CCircleBtn/CCircleBtn.vue'
import Imputform from '../../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../../components/src/components/Button/Button.vue'
import { AccountType } from 'types'
import { accountValidator } from './validator'

const props = defineProps({
  /**
   * モーダルステート
   * @example true | false
   */
  modalState: { type: Boolean, default: false },
  /**
   * ドキュメントID
   * @example 'XXX'
   */
  docId: { type: String, default: '' },
  /**
   * アカウント情報
   * @example {}
   */
  accountData: { type: Object as PropType<AccountType>, required: true }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'update:modalState', val: Boolean): void
  (e: 'update:docId', val: String): void
  (e: 'update:accountData', val: AccountType): void
  (e: 'emitAccountData', val: AccountType): void
}>()

const modalState = computed({
  get: () => props.modalState,
  set: value => {
    emit('update:modalState', value)
  }
})

const docId = computed({
  get: () => props.docId,
  set: value => {
    emit('update:docId', value)
  }
})

const accountData = computed({
  get: () => props.accountData,
  set: value => {
    emit('update:accountData', value)
  }
})

// バータイトル
const barTitle = ref<string>('新規登録')

watch(docId, () => {
  if (!docId.value) {
    barTitle.value = '新規登録'
  } else {
    barTitle.value = '詳細編集'
  }
})

// トグル値
const toggleValue = ref<boolean>(false)

// エラー値
const isErrorCode = ref<string>('')
const isErrorMsg = ref<string>('')

// 登録ボタンをクリック
const clickSaveBtn = () => {
  if (docId.value && !toggleValue.value) return

  // 入力チェックを行う
  const accountError = accountValidator(
    accountData.value.name,
    accountData.value.mail
  )
  isErrorCode.value = accountError.errorCode
  isErrorMsg.value = accountError.errorMsg
  if (isErrorCode.value && isErrorMsg.value) return

  // エラーが存在しない場合、以下の処理を行う
  emit('emitAccountData', accountData.value)
  modalState.value = false
}

// 戻るボタンをクリック
const clickBackBtn = () => {
  isErrorMsg.value = ''
  isErrorCode.value = ''
  toggleValue.value = false
  modalState.value = false
}

// 削除ボタンをクリック
const clickDeleteBtn = () => {
  accountData.value.deleteFlag = true
  emit('emitAccountData', accountData.value)
  modalState.value = false
}
</script>

<template>
  <div>
    <CModal v-model="modalState">
      <q-card square class="_account_modal_card">
        <q-bar class="glossy _account_modal_bar">{{ barTitle }}</q-bar>
        <div v-if="docId" class="_edit_container">
          <CToggle v-model="toggleValue" />
          <div class="_delete_btn_position">
            <CCircleBtn
              btnType="delete"
              :disable="!toggleValue"
              @click="clickDeleteBtn"
            />
          </div>
        </div>

        <div class="_input_container">
          <Imputform
            v-model="accountData.name"
            design="console"
            title="アカウントネーム"
            :disable="docId !== '' && !toggleValue"
            :dense="true"
            :error="isErrorCode === '001' || isErrorCode === '002'"
          />
          <Imputform
            v-model="accountData.mail"
            design="console"
            title="メールアドレス"
            :disable="docId !== '' && !toggleValue"
            :dense="true"
            :error="isErrorCode === '003' || isErrorCode === '004'"
          />
        </div>

        <div v-if="isErrorMsg" class="_error_msg">{{ isErrorMsg }}</div>
        <div v-else class="_error_msg_space" />

        <div class="_btn_container">
          <Button
            label="登録"
            design="consoleSmallMain"
            :disable="docId !== '' && !toggleValue"
            @click="clickSaveBtn"
          />
          <Button label="戻る" design="consoleSmallSub" @click="clickBackBtn" />
        </div>
      </q-card>
    </CModal>
  </div>
</template>

<style lang="sass" scoped>
._account_modal_card
  width: 700px
  padding-bottom: 50px
._account_modal_bar
  background: $mainColor
  height: 50px
  font-weight: bold
  color: $white
  margin-bottom: 50px

._edit_container
  width: 340px
  display: flex
  margin: 0 auto 25px auto
._delete_btn_position
  margin-left: auto

._input_container
  display: grid
  grid-template-columns: 320px
  gap: 25px
  justify-content: center

._error_msg
  height: 50px
  font-size: 12px
  font-weight: bold
  color: $errorMsg
  display: flex
  justify-content: center
  align-items: center
._error_msg_space
  height: 50px

._btn_container
  display: grid
  grid-template-columns: 180px 180px
  gap: 0 25px
  justify-content: center
</style>
