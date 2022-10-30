<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { allContactData } from '@sw/firebase'
import { ContactType } from '@sw/types'
import { setContact } from '@sw/firebase'
import { useRouter } from 'vue-router'
import { dateStringYMDHM } from '../../modules/date/createDateString'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Checkbox from '../../../../components/src/components/Checkbox/Checkbox.vue'
import { auth } from '@sw/firebase'

/**
 * * 全てのお問合せ情報配列を定義する
 */
const targetAllContactData = ref<ContactType[]>(allContactData.value)

// 全てのお問合せ件数
const allContactDataLength = ref<number>(targetAllContactData.value.length)

// チェックボックス
const checkBox = ref<boolean>(false)

// キーワードインプットフォーム
const keywordValue = ref<string>('')

// ページナビ
const totalNum = ref<number>(0)
totalNum.value = targetAllContactData.value.length
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
  allContactData,
  () => {
    targetAllContactData.value = allContactData.value
    allContactDataLength.value = targetAllContactData.value.length
  },
  { deep: true }
)

/**
 * * フィルター処理後のお問合せ情報配列
 */
const isContactData = computed(() => {
  const allTableArr = allContactData.value.sort(
    (a, b) => b.receivedDate - a.receivedDate
  )

  let showArr
  // チェックボックの値がtrueになった場合、未読のテーブルのみ算出する
  if (checkBox.value) {
    totalNum.value = allContactData.value.filter(d => !d.alreadyReadFlag).length
    showArr = allTableArr.filter(d => !d.alreadyReadFlag)
  } else {
    totalNum.value = allContactData.value.length
    showArr = allTableArr
  }

  // キーワード検索に値が入った場合、文字列を含む値のみ算出する
  if (keywordValue.value) {
    showArr = showArr.filter(d => {
      if (d.name.includes(keywordValue.value)) {
        return d
      }
      if (d.mail.includes(keywordValue.value)) {
        return d
      }
      if (d.tel.includes(keywordValue.value)) {
        return d
      }
      if (d.contents.includes(keywordValue.value)) {
        return d
      }
    })
  }

  // 合計数を変数へ代入する
  totalNum.value = showArr.length

  // ページナビの現在位置で表示するテーブルを算出する
  showArr = showArr.filter(
    (d, index) =>
      index >= (currentNum.value - 1) * 50 && index < currentNum.value * 50
  )
  return showArr
})

// お問合せ詳細へ遷移する
const router = useRouter()
const clickTable = (
  allContactDataLength: number,
  targetContactDataId: string
) => {
  const targetContactData = allContactData.value.find(
    d => d.id === targetContactDataId
  )!
  // 未読の場合、既読に変更しfirebaseへ情報を保存する
  if (!targetContactData.alreadyReadFlag) {
    targetContactData.alreadyReadFlag = true
    targetContactData.dateUpdated = new Date()
    if (auth.currentUser?.uid)
      targetContactData.userIdUpdated = auth.currentUser.uid
    /**
     * todo firebaseへ情報を保存する
     */
    setContact('D_Contact', targetContactData).catch(e => {
      console.log(e, 'saveError')
    })
  }
  const targetContactDataLength = allContactData.value.findIndex(
    d => d.id === targetContactDataId
  )
  void router.push({
    name: 'ContactDetails',
    params: {
      targetContactDataLength: targetContactDataLength + 1,
      allContactDataLength: allContactDataLength,
      targetContactDataId: targetContactDataId
    }
  })
}
</script>

<template>
  <div>
    <!-- 上部エリア -->
    <div class="_top_part_area">
      <div class="_top_part_left">
        <Checkbox v-model="checkBox" label="未読のみ表示" />
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
    <div class="_c_contact_table_container">
      <div>受信日時</div>
      <div>氏名</div>
      <div>メールアドレス</div>
      <div>電話番号</div>
      <div>お問合せ内容</div>
    </div>

    <!-- スクロールエリア -->
    <div ref="scrollArea" class="_scroll_area">
      <!-- 情報がありません。 -->
      <div v-if="totalNum === 0" class="_not_data">情報がありません。</div>

      <!-- テーブルコンテナ -->
      <div
        v-for="item in isContactData"
        :key="item.id"
        class="_table_container"
        :class="{
          _unread_table_container: item.alreadyReadFlag
        }"
        @click="clickTable(allContactDataLength, item.id)"
      >
        <div>{{ dateStringYMDHM(item.receivedDate) }}</div>
        <div class="_three_point_leader_common">{{ item.name }}</div>
        <div class="_three_point_leader_common">{{ item.mail }}</div>
        <div>{{ item.tel }}</div>
        <div class="_three_point_leader_common">
          {{ item.contents }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// 上部エリア
._top_part_area
  display: flex
  align-items: center
  height: 50px
._top_part_left
  width: 500px
._top_part_center
  margin-left: auto
._search_input
  width: 320px

._top_part_right
  display: flex
  justify-content: end
  width: 250px

// テーブルエリア
._c_contact_table_container
  display: grid
  grid-template-columns: 175px 150px 210px 170px auto
  border-bottom: 1px solid $subColor
  font-size: 12px
  font-weight: bold
  color: $fontColor
  padding: 0px 10px 10px 10px
  margin-top: 50px

._not_data
  color: $subColor
  font-size: 14px
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)

._scroll_area
  height: calc(100vh - 349px)
  overflow: scroll

._table_container
  height: 42px
  color: $fontColor
  font-size: 12px
  display: grid
  grid-template-columns: 165px 140px 200px 160px auto
  gap: 10px
  align-items: center
  padding: 0px 10px
  border-bottom: 1px solid $subColor
  cursor: pointer
._unread_table_container
  background: #ECEFFA
._table_container:hover
  position: relative
  padding: 0px 10px 0px 9px
  border-left: 1px solid $subColor
  border-right: 1px solid $subColor
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .3)

._three_point_leader_common
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>
