<script setup lang="ts">
import { ref } from 'vue'

// const props = defineProps({})

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()
</script>

<template>
  <div>テンプレート</div>
</template>

<style lang="sass" scoped></style>
