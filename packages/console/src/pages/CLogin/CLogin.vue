<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import CPasswordReset from './CPasswordReset/CPasswordReset.vue'
import * as validator from '@sw/utils'
import { login } from '@sw/firebase'

// メール
const isMail = ref<string>('')
// パスワード
const isPass = ref<string>('')
const isPwd = ref<boolean>(true)
// エラーメッセージ
const isErrorMsg = ref<string>('')

onMounted(() => {
  document.addEventListener('keydown', useEnter)
})
onUnmounted(() => {
  document.removeEventListener('keydown', useEnter)
})

// ログインボタンをクリック
const clickLogin = async () => {
  // 入力チェックを行う
  const mailErrorMsg = validator.loginMailValidator(isMail.value)
  const passErrorMsg = validator.loginPasswordValidator(isPass.value)

  isErrorMsg.value = mailErrorMsg || passErrorMsg
  if (isErrorMsg.value) return
  // Authに登録されているメールアドレス、パスワードと照合する
  await login(isMail.value, isPass.value).catch(error => {
    // authエラー
    if (
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/user-disabled' ||
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password'
    ) {
      isErrorMsg.value = '※メールアドレスまたはパスワードに誤りがあります'
    } else if (error.code === 'auth/too-many-requests') {
      // 5回パスワードを間違えた
      isErrorMsg.value =
        '※入力上限に達しました。パスワードの再設定をお願いします'
    }
  })
}

// エンター検知でログイン処理を行う
const useEnter = (e: any) => {
  if (!!isMail.value && !!isPass.value && e.keyCode === 13) {
    clickLogin()
  }
}
</script>

<template>
  <div class="_login_box">
    <img src="/image/LIG-logo-small-blue.png" alt="企業ロゴ" class="_logo" />
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

._logo
  position: absolute
  top: 17.5px
  left: 20px
  height: auto
  width: 70px

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
