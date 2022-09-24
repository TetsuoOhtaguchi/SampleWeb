<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  /**
   * 値
   * @example true
   */
  modelValue: { type: Boolean },
  /**
   * ラベル
   * @example '同意する'
   */
  label: { type: String, default: 'Label' },
  /**
   * カラー
   * @example primary or secondary
   */
  color: { type: String, default: 'primary' }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div>
    <q-checkbox v-model="model" :label="label" :color="color" />
  </div>
</template>

<style lang="sass" scoped></style>
