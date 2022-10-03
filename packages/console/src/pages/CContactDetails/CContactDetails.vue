<script setup lang="ts">
import { ref, watch } from 'vue'
import { testAllContactData } from './CContactDetails.test.data'
import { copy } from 'copy-anything'
import Button from '../../../../components/src/components/Button/Button.vue'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'
import { useRoute, useRouter } from 'vue-router'
import { createDate } from '../../modules/date/createDate'

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

const route = useRoute()
const router = useRouter()

/**
 * * お問合せ情報を定義する
 */
const allContactData = ref<ContactType[]>(copy(testAllContactData))

//　対象のお問合せ情報を定義する
const targetContactData = ref<ContactType>()

// パラメータID
const paramsId = ref<string | string[]>(route.params.targetContactDataId)

// 展開時、対象のお問合せ情報を変数へ代入する
targetContactData.value = allContactData.value.find(
  d => d.id === paramsId.value
)

// お問合せLengthストリング
const targetContactDataLengthString = ref<string | string[]>(
  route.params.targetContactDataLength
)
// 現在地
const currentNum = ref<number>(0)
currentNum.value = Number(targetContactDataLengthString.value)

// お問合せ合計Lengthストリング
const allContactDataLengthString = ref<string | string[]>(
  route.params.allContactDataLength
)
const allContactDataLength = Number(allContactDataLengthString.value)

// 現在地を監視する
watch(currentNum, () => {
  const sortArr = allContactData.value.sort(
    (a, b) => Number(b.dateCreated) - Number(a.dateCreated)
  )
  // 現在地のindexを保持する情報を変数へ代入する
  targetContactData.value = sortArr[currentNum.value - 1]
})
</script>

<template>
  <div>
    <!-- 上部エリア -->
    <div class="_top_part_area">
      <Button
        design="consoleSmallSub"
        label="戻る"
        class="_back_btn"
        @click="router.go(-1)"
      />
      <div class="_page_navi_position">
        <CPageNavi
          v-model:current="currentNum"
          v-model:total="allContactDataLength"
          pageNaviType="typeTwo"
        />
      </div>
    </div>

    <!-- 氏名・メール・受信日時コンテナ -->
    <div class="_item_container">
      <div class="_name">{{ targetContactData?.name }}</div>
      <div class="_mail">＜{{ targetContactData?.mail }}＞</div>
      <div class="_date">{{ createDate(targetContactData?.dateCreated) }}</div>
    </div>

    <!-- お問合せ内容エリア -->
    <div class="_contents_title_common">お問合せ内容</div>
    <q-card class="_q_card">
      <div class="_inner_box">
        {{ targetContactData?.contents }}
      </div>
    </q-card>

    <!-- ご連絡先エリア -->
    <div class="_contents_title_common">ご連絡先</div>
    <div class="_tel_num">{{ targetContactData?.tel }}</div>
  </div>
</template>

<style lang="sass" scoped>
._top_part_area
    display: flex
    align-items: center
    height: 50px
    margin-bottom: 50px

._back_btn
    width: 110px

._page_navi_position
    margin-left: auto

._item_container
  display: flex
  margin-bottom: 25px

._name
  font-weight: bold
  color: $fontColor

._mail
  font-size: 12px
  color: $subColor
  margin-left: 25px

._date
  color: $fontColor
  font-size: 12px
  margin-left: auto

._contents_title_common
  font-size: 10px
  font-weight: bold
  color: $subColor
  margin: 25px 0 10px 0

._q_card
  padding: 25px

._inner_box
  height: calc(100vh - 520px)
  overflow: scroll
  font-size: 12px
  color: $fontColor

._tel_num
  font-size: 24px
  font-weight: bold
  color: $mainColor
</style>
