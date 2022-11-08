<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  /**
   * 種類
   * @example 'B'
   */
  mode: { type: String, default: 'A' },
  /**
   * 合計記事数
   * @example 3
   */
  modelValue: { type: Number, default: 0 },
  /**
   * モードB現在地
   * @example 10
   */
  modeBCurrentNum: { type: Number, default: 0 }
})

// 現在地初期値
const isCurrentNum = ref<number>(1)

// 合計ページ数初期値
const isTotalPageNum = ref<number>(1)

// disable初期値
const isBackDisable = ref<boolean>(true)
const isNextDisable = ref<boolean>(true)

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
  (e: 'currentNum', val: number): void
}>()

// 合計記事数
const isTotalNum = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

if (props.mode === 'A') {
  // 余りフラグ true: 余りなし false: 余りあり
  if (isTotalNum.value % 5 === 0) {
    isTotalPageNum.value = Math.floor(isTotalNum.value / 5)
  } else {
    isTotalPageNum.value = Math.floor(isTotalNum.value / 5) + 1
  }
  // 合計ページ数が1以上の場合、次disableを解除する
  if (isTotalPageNum.value > 1) {
    isNextDisable.value = false
  }
}
if (props.mode === 'B') {
  // 現在値と合計ページ数を変数へ代入する
  isCurrentNum.value = props.modeBCurrentNum + 1
  isTotalPageNum.value = isTotalNum.value
  // 合計ページ数が1以上で現在値と一致しない場合、次disableを解除する
  if (isTotalPageNum.value > 1 && isCurrentNum.value !== isTotalPageNum.value) {
    isNextDisable.value = false
  } else {
    isNextDisable.value = true
  }
  // 現在値によって前disableを制御する
  if (isCurrentNum.value === 1) {
    isBackDisable.value = true
  } else {
    isBackDisable.value = false
  }
}

watch(isTotalNum, () => {
  if (props.mode === 'B') {
    // 現在値と合計ページ数を変数へ代入する
    isCurrentNum.value = props.modeBCurrentNum + 1
    isTotalPageNum.value = isTotalNum.value
    // 合計ページ数が1以上で現在値と一致しない場合、次disableを解除する
    if (
      isTotalPageNum.value > 1 &&
      isCurrentNum.value !== isTotalPageNum.value
    ) {
      isNextDisable.value = false
    } else {
      isNextDisable.value = true
    }
    // 現在値によって前disableを制御する
    if (isCurrentNum.value === 1) {
      isBackDisable.value = true
    } else {
      isBackDisable.value = false
    }
  }
})

const clickBack = () => {
  if (isCurrentNum.value > 1) {
    isCurrentNum.value--
    isNextDisable.value = false
    emit('currentNum', isCurrentNum.value)
  }
}
const clickNext = () => {
  if (isCurrentNum.value < isTotalPageNum.value) {
    isCurrentNum.value++
    isBackDisable.value = false
    emit('currentNum', isCurrentNum.value)
  }
}

// 現在地を監視する
watch(isCurrentNum, () => {
  // 現在地と合計ページ数が一致した場合、次disableを作動する
  if (isCurrentNum.value === isTotalPageNum.value) {
    isNextDisable.value = true
  }
  // 現在地が1の場合、前disableを作動する
  if (isCurrentNum.value === 1) {
    isBackDisable.value = true
  }
})

const router = useRouter()
const clickNewsListBtn = () => {
  void router.push('/NewsList')
}
</script>

<template>
  <div class="_w_page_navi_box">
    <Button
      design="webTetragon"
      label="前"
      :disable="isBackDisable"
      @click="clickBack"
    />

    <div v-if="mode === 'A'" class="_current_location_box">
      {{ isCurrentNum }}/{{ isTotalPageNum }}
    </div>

    <q-btn
      v-if="mode === 'B'"
      square
      no-caps
      flat
      style="background: #ffffff"
      label="お知らせ一覧"
      class="_btn _oshirase_btn"
      @click="clickNewsListBtn"
    />

    <Button
      design="webTetragon"
      label="次"
      :disable="isNextDisable"
      @click="clickNext"
    />
  </div>
</template>

<style lang="sass" scoped>
._w_page_navi_box
  display: flex

._current_location_box
  background: $white
  font-size: 18px
  font-weight: bold
  letter-spacing: 0.3rem
  display: flex
  justify-content: center
  align-items: center
  height: 70px
  width: 260px
  margin: 0 50px
  @media screen and (max-width: 579px)
    height: 60px
    width: 146px
    margin: 0 18px

._btn
  font-weight: bold

._oshirase_btn
  font-family: 'ヒラギノ明朝 ProN'
  font-size: 18px
  letter-spacing: 0.3em
  height: 70px
  width: 260px
  margin: 0 50px
  @media screen and (max-width: 579px)
    letter-spacing: normal
    height: 60px
    width: 150px
    margin: 0 15px
</style>
