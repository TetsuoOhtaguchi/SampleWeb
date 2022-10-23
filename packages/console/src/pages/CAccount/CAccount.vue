<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { allAccountData, setAccount, createRandomId, auth } from '@sw/firebase'
import { cfCreateAccountAuth, cfChangeMail } from '@sw/firebase'
import { copy } from 'copy-anything'
import CAccountModal from './CAccountModal/CAccountModal.vue'
import CModal from '../../components/CModal/CModal.vue'
import CDialogBasic from '../../components/CDialogBasic/CDialogBasic.vue'
import { createDateNumber } from '../../modules/date/createDateNumber'
import { dateStringYMD } from '../../modules/date/createDateString'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { AccountType, defaultsAccount } from '@sw/types'

/**
 * * 全てのアカウント情報配列を定義する
 */
const targetAllAccountData = ref<AccountType[]>(allAccountData.value)

// キーワードインプットフォーム
const keywordValue = ref<string>('')

// ページナビ
const totalNum = ref<number>(0)
totalNum.value = targetAllAccountData.value.filter(d => !d.deleteFlag).length
const currentNum = ref<number>(1)

// スクロールエリアref
const scrollArea = ref<HTMLElement>()
// 現在地を取得する
const getCurrentNum = (data: number) => {
  currentNum.value = data
  if (currentNum.value) {
    // スクロール処理
    const el = scrollArea.value!
    el.scrollTo({
      top: 0
    })
  }
}

watch(
  allAccountData,
  () => {
    targetAllAccountData.value = allAccountData.value
  },
  { deep: true }
)

/**
 * * フィルター処理後のアカウント情報配列
 */
const isAccountData = computed(() => {
  const targetArr = targetAllAccountData.value
    .filter(d => !d.deleteFlag)
    .sort((a, b) => b.registrationDate - a.registrationDate)

  let showArr = targetArr

  // キーワード検索に値が入った場合、文字列を含む値のみ算出する
  if (keywordValue.value) {
    showArr = showArr.filter(d => {
      if (d.name.includes(keywordValue.value)) {
        return d
      }
      if (d.mail.includes(keywordValue.value)) {
        return d
      }
    })
  }

  totalNum.value = showArr.length

  // ページナビの現在位置で表示するテーブルを算出する
  showArr = showArr.filter(
    (d, index) =>
      index >= (currentNum.value - 1) * 50 && index < currentNum.value * 50
  )
  return showArr
})

// アカウントモーダルステータスを定義する
const accountModalState = ref<boolean>(false)
const docId = ref<string>('')

/**
 * * アカウント情報を定義する
 */
const accountData = ref<AccountType>(defaultsAccount())

// 新規投稿ボタンをクリック
const clickNewAccount = () => {
  accountModalState.value = true
  accountData.value = defaultsAccount()
  docId.value = accountData.value.id
}

// 現在のメールアドレスを格納する
const oldMail = ref<string>('')

// テーブルをクリック
const clickTable = (idData: string) => {
  accountModalState.value = true
  const targetData = copy(isAccountData.value).find(d => d.id === idData)!
  accountData.value = targetData
  oldMail.value = targetData.mail
  docId.value = idData
}

/**
 * * Firestore保存処理を行う
 */
const dialogBasicState = ref<boolean>(false)
const action = ref<string>('')
// アカウントモーダルのアカウント情報を取得
const emitAccountData = (data: AccountType) => {
  if (!data.deleteFlag) {
    action.value = '保存'
  } else {
    action.value = '削除'
  }
  dialogBasicState.value = true
  accountData.value = data
}
// ベーシックモーダルのリクエストを定義sる
const isRequest = ref<string>('')
watch(isRequest, async () => {
  if (isRequest.value === 'request') {
    // 新規登録の場合アカウントを追加する
    try {
      if (!accountData.value.id) {
        /**
         * ! 確認
         */
        console.log('新規登録の場合アカウントを追加する')
        const getUID = await cfCreateAccountAuth(accountData.value.mail)
        accountData.value.id = getUID
      }
    } catch (err) {
      isRequest.value = 'error'
      return
    }

    // 登録日と更新日を変数へ代入する
    if (!accountData.value.dateCreated) {
      // 新規
      accountData.value.dateCreated = new Date()
      accountData.value.registrationDate = createDateNumber()
    } else {
      // 更新
      accountData.value.dateUpdated = new Date()
    }

    // アカウントネームの前後の空白を削除する
    accountData.value.name = accountData.value.name.trim()

    if (!accountData.value.userIdCreated) {
      accountData.value.userIdCreated = auth.currentUser?.uid!
    } else {
      accountData.value.userIdUpdated = auth.currentUser?.uid!
    }

    // メールアドレス変更処理を行う
    try {
      if (accountData.value.mail !== oldMail.value) {
        /**
         * ! 確認
         */
        console.log('メールアドレス変更処理を行う')
        await cfChangeMail({
          uid: accountData.value.id,
          mail: accountData.value.mail
        })
      }
    } catch (err) {
      isRequest.value = 'error'
      return
    }

    /**
     * todo firestoreへ情報を登録する
     */
    setAccount('D_Account', accountData.value)
      .then(() => {
        isRequest.value = 'sucsess'
        targetAllAccountData.value = allAccountData.value
      })
      .catch(e => {
        console.log(e, 'error')
        isRequest.value = 'error'
      })
  }
})

