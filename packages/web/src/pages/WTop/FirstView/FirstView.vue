<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuContainerRef = ref<HTMLElement>()
const imgDoc1 = ref<HTMLElement>()
const imgDoc2 = ref<HTMLElement>()
const imgDoc3 = ref<HTMLElement>()
const imgDoc4 = ref<HTMLElement>()
const imgDoc5 = ref<HTMLElement>()
const timeCounter = ref<number>(0)
const viewFlag = ref<boolean>(false)
setTimeout(() => {
  const menuEle = menuContainerRef.value!
  menuEle.style.marginTop = '0px'
  menuEle.style.opacity = '1'
  const showDoc = imgDoc1.value!
  showDoc.style.height = '100%'
  showDoc.style.width = '100%'
  showDoc.style.top = '0%'
  showDoc.style.left = '0%'
  showDoc.style.opacity = '1'
  timeCounter.value++
  viewFlag.value = true
}, 0)

watch(viewFlag, () => {
  if (viewFlag.value) {
    setInterval(() => {
      timeCounter.value++
      if (timeCounter.value === 2) {
        const hiddenDoc = imgDoc1.value!
        if (!hiddenDoc) return
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc2.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 3) {
        const hiddenDoc = imgDoc2.value!
        if (!hiddenDoc) return
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc3.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 4) {
        const hiddenDoc = imgDoc3.value!
        if (!hiddenDoc) return
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc4.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 5) {
        const hiddenDoc = imgDoc4.value!
        if (!hiddenDoc) return
        hiddenDoc.style.opacity = '0'

        const zoomDoc = imgDoc1.value!
        zoomDoc.style.height = '150%'
        zoomDoc.style.width = '150%'
        zoomDoc.style.top = '-25%'
        zoomDoc.style.left = '-25%'

        const showDoc = imgDoc5.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
      } else if (timeCounter.value === 6) {
        const hiddenDoc = imgDoc5.value!
        if (!hiddenDoc) return
        hiddenDoc.style.opacity = '0'

        const showDoc = imgDoc1.value!
        showDoc.style.height = '100%'
        showDoc.style.width = '100%'
        showDoc.style.top = '0%'
        showDoc.style.left = '0%'
        showDoc.style.opacity = '1'
        viewFlag.value = false
      }
    }, 10000)
  }
})

const oshinagakiRef = ref<HTMLElement>()
const oshinagakiOver = () => {
  const element = oshinagakiRef.value!
  if (!element) return
  element.style.height = '125px'
}
const oshinagakiLeave = () => {
  const element = oshinagakiRef.value!
  if (!element) return
  element.style.height = '0px'
}

const oshiraseRef = ref<HTMLElement>()
const oshiraseOver = () => {
  const element = oshiraseRef.value!
  if (!element) return
  element.style.height = '125px'
}
const oshiraseLeave = () => {
  const element = oshiraseRef.value!
  if (!element) return
  element.style.height = '0px'
}

const tenpoRef = ref<HTMLElement>()
const tenpoOver = () => {
  const element = tenpoRef.value!
  if (!element) return
  element.style.height = '125px'
}
const tenpoLeave = () => {
  const element = tenpoRef.value!
  if (!element) return
  element.style.height = '0px'
}

const saiyoRef = ref<HTMLElement>()
const saiyoOver = () => {
  const element = saiyoRef.value!
  if (!element) return
  element.style.height = '125px'
}
const saiyoLeave = () => {
  const element = saiyoRef.value!
  if (!element) return
  element.style.height = '0px'
}

const otoiawaseRef = ref<HTMLElement>()
const otoiawaseOver = () => {
  const element = otoiawaseRef.value!
  if (!element) return
  element.style.height = '125px'
}
const otoiawaseLeave = () => {
  const element = otoiawaseRef.value!
  if (!element) return
  element.style.height = '0px'
}

const clickOshinagaki = () => {
  void router.push('/Menu')
}
const clickOshirase = () => {
  void router.push('/NewsList')
}
const clickTenpo = () => {
  void router.push('/Storeinfo')
}
const clickSaiyo = () => {
  void router.push('/Recruit')
}
const clickOtoiawase = () => {
  void router.push('/Contact')
}
</script>

