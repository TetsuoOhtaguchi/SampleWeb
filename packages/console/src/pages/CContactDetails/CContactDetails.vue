<script setup lang="ts">
import { ref, watch } from 'vue'
import { defaultsContact, ContactType } from '@sw/types'
import { allContactData } from '@sw/firebase'
import { dateStringYMDHM } from '../../modules/date/createDateString'
import Button from '../../../../components/src/components/Button/Button.vue'
import CPageNavi from '../../components/CPageNavi/CPageNavi.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

/**
 * * 全てのお問合せ情報配列を定義する
 */
const targetAllContactData = ref<ContactType[]>(allContactData.value)

//　対象のお問合せ情報を定義する
const targetContactData = ref<ContactType>(defaultsContact())

// パラメータID
const paramsId = ref<string | string[]>(route.params.targetContactDataId)

// 展開時、対象のお問合せ情報を変数へ代入する
if (targetAllContactData.value[0]) {
  targetContactData.value = targetAllContactData.value.find(
    d => d.id === paramsId.value
  )!
}

// ページナビ
const totalNum = ref<number>(0)
totalNum.value = targetAllContactData.value.length
const currentNum = ref<number>(1)

watch(
  allContactData,
  () => {
    targetAllContactData.value = allContactData.value
    targetContactData.value = targetAllContactData.value.find(
      d => d.id === paramsId.value
    )!
  },
  { deep: true }
)

// 現在地を取得する
const getCurrentNum = (data: number) => {
  currentNum.value = data
  const sortArr = targetAllContactData.value.sort(
    (a, b) => Number(b.dateCreated) - Number(a.dateCreated)
  )
  targetContactData.value = sortArr[currentNum.value - 1]

  void router.push({
    name: 'ContactDetails',
    params: {
      targetContactDataLength: currentNum.value,
      allContactDataLength: sortArr.length,
      targetContactDataId: targetContactData.value.id
    }
  })
}

// 戻るボタンをクリック
const clickBackPage = () => {
  void router.push('/Contact')
}
</script>

<template>
  <div>
    <!-- 上部エリア -->
    <div class="_top_part_area">
      <Button
        design="consoleSmallSub"
        label="戻る"
        class="_back_btn"
        @click="clickBackPage"
      />
      <div class="_page_navi_position">
        <CPageNavi
          v-model="totalNum"
          @currentNum="getCurrentNum"
          pageNaviType="typeTwo"
        />
      </div>
    </div>

    <!-- 氏名・メール・受信日時コンテナ -->
    <div class="_item_container">
      <div class="_name">{{ targetContactData.name }}</div>
      <div class="_mail">＜{{ targetContactData.mail }}＞</div>
      <div class="_date">
        {{ dateStringYMDHM(targetContactData.receivedDate) }}
      </div>
    </div>

    <!-- お問合せ内容エリア -->
    <div class="_contents_title_common">お問合せ内容</div>
    <q-card class="_q_card">
      <div class="_inner_box">
        {{ targetContactData.contents }}
      </div>
    </q-card>

    <!-- ご連絡先エリア -->
    <div class="_contents_title_common">ご連絡先</div>
    <div class="_tel_num">{{ targetContactData.tel }}</div>
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