const clickConfSub = () => {
  accountModalState.value = true
  dialogBasicState.value = false
}
const clickClose = () => {
  // ダイアログを閉じる
  dialogBasicState.value = false
}
</script>

<template>
  <div>
    <!-- 上部エリア -->
    <div class="_top_part_area">
      <div class="_top_part_left">
        <Button
          design="consoleSmallMain"
          label="新規投稿"
          class="_add_btn"
          @click="clickNewAccount"
        />
      </div>
      <div class="_top_part_center">
        <Inputform
          v-model="keywordValue"
          design="console"
          :dense="true"
          iconLeft="search"
          placeholder="お問合せ検索"
          class="_search_input"
        />
      </div>
      <div class="_top_part_right">
        <CPageNavi
          v-model="totalNum"
          pageNaviType="typeOne"
          @currentNum="getCurrentNum"
        />
      </div>
    </div>

    <!-- テーブルエリア -->
    <!-- テーブルタイトルコンテナ -->
    <div class="_c_account_table_title_container">
      <div>氏名</div>
      <div>メールアドレス</div>
      <div>登録日</div>
    </div>

    <!-- スクロールエリア -->
    <div ref="scrollArea" class="_scroll_area">
      <!-- 情報がありません。 -->
      <div v-if="totalNum === 0" class="_not_data">情報がありません。</div>

      <!-- テーブルコンテナ -->
      <div
        v-for="item in isAccountData"
        :key="item.id"
        class="_table_container"
        @click="clickTable(item.id)"
      >
        <div class="_three_point_leader_common">{{ item.name }}</div>
        <div class="_three_point_leader_common">{{ item.mail }}</div>
        <div class="_three_point_leader_common">
          {{ dateStringYMD(item.registrationDate) }}
        </div>
      </div>
    </div>

    <!-- Accountモーダル -->
    <CAccountModal
      v-model:modalState="accountModalState"
      v-model:docId="docId"
      v-model:accountData="accountData"
      :totalAccountNum="totalNum"
      @emitAccountData="emitAccountData"
    />

    <!-- Baseモーダル -->
    <CModal v-model="dialogBasicState">
      <CDialogBasic
        v-model="isRequest"
        :action="action"
        @clickConfSub="clickConfSub"
        @clickClose="clickClose"
      />
    </CModal>
  </div>
</template>

<style lang="sass" scoped>
// 上部エリア
._top_part_area
  display: flex
  align-items: center
  height: 50px
._top_part_left
  display: flex
  align-items: center
  width: 500px
._top_part_center
  margin-left: auto
._search_input
  width: 320px
._top_part_right
  display: flex
  justify-content: end
  width: 250px
// 新規投稿ボタン
._add_btn
  width: 180px

// テーブルエリア
._c_account_table_title_container
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  border-bottom: 1px solid $subColor
  font-size: 12px
  font-weight: bold
  color: $fontColor
  padding: 0px 10px 10px 10px
  margin-top: 50px

._scroll_area
  height: calc(100vh - 349px)
  overflow: scroll

._not_data
  color: $subColor
  font-size: 14px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)

._table_container
  height: 42px
  color: $fontColor
  font-size: 12px
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  gap: 10px
  align-items: center
  padding: 0px 10px
  border-bottom: 1px solid $subColor
  cursor: pointer
._table_container:hover
  position: relative
  padding: 0px 9px 0px 9px
  border-left: 1px solid $subColor
  border-right: 1px solid $subColor
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .3)

._three_point_leader_common
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>
