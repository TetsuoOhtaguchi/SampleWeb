<script setup lang="ts">
import { PropType, ref, computed, watch } from 'vue'
import { PageNavi } from './CPageNavi.types'
import { useRoute } from 'vue-router'

const props = defineProps({
  /**
   * 合計数
   * @example 99
   */
  modelValue: { type: Number, default: 0 },
  /**
   * ページナビタイプ
   * @example typeOne or typeTwo
   */
  pageNaviType: { type: String as PropType<PageNavi['type']>, required: true }
})

const route = useRoute()

const emit = defineEmits<{
  (e: 'update:modelValue', val: Number): void
  (e: 'currentNum', val: number): void
}>()

const totalNum = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

// 前後ボタン制御を定義する
const disableBackBtn = ref<boolean>(true)
const disableNextBtn = ref<boolean>(true)

if (totalNum.value > 50) {
  disableNextBtn.value = false
}

// 現在地を定義する
const currentNum = ref<number>(1)

// typeOneの表示数スタートと表示数エンドの初期値を定義する
const typeOneStartNum = ref<number>(0)
const typeOneEndNum = ref<number>(0)
// typeOneのスタートエンド表示数配列を定義する
const typeOneStartEndArr = ref<
  { no: number; startNum: number; endNum: number }[]
>([])

// typeOneのループ処理回数を定義する
let typeOneFrequency

// typeOneのスタートエンド表示数を変数へ代入する
if (props.pageNaviType === 'typeOne') {
  typeOneFrequency = Math.floor(totalNum.value / 50)
  for (let i = 0; i < typeOneFrequency; i++) {
    typeOneStartEndArr.value.push({
      no: i + 1,
      startNum: 50 * i + 1,
      endNum: 50 * i + 50
    })
  }

  // 合計数が50で割り切れない場合
  if (totalNum.value % 50 !== 0) {
    typeOneStartEndArr.value.push({
      no: typeOneFrequency + 1,
      startNum: 50 * typeOneFrequency + 1,
      endNum: 50 * typeOneFrequency + (totalNum.value % 50)
    })
  }
  // 展開時のスタートエンド表示数を変数へ代入する
  typeOneStartNum.value = typeOneStartEndArr.value[0].startNum
  typeOneEndNum.value = typeOneStartEndArr.value[0].endNum
}

// パラメータLength
const paramsLength = ref<string | string[]>(
  route.params.targetContactDataLength
)

// パラメータLengthを取得した場合、値を変数へ代入する
if (paramsLength.value) {
  currentNum.value = Number(paramsLength.value)
  if (currentNum.value !== 1) {
    disableBackBtn.value = false
  }
}

// 合計数を監視する（フィルターを利用した際に以下の処理を実行する）
watch(totalNum, () => {
  // typeOneのスタートエンド表示数を変数へ代入する
  if (props.pageNaviType === 'typeOne') {
    const changeTypeOneStartEndArr = ref<
      { no: number; startNum: number; endNum: number }[]
    >([])
    typeOneFrequency = Math.floor(totalNum.value / 50)
    for (let i = 0; i < typeOneFrequency; i++) {
      changeTypeOneStartEndArr.value.push({
        no: i + 1,
        startNum: 50 * i + 1,
        endNum: 50 * i + 50
      })
    }
    // 合計数が50で割り切れない場合
    if (totalNum.value % 50 !== 0) {
      changeTypeOneStartEndArr.value.push({
        no: typeOneFrequency + 1,
        startNum: 50 * typeOneFrequency + 1,
        endNum: 50 * typeOneFrequency + (totalNum.value % 50)
      })
    }
    // 新く生成されたスタートエンド表示配列を変数へ代入する
    typeOneStartEndArr.value = changeTypeOneStartEndArr.value
    // スタートエンド表示数を変数へ代入する
    typeOneStartNum.value = typeOneStartEndArr.value.find(
      d => d.no === currentNum.value
    )?.startNum!
    typeOneEndNum.value = typeOneStartEndArr.value.find(
      d => d.no === currentNum.value
    )?.endNum!
    // スタートエンド表示配列のnoに現在地が存在しない場合
    if (!typeOneStartEndArr.value.some(d => d.no === currentNum.value)) {
      if (!typeOneStartEndArr.value[0]) {
        // 値がundefindの場合
        typeOneStartNum.value = 0
        typeOneEndNum.value = 0
        totalNum.value = 0
        disableNextBtn.value = true
        disableBackBtn.value = true
      } else {
        // 配列の最後のページを表示する
        const last = typeOneStartEndArr.value.slice(-1)[0]
        currentNum.value = last.no
        typeOneStartNum.value = last.startNum
        typeOneEndNum.value = last.endNum
        if (last.no === 1) {
          disableBackBtn.value = true
          disableNextBtn.value = true
        }
      }
      emit('currentNum', currentNum.value)
    } else {
      // 最後のページnoと現在地が一致する場合nextボタンを制御する
      const last = typeOneStartEndArr.value.slice(-1)[0]
      if (last.no === currentNum.value) {
        if (currentNum.value !== 1) {
          disableBackBtn.value = false
        }
        disableNextBtn.value = true
      } else {
        if (currentNum.value !== 1) {
          disableBackBtn.value = false
        }
        disableNextBtn.value = false
      }
    }
  }
})

// 戻るボタンクリック
const clickBackBtn = () => {
  disableNextBtn.value = false

  currentNum.value--
  emit('currentNum', currentNum.value)

  // typeOne
  if (props.pageNaviType === 'typeOne') {
    // スタートエンド表示数を変数へ代入する
    typeOneStartNum.value = typeOneStartEndArr.value.find(
      d => d.no === currentNum.value
    )?.startNum!
    typeOneEndNum.value = typeOneStartEndArr.value.find(
      d => d.no === currentNum.value
    )?.endNum!
    // 制御
    if (currentNum.value === typeOneStartEndArr.value[0].no) {
      disableBackBtn.value = true
    } else {
      disableBackBtn.value = false
    }
  }

  // typeTwo
  if (props.pageNaviType === 'typeTwo') {
    // 制御
    if (currentNum.value === 1) {
      disableBackBtn.value = true
    }
    if (currentNum.value !== totalNum.value) {
      disableNextBtn.value = false
    }
  }
}

// 進むボタンクリック
const clickNextBtn = () => {
  disableBackBtn.value = false
  currentNum.value++
  emit('currentNum', currentNum.value)

  // typeOne
  if (props.pageNaviType === 'typeOne') {
    // スタートエンド表示数を変数へ代入する
    typeOneStartNum.value = typeOneStartEndArr.value.find(
      d => d.no === currentNum.value
    )?.startNum!
    typeOneEndNum.value = typeOneStartEndArr.value.find(
      d => d.no === currentNum.value
    )?.endNum!
    // 制御
    if (currentNum.value === typeOneStartEndArr.value.length) {
      disableNextBtn.value = true
    } else {
      disableNextBtn.value = false
    }
  }

  // typeTwo
  if (props.pageNaviType === 'typeTwo') {
    // 制御
    if (currentNum.value === totalNum.value) {
      disableNextBtn.value = true
    }
  }
}
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
