<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { windowWidth, windowHeight } from 'src/boot/window'

const props = defineProps({
  /**
   * 開閉値
   * @example true or false
   */
  modelValue: { type: Boolean, default: false }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'update:modelValue', val: Boolean): void
  (e: 'clickMenu', val: String): void
  (e: 'clickTojiru'): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

const wMenuBox = ref<HTMLElement>()

const targetHeight = computed(() => {
  const element = wMenuBox.value
  if (element) return String(windowHeight.value) + 'px'
})
watch(targetHeight, () => {
  const element = wMenuBox.value
  if (targetHeight.value && element) element.style.height = targetHeight.value
})

const items = ref<string[]>([
  'お問合せ',
  '採用情報',
  '店舗情報',
  'お知らせ',
  'お品書き',
  'TOP'
])

// アニメーション処理
const rightBorder = ref<HTMLElement>()
const menuDoc = ref<HTMLElement[]>()
const oshinagakiDispFlag = ref<boolean>(false)
const newsDispFlag = ref<boolean>(false)
const storeDispFlag = ref<boolean>(false)
const recruitDispFlag = ref<boolean>(false)
const contactDispFlag = ref<boolean>(false)
const allDispFlag = ref<boolean>(false)
const animationEndFlag = ref<boolean>(false)
watch(
  () => props.modelValue,
  () => {
    if (animationEndFlag.value) return
    if (props.modelValue) {
      if (rightBorder.value) {
        rightBorder.value.style.transition = '3s'
        rightBorder.value.style.opacity = '1'
      }
      if (menuDoc.value) {
        menuDoc.value[5].style.transition = '3s'
        menuDoc.value[5].style.opacity = '1'
        oshinagakiDispFlag.value = true
      }
    } else {
      if (rightBorder.value) {
        rightBorder.value.style.opacity = '0'
      }
      if (menuDoc.value) {
        menuDoc.value[5].style.opacity = '0'
        oshinagakiDispFlag.value = false
        newsDispFlag.value = false
        storeDispFlag.value = false
        recruitDispFlag.value = false
        contactDispFlag.value = false
      }
    }
  }
)
watch(
  [
    oshinagakiDispFlag,
    newsDispFlag,
    storeDispFlag,
    recruitDispFlag,
    contactDispFlag,
    allDispFlag
  ],
  () => {
    if (oshinagakiDispFlag.value) {
      // お品書きを表示
      setTimeout(() => {
        if (menuDoc.value) {
          menuDoc.value[4].style.transition = '3s'
          menuDoc.value[4].style.opacity = '1'
          newsDispFlag.value = true
        }
      }, 300)
    } else {
      if (menuDoc.value) {
        menuDoc.value[4].style.transition = '3s'
        menuDoc.value[4].style.opacity = '0'
      }
    }

    // お知らせを表示
    if (newsDispFlag.value) {
      setTimeout(() => {
        if (menuDoc.value) {
          menuDoc.value[3].style.transition = '3s'
          menuDoc.value[3].style.opacity = '1'
          storeDispFlag.value = true
        }
      }, 300)
    } else {
      if (menuDoc.value) {
        menuDoc.value[3].style.transition = '3s'
        menuDoc.value[3].style.opacity = '0'
      }
    }

    // 店舗情報を表示
    if (storeDispFlag.value) {
      setTimeout(() => {
        if (menuDoc.value) {
          menuDoc.value[2].style.transition = '3s'
          menuDoc.value[2].style.opacity = '1'
          recruitDispFlag.value = true
        }
      }, 300)
    } else {
      if (menuDoc.value) {
        menuDoc.value[2].style.transition = '3s'
        menuDoc.value[2].style.opacity = '0'
      }
    }

    // 採用情報を表示
    if (recruitDispFlag.value) {
      setTimeout(() => {
        if (menuDoc.value) {
          menuDoc.value[1].style.transition = '3s'
          menuDoc.value[1].style.opacity = '1'
          contactDispFlag.value = true
        }
      }, 300)
    } else {
      if (menuDoc.value) {
        menuDoc.value[1].style.transition = '3s'
        menuDoc.value[1].style.opacity = '0'
      }
    }

    // お問合せを表示
    if (contactDispFlag.value) {
      setTimeout(() => {
        if (menuDoc.value) {
          menuDoc.value[0].style.transition = '3s'
          menuDoc.value[0].style.opacity = '1'
          allDispFlag.value = true
        }
      }, 300)
    } else {
      if (menuDoc.value) {
        menuDoc.value[0].style.transition = '3s'
        menuDoc.value[0].style.opacity = '0'
      }
    }
  }
)
watch(allDispFlag, () => {
  if (allDispFlag.value) {
    setTimeout(() => {
      if (menuDoc.value) {
        menuDoc.value[5].style.transition = '0.3s'
        menuDoc.value[4].style.transition = '0.3s'
        menuDoc.value[3].style.transition = '0.3s'
        menuDoc.value[2].style.transition = '0.3s'
        menuDoc.value[1].style.transition = '0.3s'
        menuDoc.value[0].style.transition = '0.3s'
        animationEndFlag.value = true
      }
    }, 300)
  }
})

// 表示されているページのメニューをアクティブ表示にする
const route = useRoute()
const activeMenuNum = ref<number>(0)
if (route.path === '/dev' || route.path === '/Top') {
  activeMenuNum.value = 5
}
watch(route, () => {
  if (route.path === '/Oshinagaki') activeMenuNum.value = 4
  if (route.path.indexOf('/News') !== -1) activeMenuNum.value = 3
  if (route.path === '/StoreInfo') activeMenuNum.value = 2
  if (route.path === '/Recruit') activeMenuNum.value = 1
  if (route.path === 'Contact') activeMenuNum.value = 0
})
</script>

<template>
  <div>
    <!-- メニュー -->
    <!-- <q-layout view="hHh Lpr lff"> -->
    <q-drawer
      side="right"
      v-model="model"
      overlay
      bordered
      :width="windowWidth"
      :breakpoint="0"
    >
      <div ref="wMenuBox" class="_w_menu_box">
        <!-- メニュー内容コンテナ -->
        <div class="_menu_contents_container">
          <div
            ref="menuDoc"
            v-for="(item, index) in items"
            :key="index"
            class="_tategaki_text_common"
            :class="{ _active_menu: index === activeMenuNum }"
            @click="emit('clickMenu', item)"
          >
            {{ item }}
          </div>
          <div ref="rightBorder" class="_right_border" />
        </div>

        <!-- 閉じるボタン -->
        <div class="_tojiru_container" @click="emit('clickTojiru')">
          <div class="_tojiru_circle">
            <q-icon name="close" class="_close_icon" />
          </div>
          <div class="_tojiru">閉じる</div>
        </div>
      </div>
    </q-drawer>
    <!-- </q-layout> -->
  </div>
</template>

<style lang="sass" scoped>
._w_menu_box
    position: relative
    background: #363636

._menu_contents_container
    position: absolute
    width: fit-content
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    -webkit-transform: translate(-50%, -50%)
    -ms-transform: translate(-50%, -50%)
    display: flex

._tategaki_text_common
    font-weight: bold
    -ms-writing-mode: tb-rl
    writing-mode: vertical-rl
    text-orientation: upright
    letter-spacing: 0.8rem
    transition: 0.3s
    color: $white
    border-left: 1px solid $white
    cursor: pointer
    opacity: 0
    @media screen and (min-width: 1080px)
        font-size: 28px
        padding: 0px 45px
    @media screen and (max-width: 1079px)
        font-size: 18px
        padding: 0px 15px
._tategaki_text_common:hover
    color: #787B54
._active_menu
    color: #787B54
._right_border
    opacity: 0
    border-right: 1px solid $white
    @media screen and (min-width: 1080px)
        height: 115px
    @media screen and (max-width: 1079px)
        height: 90px

._tojiru_container
    position: absolute
    width: fit-content
    cursor: pointer
    top: 25px
    right: 25px

._tojiru_circle
    background: $white
    border-radius: 50px
    transition: 0.3s
    display: flex
    justify-content: center
    align-items: center
    @media screen and (min-width: 1080px)
        height: 34px
        width: 34px
    @media screen and (max-width: 1079px)
        height: 25px
        width: 25px

._close_icon
    color: #363636
    @media screen and (min-width: 1080px)
        font-size: 30px
    @media screen and (max-width: 1079px)
        font-size: 20px

._tojiru
    font-weight: bold
    -ms-writing-mode: tb-rl
    writing-mode: vertical-rl
    letter-spacing: 0.3rem
    margin: 12px auto 0 auto
    transition: 0.3s
    color: $white
    @media screen and (min-width: 1080px)
        font-size: 19px
    @media screen and (max-width: 1079px)
        font-size: 14px

._tojiru_container:hover ._tojiru_circle
    background: #898888

._tojiru_container:hover ._tojiru
    color: #898888
</style>
