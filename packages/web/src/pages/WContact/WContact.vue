<script setup lang="ts">
import { ref } from 'vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()
</script>

<template>
  <div>
    <Inputform title="氏名" :required="true" placeholder="name" design="web" />
    <Inputform
      title="メールアドレス"
      :required="true"
      placeholder="e-mail"
      design="web"
    />
    <Inputform
      title="電話番号"
      :required="true"
      placeholder="phone number"
      design="web"
    />
  </div>
</template>

<style lang="sass" scoped></style>
