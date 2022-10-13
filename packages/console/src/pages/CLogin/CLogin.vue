<script setup lang="ts">
import { ref } from 'vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import CPasswordReset from './CPasswordReset/CPasswordReset.vue'
import * as validator from 'utils'

// メール
const isMail = ref<string>('')
// パスワード
const isPass = ref<string>('')
const isPwd = ref<boolean>(true)

// エラーメッセージ
const isErrorMsg = ref<string>('')

// ログインボタンをクリック
const clickLogin = async () => {
  // 入力チェックを行う
  const mailErrorMsg = validator.loginMailValidator(isMail.value)
  const passErrorMsg = validator.loginPasswordValidator(isPass.value)

  isErrorMsg.value = mailErrorMsg || passErrorMsg
  if (isErrorMsg.value) return
  // Authに登録されているメールアドレス、パスワードと照合する
  console.log('ログイン')
}
</script>

<template>
  <div class="_login_box">
    <div class="_contents_box">
      <div class="_text_common">
        メールアドレスとパスワードを入力してください
      </div>
      <Inputform
        v-model="isMail"
        design="console"
        title="メールアドレス"
        :dense="true"
        :error="isErrorMsg !== ''"
        class="_mail_input"
      />
      <Inputform
        v-model="isPass"
        design="console"
        title="パスワード"
        :type="isPwd ? 'password' : 'text'"
        :iconRight="isPwd ? 'visibility_off' : 'visibility'"
        :dense="true"
        :error="isErrorMsg !== ''"
        @click="isPwd = !isPwd"
      />

      <div v-if="isErrorMsg" class="_error_msg">{{ isErrorMsg }}</div>
      <div v-else class="_error_msg_space" />

      <Button
        design="consoleSmallMain"
        label="ログイン"
        class="_login_btn"
        @click="clickLogin"
      />

      <!-- パスワードリセット -->
      <CPasswordReset />
    </div>
  </div>
</template>

<style lang="sass" scoped>
._login_box
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0

._contents_box
  width: 300px
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
  display: grid
  grid-template-columns: auto

._text_common
  font-size: 12px
  color: $mainColor
  font-weight: bold
  transition: 0.3s
  text-align: center
  margin-bottom: 50px

._mail_input
  margin-bottom: 50px

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

._login_btn
  width: 180px
  margin: 0 auto
  margin-bottom: 50px
</style>