<template>
  <div class="_first_view_box">
    <img
      ref="imgDoc1"
      src="/image/sw-first-view1.jpg"
      alt="ファーストビュー画像1"
      class="_img_doc"
    />
    <img
      ref="imgDoc2"
      src="/image/sw-first-view2.jpg"
      alt="ファーストビュー画像2"
      class="_img_doc"
    />
    <img
      ref="imgDoc3"
      src="/image/sw-first-view3.jpg"
      alt="ファーストビュー画像3"
      class="_img_doc"
    />
    <img
      ref="imgDoc4"
      src="/image/sw-first-view4.jpg"
      alt="ファーストビュー画像4"
      class="_img_doc"
    />
    <img
      ref="imgDoc5"
      src="/image/sw-first-view5.jpg"
      alt="ファーストビュー画像5"
      class="_img_doc"
    />

    <!-- メニューコンテナ -->
    <div ref="menuContainerRef" class="_menu_container">
      <div class="_oshinagaki_container">
        <div
          class="_oshinagaki_text"
          @mouseover="oshinagakiOver"
          @mouseleave="oshinagakiLeave"
          @click="clickOshinagaki"
        >
          お品書き
        </div>
        <div ref="oshinagakiRef" class="_oshinagaki_bg" />
      </div>

      <div class="_oshirase_container">
        <div
          class="_oshirase_text"
          @mouseover="oshiraseOver"
          @mouseleave="oshiraseLeave"
          @click="clickOshirase"
        >
          お知らせ
        </div>
        <div ref="oshiraseRef" class="_oshirase_bg" />
      </div>

      <div class="_tenpo_container">
        <div
          class="_tenpo_text"
          @mouseover="tenpoOver"
          @mouseleave="tenpoLeave"
          @click="clickTenpo"
        >
          店舗情報
        </div>
        <div ref="tenpoRef" class="_tenpo_bg" />
      </div>

      <div class="_saiyo_container">
        <div
          class="_saiyo_text"
          @mouseover="saiyoOver"
          @mouseleave="saiyoLeave"
          @click="clickSaiyo"
        >
          採用情報
        </div>
        <div ref="saiyoRef" class="_saiyo_bg" />
      </div>

      <div class="_otoiawase_container">
        <div
          class="_otoiawase_text"
          @mouseover="otoiawaseOver"
          @mouseleave="otoiawaseLeave"
          @click="clickOtoiawase"
        >
          お問合せ
        </div>
        <div ref="otoiawaseRef" class="_otoiawase_bg" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._first_view_box
  position: relative
  background: black
  height: 100vh
  overflow: hidden

._img_doc
  position: absolute
  top: -25%
  left: -25%
  width: 150%
  height: 150%
  object-fit: cover
  transition: 10s
  opacity: 0

._menu_container
  position: absolute
  z-index: 10
  color: #FFFFFF
  font-weight: bold
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 0.8rem
  display: grid
  margin-top: 25px
  opacity: 0
  transition: 1s
  @media screen and (min-width: 1080px)
    height: 130px
    width: 350px
    gap: 65px
    font-size: 18px
    top: 50px
    right: 59px
  @media screen and (max-width: 1079px)
    height: 120px
    width: 220px
    gap: 35px
    font-size: 14px
    top: 36px
    right: 12px

._oshinagaki_container
  position: relative

._oshinagaki_text
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  cursor: pointer

._oshinagaki_bg
  position: absolute
  top: -5px
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  background: #535338
  width: 30px
  height: 0px
  z-index: -1
  transition: 0.3s

._oshirase_container
  position: relative

._oshirase_text
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  cursor: pointer

._oshirase_bg
  position: absolute
  top: -5px
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  background: #535338
  width: 30px
  height: 0px
  z-index: -1
  transition: 0.3s

._tenpo_container
  position: relative

._tenpo_text
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  cursor: pointer

._tenpo_bg
  position: absolute
  top: -5px
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  background: #535338
  width: 30px
  height: 0px
  z-index: -1
  transition: 0.3s

._saiyo_container
  position: relative

._saiyo_text
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  cursor: pointer

._saiyo_bg
  position: absolute
  top: -5px
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  background: #535338
  width: 30px
  height: 0px
  z-index: -1
  transition: 0.3s

._otoiawase_container
  position: relative

._otoiawase_text
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  cursor: pointer

._otoiawase_bg
  position: absolute
  top: -5px
  left: 50%
  transform: translateX(-50%)
  -webkit-transform: translateX(-50%)
  -ms-transform: translateX(-50%)
  background: #535338
  width: 30px
  height: 0px
  z-index: -1
  transition: 0.3s
</style>
