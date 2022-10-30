<script setup lang="ts">
import { ref, watch } from 'vue'
import { ContactType, defaultsContact } from '@sw/types'
import { setContact } from '@sw/firebase'
import { createRandomId } from '@sw/firebase'
import WContactModal from './WContactModal/WContactModal.vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { contactRequest } from '../../modules/options/mail/contactRequest'
import { contactRequestCompletion } from '../../modules/options/mail/contactRequestCompletion'
import { contactValidator } from './validator'
import { replaceStringHalfNum } from '../../../../utils/src/validator/helper'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()

/**
 * * お問合せ情報を定義する
 */
const contactData = ref<ContactType>(defaultsContact({ id: createRandomId() }))

// モーダルステート
const isModalState = ref<boolean>(false)

// リクエスト値
const isRequestVal = ref<string>('')

// エラーコード
const isErrorCode = ref<string>('')

// エラーメッセージ
const isErrorMsg = ref<string>('')

// プライバシーポリシー値
const isPrivacyPolicy = ref<boolean>(false)

// プライバシーポリシー値を監視する
watch(isPrivacyPolicy, () => {
  // プライバシーポリシーの値がtrueになった場合、以下の処理を行う
  if (isPrivacyPolicy.value) {
    // エラー解除
    isErrorCode.value = ''
    isErrorMsg.value = ''

    // プライバシーポリシー展開
  }
})

// 送信ボタンをクリックする
const clickSend = () => {
  // 入力チェックを行う
  const validatorRes = contactValidator(contactData.value)
  isErrorCode.value = validatorRes.errorCode
  isErrorMsg.value = validatorRes.errorMsg
  if (isErrorCode.value && isErrorMsg.value) return

  // プライバシーポリシーの入力チェックを行う
  if (!isPrivacyPolicy.value) {
    isErrorCode.value = '013'
    isErrorMsg.value = '※プライバシーポリシーにチェックを入れてください'
    return
  }

  // 送信確認モーダルを展開する
  isModalState.value = true
}

// リクエスト値を監視する
watch(isRequestVal, async () => {
  if (isRequestVal.value === 'request') {
    // 保存フラグ
    const saveFlag = ref<boolean>(false)

    // 置換処理を行う
    contactData.value.name = contactData.value.name.trim()
    contactData.value.tel = replaceStringHalfNum(contactData.value.tel)
    contactData.value.contents = contactData.value.contents.trim()

    // お問合せメールを送信する
    try {
      // お問合せメールを送信する
      const contactRequestRes = await contactRequest(contactData.value)
      // お問合せ完了メールを送信する
      const contactRequestCompletionRes = await contactRequestCompletion(
        contactData.value.mail
      )
      // 上記処理が成功した場合
      if (
        contactRequestRes === 'success' &&
        contactRequestCompletionRes === 'success'
      ) {
        // 保存フラグをtrueへ変更する
        saveFlag.value = true
        // 送信完了モーダルを展開する
        isRequestVal.value = 'success'
      }
    } catch (err) {
      // 送信失敗モーダルを展開する
      isRequestVal.value = 'error'
    }

    // firestoreへ情報を登録する
    if (saveFlag.value) {
      const today = new Date()
      contactData.value.dateCreated = today
      contactData.value.userIdCreated = contactData.value.id
      contactData.value.receivedDate = Number(
        String(today.getFullYear()) +
          ('0' + (today.getMonth() + 1)).slice(-2) +
          ('0' + today.getDate()).slice(-2) +
          ('0' + today.getHours()).slice(-2) +
          ('0' + today.getMinutes()).slice(-2) +
          ('0' + today.getSeconds()).slice(-2)
      )
      /**
       * todo firestoreへ情報を登録する
       */
      setContact('D_Contact', contactData.value).catch(e => {
        console.log(e, 'saveError')
      })
    }
  }
})

// 閉じるボタンをクリック
const clickCloseBtn = () => {
  // お問合せ情報を初期化する
  contactData.value = defaultsContact({ id: createRandomId() })
  isPrivacyPolicy.value = false
}
</script>

<template>
  <div>
    <Inputform
      v-model="contactData.name"
      title="氏名"
      :required="true"
      placeholder="name"
      :error="isErrorCode === '001' || isErrorCode === '002'"
      design="web"
    />
    <Inputform
      v-model="contactData.mail"
      title="メールアドレス"
      :required="true"
      placeholder="e-mail"
      :error="isErrorCode === '003' || isErrorCode === '004'"
      design="web"
    />
    <Inputform
      v-model="contactData.tel"
      title="電話番号"
      :required="true"
      placeholder="phone number"
      :error="isErrorCode === '010' || isErrorCode === '011'"
      :maxlength="11"
      design="web"
    />
    <Inputform
      v-model="contactData.contents"
      type="textarea"
      title="お問合せ内容"
      :required="true"
      placeholder="inquiry details"
      :error="isErrorCode === '012'"
      design="web"
      :textareaRows="11"
    />

    <!-- プライバシーポリシー値 -->
    <div v-if="isErrorCode === '013'">
      <q-checkbox
        keep-color
        color="red"
        v-model="isPrivacyPolicy"
        label="プライバシーポリシーを確認する"
      />
    </div>
    <div v-else>
      <q-checkbox
        v-model="isPrivacyPolicy"
        color="grey-10"
        label="プライバシーポリシーを確認する"
      />
    </div>

    <!-- エラーメッセージ -->
    <div class="_error_msg">{{ isErrorMsg }}</div>

    <!-- 送信ボタン -->
    <div class="_button_container">
      <Button design="webOutline" label="送信" @click="clickSend" />
    </div>

    <!-- 送信確認モーダル -->
    <WContactModal
      v-model:modalState="isModalState"
      v-model:requestVal="isRequestVal"
      @clickClose="clickCloseBtn"
    />
  </div>
</template>

<style lang="sass" scoped>
._button_container
  width: fit-content

._error_msg
  font-weight: bold
  color: #ff1010
</style>
