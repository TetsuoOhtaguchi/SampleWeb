<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { globalNaviMenuArr } from '../modules/options/globalNavi'
import CHeader from '../components/CHeader/CHeader.vue'
import CGlobalNavi from '../components/CGlobalNavi/CGlobalNavi.vue'
import CMainLayoutCard from '../components/CMainLayoutCard/CMainLayoutCard.vue'

const route = useRoute()
const router = useRouter()

const isPath = ref(route.path)

watch(route, () => {
  isPath.value = route.path
})

const menuArr = ref<{ index: number; menuLabel: string; menuPath: string }[]>(
  globalNaviMenuArr
)

const clickLogout = () => {
  // ページへ遷移させる
  void router.push('/Login')
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- ログインページ -->
    <div v-if="isPath === '/Login'">
      <router-view v-slot="{ Component }">
        <transition name="next" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- コンテンツページ -->
    <div v-else>
      <!-- ヘッダー -->
      <CHeader @click="clickLogout" />

      <!-- ページコンテナ -->
      <q-page-container class="_page_container">
        <!-- グローバルナビ -->
        <CGlobalNavi :menuArr="menuArr" />

        <!-- メインレイアウトカード -->
        <CMainLayoutCard>
          <div class="_mainlayout_inner_box">
            <router-view v-slot="{ Component }">
              <transition name="next" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </CMainLayoutCard>
        <div class="_lig_text">© LIG all right reserved.</div>
      </q-page-container>
    </div>
  </q-layout>
</template>

<style lang="sass" scoped>
// $
._page_container
  position: relative
  background: #DCDCDC
  display: flex
  height: 100vh

._mainlayout_inner_box
  width: 1140px
  margin: 0 auto

._lig_text
  font-size: 10px
  font-weight: bold
  color: $mainColor
  position: absolute
  bottom: 5px
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)

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
