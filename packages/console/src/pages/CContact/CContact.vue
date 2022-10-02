<script setup lang="ts">
import { ref, computed } from 'vue'
import { testAllContactData } from './CContact.test.data'
import { copy } from 'copy-anything'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Checkbox from '../../../../components/src/components/Checkbox/Checkbox.vue'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'
import { useRouter } from 'vue-router'

/**
 * * 共通タイプ
 * ? 個別のタイプ情報と合わせるにはどのようにすればよいか？
 */
// type DbRecord = {
//   /**ドキュメントID */
//   id: string
//   /**登録者 */
//   userIdCreated: string
//   /**更新者 */
//   userIdUpdated: string
//   /**登録日時 */
//   dateCreated: null | Date | Timestamp
//   /**更新日時 */
//   dateUpdated: null | Date | Timestamp
// }

// お問合せタイプ
type ContactType = {
  /**ドキュメントID */
  id: string
  /**登録者 */
  userIdCreated: string
  /**更新者 */
  userIdUpdated: string
  /**登録日時 */
  dateCreated: null | Date
  /**更新日時 */
  dateUpdated: null | Date

  /**ネーム */
  name: string
  /**メールアドレス */
  mail: string
  /**電話番号 */
  tel: string
  /**内容 */
  contents: string
  /**既読フラグ */
  alreadyReadFlag: boolean
}

/**
 * * お問合せ情報を定義する
 */
const allContactData = ref<ContactType[]>(copy(testAllContactData))

// 全てのお問合せ件数
const allContactDataLength = allContactData.value.length

// チェックボックス
const checkBox = ref<boolean>(false)

// キーワードインプットフォーム
const keywordValue = ref<string>('')

// ページナビ
const totalNum = ref<number>(0)
totalNum.value = allContactData.value.length
const currentNum = ref<number>(1)

/**
 * * フィルター処理後のお問合せ情報配列
 */
const isContactData = computed(() => {
  const allTableArr = allContactData.value

  let showArr
  // チェックボックの値がtrueになった場合、未読のテーブルのみ算出する
  if (checkBox.value) {
    currentNum.value = 1
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

  totalNum.value = showArr.length

  // ページナビの現在位置で表示するテーブルを算出する
  showArr = showArr.filter(
    (d, index) =>
      index >= (currentNum.value - 1) * 50 && index < currentNum.value * 50
  )
  return showArr
})

// 日時を生成する
const createDate = (date: null | Date) => {
  if (date)
    return (
      date.getFullYear() +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + date.getDate()).slice(-2) +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2)
    )
}

// お問合せ詳細へ遷移する
const router = useRouter()
const clickTable = async (
  allContactDataLength: number,
  targetContactDataId: string
) => {
  const targetContactDataLength = await allContactData.value.findIndex(
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
        <CPageNavi v-model:current="currentNum" v-model:total="totalNum" />
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
    <div class="_scroll_area">
      <!-- 情報がありません。 -->
      <div v-if="totalNum === 0" class="_not_data">情報がありません。</div>

      <!-- テーブルコンテナ -->
      <div
        v-for="item in isContactData"
        :key="item.id"
        :class="{
          _table_container: !item.alreadyReadFlag,
          _unread_table_container: item.alreadyReadFlag
        }"
        @click="clickTable(allContactDataLength, item.id)"
      >
        <div>{{ createDate(item.dateCreated) }}</div>
        <div class="_three_point_leader_common">{{ item.name }}</div>
        <div class="_three_point_leader_common">{{ item.mail }}</div>
        <div>{{ item.tel }}</div>
        <div class="_three_point_leader_common">
          {{ item.contents + '/' + item.id }}
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
  height: calc(100vh - 350px)
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
._table_container:hover
  position: relative
  z-index: 10
  padding: 0px 10px 0px 9px
  border-left: 1px solid $subColor
  border-right: 1px solid $subColor
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .3)
._unread_table_container:hover
  position: relative
  z-index: 10
  padding: 0px 10px 0px 9px
  border-left: 1px solid $subColor
  border-right: 1px solid $subColor
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .3)
  z-index: 20

._three_point_leader_common
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>
