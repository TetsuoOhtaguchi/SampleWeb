<script lang="ts" setup>
import { ref } from 'vue'
import WFooter from '../components/WFooter/WFooter.vue'
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ページコンポーネント -->
    <router-view v-slot="{ Component }">
      <transition name="next" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <WFooter />
  </q-layout>
</template>

<style lang="sass" scoped>
// $
// アニメーション処理
.next-enter
  transform: translate(-20px, 0)
  opacity: 0
.next-enter-to
  opacity: 1
.next-enter-active
  transition: all .6s 0s ease
.next-leave
  transform: translate(0, 0)
  opacity: 1
.next-leave-to
  transform: translate(20px, 0)
  opacity: 0
.next-leave-active
  transition: all .6s 0s ease
</style>
