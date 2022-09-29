<script setup lang="ts">
import { ref } from 'vue'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()
</script>

<template>
  <div>利用規約ページ</div>
</template>

<style lang="sass" scoped></style>
