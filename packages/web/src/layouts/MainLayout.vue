<script lang="ts" setup>
import { ref, watch } from 'vue'
import { windowScroll } from 'src/boot/window'
import WFooter from '../components/WFooter/WFooter.vue'
import WMokujiBtn from '../components/WMokujiBtn/WMokujiBtn.vue'
import WMenu from '../components/WMenu/WMenu.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isPath = ref<string>(route.path)

watch(route, () => {
  isPath.value = route.path

  const wMokujiBtnPositionEle = wMokujiBtnPositionRef.value!
  if (isPath.value === '/') {
    wMokujiBtnPositionEle.style.opacity = '0'
  }
})

// サイドメニュー
const menuFlag = ref<boolean>(false)
const wMokujiBtnPositionRef = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const wMokujiBtnPositionEle = wMokujiBtnPositionRef.value!

  if (isPath.value === '/' && windowScroll.value > window.innerHeight) {
    wMokujiBtnPositionEle.style.opacity = '1'
  } else if (isPath.value === '/' && windowScroll.value < window.innerHeight) {
    wMokujiBtnPositionEle.style.opacity = '0'
  } else {
    wMokujiBtnPositionEle.style.opacity = '1'
  }
})

const clickMokuji = () => {
  menuFlag.value = true
}
const clickTojiru = () => {
  menuFlag.value = false
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="_main_layout_box">
    <!-- ページコンポーネント -->
    <router-view v-slot="{ Component }">
      <div ref="wMokujiBtnPositionRef" class="_w_mokuji_btn_position">
        <WMokujiBtn @clickMokuji="clickMokuji" />
      </div>
      <WMenu v-model="menuFlag" @clickTojiru="clickTojiru" />
      <transition name="next" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <WFooter />
  </q-layout>
</template>

<style lang="sass" scoped>
// $
._main_layout_box
  position: relative

._w_mokuji_btn_position
  position: fixed
  right: 25px
  top: 25px
  z-index: 10
  width: fit-content
  transition: 0.3s
  opacity: 0
  @media screen and (max-width: 428px)
    top: 36px
    right: 12px

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
