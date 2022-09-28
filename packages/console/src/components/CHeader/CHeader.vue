<script setup lang="ts">
import Button from '../../../../components/src/components/Button/Button.vue'

const props = defineProps({
  /**
   * ログインユーザーネーム
   * @example '山田太郎'
   */
  loginUserName: { type: String, default: 'Name not yet set' }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <q-header elevated>
    <q-toolbar class="glossy _c_header_toolbar">
      <div>LOGO</div>
      <!-- <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
      </q-avatar> -->
      <div class="_left_contents_container">
        <div>{{ loginUserName }}</div>
        <Button
          label="ログアウト"
          design="consoleSmallSub"
          class="_logout_btn"
          @click="emit('click')"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<style lang="sass" scoped>
._c_header_toolbar
    height: 70px

._left_contents_container
    display: flex
    align-items: center
    margin-left: auto

._logout_btn
    width: 110px
    margin-left: 25px
</style>
