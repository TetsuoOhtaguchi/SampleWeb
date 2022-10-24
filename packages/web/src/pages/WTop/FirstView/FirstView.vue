<script setup lang="ts">
import { ref } from 'vue'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()

const isSrc = ref<string>('')
isSrc.value = '/image/sw-first-view1.jpg'
setTimeout(() => {
  isSrc.value = '/image/sw-first-view2.jpg'
}, 3000)
setTimeout(() => {
  isSrc.value = '/image/sw-first-view3.jpg'
}, 6000)
setTimeout(() => {
  isSrc.value = '/image/sw-first-view4.jpg'
}, 9000)
setTimeout(() => {
  isSrc.value = '/image/sw-first-view5.jpg'
}, 12000)
</script>

<template>
  <div class="_first_view_box">
    <img :src="isSrc" alt="ファーストビュー画像" class="_first_view_img" />
  </div>
</template>

<style lang="sass" scoped>
._first_view_box
  background: pink
  height: 100vh

._first_view_img
  width: 100%
  height: 100%
  object-fit: cover
</style>
