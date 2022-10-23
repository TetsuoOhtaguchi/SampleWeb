<script setup lang="ts">
import { ref } from 'vue'
import { passwordReset } from '@sw/firebase'
import CModal from '../../../components/CModal/CModal.vue'
import Inputform from '../../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../../components/src/components/Button/Button.vue'

const modalState = ref<boolean>(false)

const modalType = ref<number>(0)

const modalTitle = ref<string>('パスワード再設定')

const errorMsg = ref<string>('')

const errorFlag = ref<boolean>(false)

const modalOpen = () => {
  modalState.value = true
}

// メール
const isMail = ref<string>('')

// 送信ボタンクリック
const clickSend = async () => {
  // 入力チェックを行う
  if (isMail.value === '') {
    errorMsg.value = '※情報を入力してください'
    errorFlag.value = true
    return
  }
  if (
    !/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
      isMail.value
    )
  ) {
    errorMsg.value = '※入力情報に誤りがあります'
    errorFlag.value = true
    return
  }

  /**
   * todo パスワードリセットメール送信処理を行う
   */
  modalTitle.value = '送信中'
  modalType.value = 1
  await passwordReset(isMail.value)
    .then(res => {
      // 成功した場合
      if (res) {
        isMail.value = ''
        errorMsg.value = ''
        errorFlag.value = false
        modalType.value = 2
        modalTitle.value = '送信完了'
      }
    })
    .catch(error => {
      console.log(error)
      // 失敗した場合
      modalType.value = 0
      errorFlag.value = true
      if (error === 'auth/user-not-found') {
        errorMsg.value = '※未登録のメールアドレスです'
      }
    })
}

// 戻るボタンクリック
const clickBack = () => {
  isMail.value = ''
  errorMsg.value = ''
  errorFlag.value = false
  modalState.value = false
}

// 閉じるボタンクリック
const clickClose = () => {
  modalTitle.value = 'パスワード再設定'
  modalType.value = 0
  isMail.value = ''
  errorMsg.value = ''
  errorFlag.value = false
  modalState.value = false
}
</script>

<template>
  <div class="_password_reset_text" @click="modalOpen">
    パスワードを再設定する
  </div>

  <CModal v-model="modalState">
    <q-card square class="_dialog_basic_card">
      <q-bar class="glossy _dialog_basic_bar">{{ modalTitle }}</q-bar>
      <div class="_inner_box_common">
        <!-- モーダルタイプ0 -->
        <div v-show="modalType === 0">
          <div class="_modal_message_common">
            パスワードを再設定します。<br />メールアドレスを入力し、送信ボタンを押してください。
          </div>
          <Inputform
            v-model="isMail"
            design="console"
            :error="errorFlag"
            :dense="true"
            title="メールアドレス"
            class="_mail_input"
          />
          <div v-if="errorFlag" class="_error_msg">{{ errorMsg }}</div>
          <div v-else class="_error_msg_space" />
          <div class="_btn_container">
            <Button design="consoleSmallMain" label="送信" @click="clickSend" />
            <Button design="consoleSmallSub" label="戻る" @click="clickBack" />
          </div>
        </div>

        <!-- モーダルタイプ1 -->
        <div v-show="modalType === 1">
          <div class="_modal_message_common">
            パスワード再設定メールを送信中です<br />しばらくお待ちください。
          </div>
          <div class="_dialog_basic_spinner_position">
            <q-spinner-ios color="primary" size="3em" />
          </div>
        </div>

        <!-- モーダルタイプ2 -->
        <div v-show="modalType === 2">
          <div class="_modal_message_common">
            送信が完了しました。<br />メールをご確認いただき、パスワードの再設定を行なってくだい。
          </div>

          <Button
            design="consoleSmallSub"
            label="閉じる"
            class="_close_btn"
            @click="clickClose"
          />
        </div>
      </div>

      <!-- モーダルタイプ1 -->
    </q-card>
  </CModal>
</template>

<style lang="sass" scoped>
._password_reset_text
  font-size: 12px
  font-weight: bold
  color: $mainColor
  text-align: center
  cursor: pointer
  transition: 0.3s
._password_reset_text:hover
  opacity: 0.7

._dialog_basic_card
  width: 700px

._inner_box_common
    padding: 50px 0

._dialog_basic_bar
  background: $mainColor
  height: 50px
  font-weight: bold
  color: $white

._modal_message_common
  color: $mainColor
  font-weight: bold
  text-align: center
  margin-bottom: 50px

._mail_input
  width: 320px
  margin: 0 auto

._error_msg
  color: $errorMsg
  height: 50px
  display: flex
  justify-content: center
  align-items: center
._error_msg_space
  height: 50px

._btn_container
  display: grid
  grid-template-columns: 180px 180px
  gap: 25px
  justify-content: center

._dialog_basic_spinner_position
  display: flex
  justify-content: center
  margin-top: 33px

._close_btn
  width: 180px
  margin: 0 auto
</style>
