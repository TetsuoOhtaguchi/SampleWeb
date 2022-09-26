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
  totalNum: { type: Number, default: 0 }
})

const typeOneStartNum = ref<number>(0)
const typeOneEndNum = ref<number>(0)

const emit = defineEmits<{
  (e: 'update:modelValue', val: Number): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

console.log(Math.floor(props.totalNum / 50))
console.log(props.totalNum % 50)
/**
 * !数字の配列を用意し、クリック処理で加算または減算した数値と一致する値を現在地として返す
 */
</script>

<template>
  <div class="_c_page_navi_container">
    <div class="_c_page_navi_text">
      {{ typeOneStartNum }}-{{ typeOneEndNum }}&nbsp;/&nbsp;{{ totalNum }}行
    </div>
    <div class="_c_page_navi_btn_container">
      <q-btn
        flat
        round
        color="secondary"
        icon="chevron_left"
        class="_margin_left_common"
      />
      <q-btn
        flat
        round
        color="secondary"
        icon="chevron_right"
        class="_margin_left_common"
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
