<script setup lang="ts">
import { ref, PropType, watch, onMounted } from 'vue'
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

//　選択されているボタンを定義する
const activeMenuBtnNum = ref<number | undefined>(0)

const clickMenuBtn = (path: string, index: number) => {
  console.log(path, 'ページへ遷移させる')
  activeMenuBtnNum.value = index
}

// pathの監視で使用する
const route = useRoute()
// 遷移処理で使用する
const router = useRouter()

// 現在のパスを定義する
const isPath = ref(route.path)

// 展開時のアクティブボタン処理を行う
activeMenuBtnNum.value = props.menuArr.find(d => {
  if (isPath.value.includes(d.menuPath)) {
    // 現在のパスが、menuPathプロパティに文字列として含まれている場合、対象のindexプロパティを返す
    return d
  } else {
    // 現在のパスが、menuPathプロパティに文字列として含まれていない場合、お問合せのindexプロパティを返す
    return d
  }
})?.index

// パスに変更があった場合、以下の処理を行う
watch(route, () => {
  isPath.value = route.path

  // 遷移時のアクティブボタン処理を行う
  activeMenuBtnNum.value = props.menuArr.find(d => {
    if (isPath.value.includes(d.menuPath)) {
      // 現在のパスが、menuPathプロパティに文字列として含まれている場合、対象のindexプロパティを返す
      return d
    } else {
      // 現在のパスが、menuPathプロパティに文字列として含まれていない場合、お問合せのindexプロパティを返す
      return d
    }
  })?.index
})
</script>

<template>
  <div class="_c_global_navi_container">
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
      <div class="_btn_border_bottom" />
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
._btn_border_bottom
  border-bottom: 1px solid $white

._active_btn
  opacity: 0.7
</style>
