<script setup lang="ts">
import { PropType } from 'vue'
import { CircleBtn } from './CCircleBtn.types'

const props = defineProps({
  /**
   * ボタンタイプ
   * @example add or remove or delete
   */
  btnType: { type: String as PropType<CircleBtn['type']>, required: true }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <!-- プラスボタン -->
  <q-btn
    v-if="btnType === 'add'"
    class="glossy"
    round
    color="primary"
    :icon="btnType"
    @click="emit('click')"
  />

  <!-- マイナスボタン  -->
  <q-btn
    v-if="btnType === 'remove'"
    class="glossy"
    round
    color="primary"
    :icon="btnType"
    @click="emit('click')"
  />

  <!-- 削除ボタン -->
  <q-btn
    v-if="btnType === 'delete'"
    flat
    round
    color="primary"
    :icon="btnType"
    @click="emit('click')"
  />
</template>

<style lang="sass" scoped></style>
