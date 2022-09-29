<script setup lang="ts">
import { ref, watch } from 'vue'
import { copy } from 'copy-anything'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Checkbox from '../../../../components/src/components/Checkbox/Checkbox.vue'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'

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

// DBに保存されているテスト用の配列情報
const testAllContactData = ref<ContactType[]>([
  {
    id: 'xxx',
    userIdCreated: '',
    userIdUpdated: '',
    dateCreated: new Date(2022, 8, 27, 9, 0),
    dateUpdated: new Date(),
    name: '山田太郎',
    mail: 'yamada-taro-test@gmail.com',
    tel: '09012341234',
    contents: '山田テスト本文',
    alreadyReadFlag: false
  },
  {
    id: 'yyy',
    userIdCreated: '',
    userIdUpdated: '',
    dateCreated: new Date(2022, 8, 28, 10, 0),
    dateUpdated: new Date(),
    name: '鈴木一郎',
    mail: 'ichiro-suzuki-test@gmail.com',
    tel: '0762921234',
    contents: '鈴木テスト本文',
    alreadyReadFlag: false
  },
  {
    id: 'zzz',
    userIdCreated: '',
    userIdUpdated: '',
    dateCreated: new Date(2022, 8, 29, 11, 0),
    dateUpdated: new Date(),
    name: '07012341234',
    mail: 'hattori-doutei-test@gmail.com',
    tel: '',
    contents: '服部テスト本文',
    alreadyReadFlag: true
  }
])

// お問合せ情報を定義する
const isContactData = ref<ContactType[]>(copy(testAllContactData.value))

// 未読チェックボックスを定義する
const checkBox = ref<boolean>(false)

watch(checkBox, () => {
  if (checkBox.value) {
    isContactData.value = isContactData.value.filter(d => !d.alreadyReadFlag)
  } else {
    isContactData.value = testAllContactData.value
  }
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
</script>

<template>
  <div class="_contact_box">
    <!-- 上部エリア -->
    <div class="_top_part_area">
      <div class="_top_part_left">
        <Checkbox v-model="checkBox" label="未読のみ表示" />
      </div>
      <div class="_top_part_center">
        <Inputform
          design="console"
          :dense="true"
          iconLeft="search"
          placeholder="お問合せ検索"
          class="_search_input"
        />
      </div>
      <div class="_top_part_right">
        <CPageNavi />
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
      <!-- テーブルコンテナ -->
      <div
        v-for="item in isContactData"
        :key="item.id"
        :class="{
          _table_container: !item.alreadyReadFlag,
          _unread_table_container: item.alreadyReadFlag
        }"
      >
        <div>{{ createDate(item.dateCreated) }}</div>
        <div class="_three_point_leader_common">{{ item.name }}</div>
        <div class="_three_point_leader_common">{{ item.mail }}</div>
        <div>{{ item.tel }}</div>
        <div class="_three_point_leader_common">{{ item.contents }}</div>
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
  width: 218px

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

._scroll_area

._table_container
  position: relative
  z-index: 10
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
  padding: 0px 10px 0px 9px
  border-left: 1px solid $subColor
  border-right: 1px solid $subColor
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .3)
._unread_table_container:hover
  padding: 0px 10px 0px 9px
  border-left: 1px solid $subColor
  border-right: 1px solid $subColor
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .3)

._three_point_leader_common
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>
