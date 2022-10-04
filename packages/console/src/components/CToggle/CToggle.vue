<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  /**
   * 値
   * @example true or false
   */
  modelValue: { type: Boolean, default: false }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'update:modelValue', val: Boolean): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="_toggle_container">
    <q-toggle v-model="model" color="primary" icon="edit" />
    <div class="_text">編集</div>
  </div>
</template>

<style lang="sass" scoped>
._toggle_container
  display: flex
  align-items: center

._text
  color: $mainColor
</style>
