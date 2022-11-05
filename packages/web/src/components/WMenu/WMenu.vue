<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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

const items = ref<{ label: string; path: string }[]>([
  {
    label: 'お問合せ',
    path: '/Contact'
  },
  {
    label: '採用情報',
    path: '/Recruit'
  },
  {
    label: '店舗情報',
    path: '/Storeinfo'
  },
  {
    label: 'お知らせ',
    path: '/NewsList'
  },
  {
    label: 'お品書き',
    path: '/Menu'
  },
  {
    label: 'TOP',
    path: '/'
  }
])

// アニメーション処理
const rightBorder = ref<HTMLElement>()
const menuContentsContainerRef = ref<HTMLElement>()
watch(
  () => props.modelValue,
  () => {
    const menuContentsContainerEle = menuContentsContainerRef.value!
    if (!menuContentsContainerEle) return
    if (props.modelValue) {
      menuContentsContainerEle.style.marginTop = '0px'
      menuContentsContainerEle.style.opacity = '1'
    } else {
      menuContentsContainerEle.style.marginTop = '25px'
      menuContentsContainerEle.style.opacity = '0'
    }
  }
)

// 表示されているページのメニューをアクティブ表示にする
const route = useRoute()
const activeMenuNum = ref<number>(0)
if (route.path === '/') activeMenuNum.value = 5
if (route.path === '/Menu') activeMenuNum.value = 4
if (route.path.indexOf('/News') !== -1) activeMenuNum.value = 3
if (route.path === '/Storeinfo') activeMenuNum.value = 2
if (route.path === '/Recruit') activeMenuNum.value = 1
if (route.path === '/Contact') activeMenuNum.value = 0
watch(route, () => {
  if (route.path === '/') activeMenuNum.value = 5
  if (route.path === '/Menu') activeMenuNum.value = 4
  if (route.path.indexOf('/News') !== -1) activeMenuNum.value = 3
  if (route.path === '/Storeinfo') activeMenuNum.value = 2
  if (route.path === '/Recruit') activeMenuNum.value = 1
  if (route.path === '/Contact') activeMenuNum.value = 0
})

const router = useRouter()

const clickMenu = (path: string) => {
  void router.push(path)
  model.value = false
}
</script>

<template>
  <div>
    <!-- メニュー -->
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
        <div ref="menuContentsContainerRef" class="_menu_contents_container">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="_tategaki_text_common"
            :class="{ _active_menu: index === activeMenuNum }"
            @click="clickMenu(item.path)"
          >
            {{ item.label }}
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
    opacity: 0
    transition: 1s
    margin-top: 25px

._tategaki_text_common
    font-weight: bold
    -ms-writing-mode: tb-rl
    writing-mode: vertical-rl
    text-orientation: upright
    letter-spacing: 0.8rem
    color: $white
    border-left: 1px solid $white
    cursor: pointer
    transition: 0.3s
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
    // opacity: 0
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
