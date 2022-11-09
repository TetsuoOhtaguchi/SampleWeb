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
import WPrivacyPolicy from './WPrivacyPolicy/WPrivacyPolicy.vue'
import WPageView from '../../components/WPageView/WPageView.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const cardContainerRef = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const cardContainerEle = cardContainerRef.value!

  if (windowWidth.value <= 1079) {
    // SP表示
    if (windowScroll.value > 50) {
      cardContainerEle.style.marginTop = '0px'
      cardContainerEle.style.opacity = '1'
    }
  } else {
    // PC表示
    if (windowScroll.value > 260) {
      cardContainerEle.style.marginTop = '0px'
      cardContainerEle.style.opacity = '1'
    }
  }
})

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
  <div class="_contact_box">
    <WPageView
      src="sw-contact-pageview.jpg"
      alt="お問合せページビュー画像"
      label="お問合せ"
    />

    <div class="_contact_container">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />

      <div ref="cardContainerRef" class="_card_container">
        <q-card square class="_card">
          <div class="_contact_title">お問合せフォーム</div>

          <div class="_contact_text">
            お問合せ・ご予約は以下のフォームからお気軽にご連絡ください。<br />
            なお、ご返答までにお時間をいただくことがございます。
          </div>

          <div class="_input_container">
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
          </div>

          <!-- プライバシーポリシー値 -->
          <div class="_checkbox_container">
            <div v-if="isErrorCode === '013'">
              <q-checkbox
                keep-color
                color="red"
                v-model="isPrivacyPolicy"
                label="プライバシーポリシーの確認"
              />
            </div>
            <div v-else>
              <q-checkbox
                v-model="isPrivacyPolicy"
                color="grey-10"
                label="プライバシーポリシーの確認"
              />
            </div>
          </div>

          <!-- プライバシーポリシー -->
          <div v-if="isPrivacyPolicy" class="_privacy_policy_posi">
            <WPrivacyPolicy />
          </div>

          <!-- エラーメッセージ -->
          <div v-if="!isErrorMsg" class="_error_msg_space" />
          <div v-else class="_error_msg">{{ isErrorMsg }}</div>

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
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._contact_box
  background: black

._contact_container
  position: relative
  width: 100%
  background-image: url(/image/sw-news-bg.jpg)
  background-position: center center
  z-index: 0
  padding: 100px 0

._gradient_top_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0))
  width: 100%
  height: 600px
  top: 0
  z-index: -2

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 600px
  bottom: 0
  z-index: -1

._card_container
  margin-top: 25px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1009px)
    padding: 0 37px

._card
  width: 936px
  padding: 50px 0px
  margin: 0 auto
  @media screen and (max-width: 1009px)
    width: 100%
  @media screen and (max-width: 670px)
    padding: 50px 30px

._contact_title
  font-size: 28px
  font-weight: bold
  color: $fontColor
  text-align: center
  margin-bottom: 30px
  @media screen and (max-width: 670px)
    font-size: 20px

._contact_text
  font-size: 16px
  font-weight: bold
  color: $fontColor
  text-align: center
  @media screen and (max-width: 670px)
    font-size: 14px

._input_container
  display: grid
  grid-template-columns: 536px
  gap: 30px 0px
  justify-content: center
  margin: 50px 0px
  @media screen and (max-width: 700px)
    gap: 25px 0px
  @media screen and (max-width: 670px)
    grid-template-columns: 100%

._button_container
  width: fit-content
  margin: 0 auto

._checkbox_container
  display: flex
  justify-content: center

._privacy_policy_posi
  display: flex
  justify-content: center

._error_msg_space
  height: 50px

._error_msg
  display: flex
  justify-content: center
  align-items: center
  height: 50px
  font-weight: bold
  color: #ff1010
</style>
