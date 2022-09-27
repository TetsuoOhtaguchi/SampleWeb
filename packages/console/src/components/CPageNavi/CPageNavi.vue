<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps({
  /**
   * 現在地
   * @example 2
   */
  modelValue: { type: Number, default: 1 },
  /**
   * 合計数
   * @example 99
   */
  totalNum: { type: Number, default: 0 },
  /**
   * ページナビタイプ
   * @example typeOne or typeTwo
   */
  pageNaviType: { type: String, default: 'typeOne' }
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Number): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

// typeOneの表示数スタートと表示数エンドの初期値を定義する
const typeOneStartNum = ref<number | undefined>(0)
const typeOneEndNum = ref<number | undefined>(0)

// 展開時、1ページ目の表示数を条件によって分岐する
// 表示数が0以上だった場合
if (props.totalNum > 0) {
  typeOneStartNum.value = 1
}
// 表示数が50以下だった場合
if (50 >= props.totalNum) {
  typeOneEndNum.value = props.totalNum
}
// 表示数が50以上だった場合
if (props.totalNum > 50) {
  typeOneEndNum.value = 50
}

const pageNumArr = ref<number[]>([1])
const calcPageNum = Math.floor(props.totalNum / 50)
const overNum = props.totalNum % 50
const pageObjArr = ref<{ current: number; start: number; end: number }[]>([])
const targetDispObj = ref<{ current: number; start: number; end: number }>()
// 合計件数が50で割り切れるかで、処理を分岐する
if (overNum === 0) {
  // 割り切れる場合
  for (let v = 1; v < calcPageNum; v++) {
    pageNumArr.value.push(v + 1)
  }

  for (let v = 1; v < props.totalNum / 50 + 1; v++) {
    pageObjArr.value.push({ current: v, start: 50 * v - 49, end: 50 * v })
  }
} else {
  // 割り切れない場合
  for (let v = 1; v < calcPageNum + 1; v++) {
    pageNumArr.value.push(v + 1)
  }

  // 割り切れない数字を算出する
  let targetNum
  for (let v = 1; v < props.totalNum / 50; v++) {
    pageObjArr.value.push({ current: v, start: 50 * v - 49, end: 50 * v })
    targetNum = 50 * v
  }
  if (targetNum) {
    // pageNumArr.value.push(props.totalNum - targetNum)
    const targetCurrent = pageObjArr.value.length + 1
    const targetStart = targetNum + 1
    const targetEnd = props.totalNum
    pageObjArr.value.push({
      current: targetCurrent,
      start: targetStart,
      end: targetEnd
    })
  }
}
const currentNum = ref<number | undefined>(1)
const selectNum = ref<number>(1)
const disableBackBtn = ref<boolean>(false)
const disableNextBtn = ref<boolean>(false)
if (currentNum.value === 1) disableBackBtn.value = true
if (props.pageNaviType === 'typeOne' && pageNumArr.value.length === 1)
  disableNextBtn.value = true

// 戻るボタンクリック
const clickBackBtn = () => {
  selectNum.value--

  // ページナビタイプOne
  if (props.pageNaviType === 'typeOne') {
    currentNum.value = pageNumArr.value.find(d => d === selectNum.value)
    targetDispObj.value = pageObjArr.value.find(
      d => d.current === currentNum.value
    )
    // typeOneの表示数スタートと表示数エンドを表示する
    typeOneStartNum.value = targetDispObj.value?.start
    typeOneEndNum.value = targetDispObj.value?.end

    if (currentNum.value) model.value = currentNum.value
  }

  // ページナビタイプTwo
  if (props.pageNaviType === 'typeTwo') {
    currentNum.value = selectNum.value

    if (currentNum.value) model.value = currentNum.value
  }
}

// 進むボタンクリック
const clickNextBtn = () => {
  selectNum.value++

  // ページナビタイプOne
  if (props.pageNaviType === 'typeOne') {
    currentNum.value = pageNumArr.value.find(d => d === selectNum.value)
    targetDispObj.value = pageObjArr.value.find(
      d => d.current === currentNum.value
    )
    // typeOneの表示数スタートと表示数エンドを表示する
    typeOneStartNum.value = targetDispObj.value?.start
    typeOneEndNum.value = targetDispObj.value?.end

    if (currentNum.value) model.value = currentNum.value
  }

  // ページナビタイプTwo
  if (props.pageNaviType === 'typeTwo') {
    currentNum.value = selectNum.value

    if (currentNum.value) model.value = currentNum.value
  }
}
// 前後ボタンの制御を行う
watch(currentNum, () => {
  // ページナビタイプOne
  if (props.pageNaviType === 'typeOne') {
    if (currentNum.value === 1) {
      disableBackBtn.value = true
    } else {
      disableBackBtn.value = false
    }
    if (currentNum.value === pageNumArr.value.slice(-1)[0]) {
      disableNextBtn.value = true
    } else {
      disableNextBtn.value = false
    }
  }

  // ページナビタイプTwo
  if (props.pageNaviType === 'typeTwo') {
    if (currentNum.value === 1) {
      disableBackBtn.value = true
    } else {
      disableBackBtn.value = false
    }
    if (currentNum.value === props.totalNum) {
      disableNextBtn.value = true
    } else {
      disableNextBtn.value = false
    }
  }
})
</script>

<template>
  <div class="_c_page_navi_container">
    <!-- ページナビタイプOne -->
    <div v-if="pageNaviType === 'typeOne'" class="_c_page_navi_text">
      {{ typeOneStartNum }}-{{ typeOneEndNum }}&nbsp;/&nbsp;{{ totalNum }}行
    </div>

    <!-- ページナビタイプTwo -->
    <div v-if="pageNaviType === 'typeTwo'" class="_c_page_navi_text">
      {{ currentNum }}&nbsp;/&nbsp;{{ totalNum }}
    </div>

    <div class="_c_page_navi_btn_container">
      <q-btn
        flat
        round
        color="secondary"
        icon="chevron_left"
        class="_margin_left_common"
        :disable="disableBackBtn"
        @click="clickBackBtn"
      />
      <q-btn
        flat
        round
        color="secondary"
        icon="chevron_right"
        class="_margin_left_common"
        :disable="disableNextBtn"
        @click="clickNextBtn"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
._c_page_navi_container
    display: flex
    align-items: center

._c_page_navi_text
    font-size: 10px
    color: $fontColor

._c_page_navi_btn_container
    display: flex

._margin_left_common
    margin-left: 20px
</style>
