<script setup lang="ts">
import { ref, PropType, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  /**
   * メニュー配列
   * @example
   */
  menuArr: {
    type: Array as PropType<
      { index: number; menuLabel: string; menuPath: string }[]
    >,
    default: () => []
  }
})

// pathの監視で使用する
const route = useRoute()
// 遷移処理で使用する
const router = useRouter()

//　選択されているボタンを定義する
const activeMenuBtnNum = ref<number | undefined>(0)

// メニューボタンをクリックする
const clickMenuBtn = (path: string, index: number) => {
  // ページへ遷移させる
  void router.push(path)

  activeMenuBtnNum.value = index
}

// 現在のパスを定義する
const isPath = ref(route.path)

// 展開時のアクティブボタン処理を行う
activeMenuBtnNum.value = props.menuArr.find(d =>
  isPath.value.includes(d.menuPath)
)?.index

// パスに変更があった場合、以下の処理を行う
watch(route, () => {
  isPath.value = route.path

  // 遷移時のアクティブボタン処理を行う
  activeMenuBtnNum.value = props.menuArr.find(d =>
    isPath.value.includes(d.menuPath)
  )?.index
})
</script>

<template>
  <div class="_c_global_navi_container">
    <div class="_btn_border" />
    <div v-for="(item, index) in menuArr" :key="index">
      <q-btn
        square
        flat
        glossy
        :label="item.menuLabel"
        style="color: white"
        class="_c_global_navi_btn"
        :class="{ _active_btn: index === activeMenuBtnNum }"
        @click="clickMenuBtn(item.menuPath, index)"
      />
      <div class="_btn_border" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
._c_global_navi_container
  background: $mainColor
  width: 187px

._c_global_navi_btn
  height: 50px
  width: 100%
  font-weight: bold
._btn_border
  border-bottom: 1px solid #DCDCDC

._active_btn
  opacity: 0.7
</style>
