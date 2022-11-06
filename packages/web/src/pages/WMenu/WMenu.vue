<script setup lang="ts">
import { ref, watch } from 'vue'
import Image from '../../../../components/src/components/Image/Image.vue'
import WTategakiTitleVue from '../../components/WTategakiTitle/WTategakiTitle.vue'
import WCoursePanel from '../../components/WCoursePanel/WCoursePanel.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const tategakiTitleBoxRef = ref<HTMLElement>()

setTimeout(() => {
  const tategakiTitleBoxEle = tategakiTitleBoxRef.value
  if (!tategakiTitleBoxEle) return
  tategakiTitleBoxEle.style.opacity = '1'
}, 0)

const imgRef1 = ref<HTMLElement>()
const imgRef2 = ref<HTMLElement>()
const imgRef3 = ref<HTMLElement>()

const viewFlag = ref<boolean>(false)
const timeCounter = ref<number>(0)

setTimeout(() => {
  const imgEle1 = imgRef1.value!
  if (!imgEle1) return
  imgEle1.style.opacity = '1'
  timeCounter.value++
  viewFlag.value = true
}, 0)

watch(viewFlag, () => {
  if (viewFlag.value) {
    setInterval(() => {
      timeCounter.value++
      if (timeCounter.value === 2) {
        const hiddenEle = imgRef1.value!
        if (!hiddenEle) return
        hiddenEle.style.opacity = '0'

        const showEle = imgRef2.value!
        if (!showEle) return
        showEle.style.opacity = '1'
      }
      if (timeCounter.value === 3) {
        const hiddenEle = imgRef2.value!
        if (!hiddenEle) return
        hiddenEle.style.opacity = '0'

        const showEle = imgRef3.value!
        if (!showEle) return
        showEle.style.opacity = '1'
      }

      if (timeCounter.value === 4) {
        const hiddenEle = imgRef3.value!
        if (!hiddenEle) return
        hiddenEle.style.opacity = '0'

        const showEle = imgRef1.value!
        if (!showEle) return
        showEle.style.opacity = '1'
        viewFlag.value = false
      }
    }, 10000)
  }
})

const contentsTitleContainerSakanaRef = ref<HTMLElement>()
const contentsTextContainerSakanaRef = ref<HTMLElement>()
const menuItem1containerSakanaRef = ref<HTMLElement>()
const menuItem2containerSakanaRef = ref<HTMLElement>()

const contentsTitleContainerNikuRef = ref<HTMLElement>()
const contentsTextContainerNikuRef = ref<HTMLElement>()
const menuItem1containerNikuRef = ref<HTMLElement>()
const menuItem2containerNikuRef = ref<HTMLElement>()

const contentsTitleContainerSakeRef = ref<HTMLElement>()
const contentsTextContainerSakeRef = ref<HTMLElement>()
const menuItem1containerSakeRef = ref<HTMLElement>()
const menuItem2containerSakeRef = ref<HTMLElement>()

const contentsTitleContainerCourseRef = ref<HTMLElement>()
const contentsTextContainerCourseRef = ref<HTMLElement>()
const coursePanelContainerRef = ref<HTMLElement>()
/**
 * ! アニメーションから
 */

// スクロール処理を実行する
watch(windowScroll, () => {
  const contentsTitleContainerSakanaEle = contentsTitleContainerSakanaRef.value!
  const contentsTextContainerSakanaEle = contentsTextContainerSakanaRef.value!
  const menuItem1containerSakanaEle = menuItem1containerSakanaRef.value!
  const menuItem2containerSakanaEle = menuItem2containerSakanaRef.value!

  const contentsTitleContainerNikuEle = contentsTitleContainerNikuRef.value!
  const contentsTextContainerNikuEle = contentsTextContainerNikuRef.value!
  const menuItem1containerNikuEle = menuItem1containerNikuRef.value!
  const menuItem2containerNikuEle = menuItem2containerNikuRef.value!

  const contentsTitleContainerSakeEle = contentsTitleContainerSakeRef.value!
  const contentsTextContainerSakeEle = contentsTextContainerSakeRef.value!
  const menuItem1containerSakeEle = menuItem1containerSakeRef.value!
  const menuItem2containerSakeEle = menuItem2containerSakeRef.value!

  const contentsTitleContainerCourseEle = contentsTitleContainerCourseRef.value!
  const contentsTextContainerCourseEle = contentsTextContainerCourseRef.value!
  const coursePanelContainerEle = coursePanelContainerRef.value!
  if (windowWidth.value <= 665) {
    // SP表示
    // 肴
    if (windowScroll.value > 15) {
      contentsTitleContainerSakanaEle.style.marginTop = '0px'
      contentsTitleContainerSakanaEle.style.opacity = '1'
    }
    if (windowScroll.value > 80) {
      contentsTextContainerSakanaEle.style.paddingTop = '0px'
      contentsTextContainerSakanaEle.style.opacity = '1'
    }
    if (windowScroll.value > 670) {
      menuItem1containerSakanaEle.style.paddingLeft = '0px'
      menuItem1containerSakanaEle.style.opacity = '1'
    }
    if (windowScroll.value > 1320) {
      menuItem2containerSakanaEle.style.paddingRight = '0px'
      menuItem2containerSakanaEle.style.opacity = '1'
    }

    // 肉
    if (windowScroll.value > 1850) {
      contentsTitleContainerNikuEle.style.marginTop = '0px'
      contentsTitleContainerNikuEle.style.opacity = '1'
    }
    if (windowScroll.value > 2100) {
      contentsTextContainerNikuEle.style.paddingTop = '0px'
      contentsTextContainerNikuEle.style.opacity = '1'
    }
    if (windowScroll.value > 2650) {
      menuItem1containerNikuEle.style.paddingLeft = '0px'
      menuItem1containerNikuEle.style.opacity = '1'
    }
    if (windowScroll.value > 3300) {
      menuItem2containerNikuEle.style.paddingRight = '0px'
      menuItem2containerNikuEle.style.opacity = '1'
    }

    // 酒
    if (windowScroll.value > 3800) {
      contentsTitleContainerSakeEle.style.marginTop = '0px'
      contentsTitleContainerSakeEle.style.opacity = '1'
    }
    if (windowScroll.value > 4100) {
      contentsTextContainerSakeEle.style.paddingTop = '0px'
      contentsTextContainerSakeEle.style.opacity = '1'
    }
    if (windowScroll.value > 4615) {
      menuItem1containerSakeEle.style.paddingLeft = '0px'
      menuItem1containerSakeEle.style.opacity = '1'
    }
    if (windowScroll.value > 5220) {
      menuItem2containerSakeEle.style.paddingRight = '0px'
      menuItem2containerSakeEle.style.opacity = '1'
    }

    // コース
    if (windowScroll.value > 5750) {
      contentsTitleContainerCourseEle.style.marginTop = '0px'
      contentsTitleContainerCourseEle.style.opacity = '1'
    }
    if (windowScroll.value > 6000) {
      contentsTextContainerCourseEle.style.paddingTop = '0px'
      contentsTextContainerCourseEle.style.opacity = '1'
    }
    if (windowScroll.value > 6500) {
      coursePanelContainerEle.style.marginTop = '0px'
      coursePanelContainerEle.style.opacity = '1'
    }
  } else {
    // PC表示
    //　肴
    if (windowScroll.value > 15) {
      contentsTitleContainerSakanaEle.style.marginTop = '0px'
      contentsTitleContainerSakanaEle.style.opacity = '1'
    }
    if (windowScroll.value > 250) {
      contentsTextContainerSakanaEle.style.paddingTop = '0px'
      contentsTextContainerSakanaEle.style.opacity = '1'
    }
    if (windowScroll.value > 950) {
      menuItem1containerSakanaEle.style.paddingLeft = '0px'
      menuItem1containerSakanaEle.style.opacity = '1'
    }
    if (windowScroll.value > 1500) {
      menuItem2containerSakanaEle.style.paddingRight = '0px'
      menuItem2containerSakanaEle.style.opacity = '1'
    }

    // 肉
    if (windowScroll.value > 1900) {
      contentsTitleContainerNikuEle.style.marginTop = '0px'
      contentsTitleContainerNikuEle.style.opacity = '1'
    }
    if (windowScroll.value > 2150) {
      contentsTextContainerNikuEle.style.paddingTop = '0px'
      contentsTextContainerNikuEle.style.opacity = '1'
    }
    if (windowScroll.value > 2800) {
      menuItem1containerNikuEle.style.paddingLeft = '0px'
      menuItem1containerNikuEle.style.opacity = '1'
    }
    if (windowScroll.value > 3360) {
      menuItem2containerNikuEle.style.paddingRight = '0px'
      menuItem2containerNikuEle.style.opacity = '1'
    }

    // 酒
    if (windowScroll.value > 3770) {
      contentsTitleContainerSakeEle.style.marginTop = '0px'
      contentsTitleContainerSakeEle.style.opacity = '1'
    }
    if (windowScroll.value > 4050) {
      contentsTextContainerSakeEle.style.paddingTop = '0px'
      contentsTextContainerSakeEle.style.opacity = '1'
    }
    if (windowScroll.value > 4670) {
      menuItem1containerSakeEle.style.paddingLeft = '0px'
      menuItem1containerSakeEle.style.opacity = '1'
    }
    if (windowScroll.value > 5210) {
      menuItem2containerSakeEle.style.paddingRight = '0px'
      menuItem2containerSakeEle.style.opacity = '1'
    }

    // コース
    if (windowScroll.value > 5580) {
      contentsTitleContainerCourseEle.style.marginTop = '0px'
      contentsTitleContainerCourseEle.style.opacity = '1'
    }
    if (windowScroll.value > 5870) {
      contentsTextContainerCourseEle.style.paddingTop = '0px'
      contentsTextContainerCourseEle.style.opacity = '1'
    }
    if (windowScroll.value > 6450) {
      coursePanelContainerEle.style.marginTop = '0px'
      coursePanelContainerEle.style.opacity = '1'
    }
  }
})
</script>

<template>
  <div class="_menu_box">
    <div class="_page_view_box">
      <div ref="tategakiTitleBoxRef" class="_tategaki_title_box">
        <WTategakiTitleVue />
      </div>
      <div ref="imgRef1" class="_page_view_img_box">
        <Image
          src="sw-menu-pageview1.jpg"
          alt="お品書きファーストビュー1"
          class="_page_view_img"
        />
      </div>
      <div ref="imgRef2" class="_page_view_img_box">
        <Image
          src="sw-menu-pageview2.jpg"
          alt="お品書きファーストビュー2"
          class="_page_view_img"
        />
      </div>
      <div ref="imgRef3" class="_page_view_img_box">
        <Image
          src="sw-menu-pageview3.jpg"
          alt="お品書きファーストビュー3"
          class="_page_view_img"
        />
      </div>
    </div>

    <!-- 肴 -->
    <div class="_sakana_text_box">
      <div
        ref="contentsTitleContainerSakanaRef"
        class="_contents_title_container_common"
      >
        <div class="_contents_title_common">肴</div>
        <div class="_contents_subtitle_common">FISH</div>
      </div>
      <div
        ref="contentsTextContainerSakanaRef"
        class="_contents_text_container_common"
      >
        魚料理の説明が入ります。魚料理の <br />
        説明が入ります。魚料理の説明が入ります。 <br />
        魚料理の説明が入ります。 <br />
        魚料理の説明が入ります。魚料理の説明が <br />
        入ります。魚料理の説明が入ります。
      </div>
    </div>
    <div class="_sakana_item_box">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />
      <div
        ref="menuItem1containerSakanaRef"
        class="_menu_item_1_container_common"
      >
        <img
          src="image/sw-menu-sakana-item1.jpg"
          alt="お品書き魚料理画像1"
          class="_menu_item_img1"
        />
        <div class="_menu_item_text_container_common">
          <div class="_menu_item_text1">
            魚料理の説明が入ります。<br />魚料理の説明が入ります。魚料理の<br />説明が入ります。魚料理の説明が入<br />ります。魚料理の説明が入ります。
          </div>
          <div class="_menu_item_title1">
            肴料理壱
          </div>
        </div>
      </div>
      <div
        ref="menuItem2containerSakanaRef"
        class="_menu_item_2_container_common"
      >
        <div class="_menu_item_img2_box">
          <img
            src="image/sw-menu-sakana-item2.jpg"
            alt="お品書き魚料理画像2"
            class="_menu_item_img2"
          />
        </div>
        <div class="_menu_item_text_container_common">
          <div class="_menu_item_text2">
            魚料理の説明が入ります。<br />魚料理の説明が入ります。魚料理の<br />説明が入ります。魚料理の説明が入<br />ります。魚料理の説明が入ります。
          </div>
          <div class="_menu_item_title2">
            肴料理弐
          </div>
        </div>
      </div>
    </div>

    <!-- 肉 -->
    <div class="_niku_text_box">
      <div
        ref="contentsTitleContainerNikuRef"
        class="_contents_title_container_common"
      >
        <div class="_contents_title_common">肉</div>
        <div class="_contents_subtitle_common">MEAT</div>
      </div>
      <div
        ref="contentsTextContainerNikuRef"
        class="_contents_text_container_common"
      >
        肉料理の説明が入ります。肉料理の <br />
        説明が入ります。肉料理の説明が入ります。 <br />
        肉料理の説明が入ります。 <br />
        肉料理の説明が入ります。肉料理の説明が <br />
        入ります。肉料理の説明が入ります。
      </div>
    </div>
    <div class="_niku_item_box">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />
      <div
        ref="menuItem1containerNikuRef"
        class="_menu_item_1_container_common"
      >
        <img
          src="image/sw-menu-niku-item1.jpg"
          alt="お品書き肉料理画像1"
          class="_menu_item_img1"
        />
        <div class="_menu_item_text_container_common">
          <div class="_menu_item_text1">
            肉料理の説明が入ります。<br />肉料理の説明が入ります。肉料理の<br />説明が入ります。肉料理の説明が入<br />ります。肉料理の説明が入ります。
          </div>
          <div class="_menu_item_title1">
            肉料理壱
          </div>
        </div>
      </div>
      <div
        ref="menuItem2containerNikuRef"
        class="_menu_item_2_container_common"
      >
        <div class="_menu_item_img2_box">
          <img
            src="image/sw-menu-niku-item2.jpg"
            alt="お品書き肉料理画像2"
            class="_menu_item_img2"
          />
        </div>
        <div class="_menu_item_text_container_common">
          <div class="_menu_item_text2">
            肉料理の説明が入ります。<br />肉料理の説明が入ります。肉料理の<br />説明が入ります。肉料理の説明が入<br />ります。肉料理の説明が入ります。
          </div>
          <div class="_menu_item_title2">
            肉料理弐
          </div>
        </div>
      </div>
    </div>

    <!-- 酒 -->
    <div class="_sake_text_box">
      <div
        ref="contentsTitleContainerSakeRef"
        class="_contents_title_container_common"
      >
        <div class="_contents_title_common">酒</div>
        <div class="_contents_subtitle_common">SAKE</div>
      </div>
      <div
        ref="contentsTextContainerSakeRef"
        class="_contents_text_container_common"
      >
        酒の説明が入ります。酒の <br />
        説明が入ります。酒の説明が入ります。 <br />
        酒の説明が入ります。 <br />
        酒の説明が入ります。酒の説明が <br />
        入ります。酒の説明が入ります。
      </div>
    </div>
    <div class="_sake_item_box">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />
      <div
        ref="menuItem1containerSakeRef"
        class="_menu_item_1_container_common"
      >
        <img
          src="image/sw-menu-sake-item1.jpg"
          alt="お品書き酒画像1"
          class="_menu_item_img1"
        />
        <div class="_menu_item_text_container_common">
          <div class="_menu_item_text1">
            酒の説明が入ります。<br />酒の説明が入ります。酒の<br />説明が入ります。酒の説明が入<br />ります。酒の説明が入ります。
          </div>
          <div class="_menu_item_title1">
            酒&emsp;壱
          </div>
        </div>
      </div>
      <div
        ref="menuItem2containerSakeRef"
        class="_menu_item_2_container_common"
      >
        <div class="_menu_item_img2_box">
          <img
            src="image/sw-menu-sake-item2.jpg"
            alt="お品書き酒画像2"
            class="_menu_item_img2"
          />
        </div>
        <div class="_menu_item_text_container_common">
          <div class="_menu_item_text2">
            酒の説明が入ります。<br />酒の説明が入ります。酒の<br />説明が入ります。酒の説明が入<br />ります。酒の説明が入ります。
          </div>
          <div class="_menu_item_title2">
            酒&emsp;弐
          </div>
        </div>
      </div>
    </div>

    <!-- コース -->
    <div class="_course_text_box">
      <div
        ref="contentsTitleContainerCourseRef"
        class="_contents_title_container_common"
      >
        <div class="_contents_title_common">コース</div>
        <div class="_contents_subtitle_common">COURSE</div>
      </div>
      <div
        ref="contentsTextContainerCourseRef"
        class="_contents_text_container_common"
      >
        コースの説明が入ります。コースの <br />
        説明が入ります。コースの説明が入ります。 <br />
        コースの説明が入ります。 <br />
        コースの説明が入ります。コースの説明が <br />
        入ります。コースの説明が入ります。
      </div>
    </div>
    <div class="_course_item_box">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />
      <div ref="coursePanelContainerRef" class="_course_panel_container">
        <WCoursePanel />
        <WCoursePanel />
        <WCoursePanel />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
// $
._menu_box
  background: $black
  color: #ffffff
  font-weight: bold

._page_view_box
  position: relative
  background: $black
  @media screen and (min-width: 1080px)
    height: 600px
  @media screen and (max-width: 1079px)
    height: 390px

._page_view_img_box
  transition: 10s
  opacity: 0

._page_view_img
  position: absolute
  @media screen and (min-width: 1080px)
    height: 500px
  @media screen and (max-width: 1079px)
    height: 300px

._tategaki_title_box
  position: absolute
  bottom: 0
  z-index: 1
  transition: 5s
  opacity: 0
  @media screen and (min-width: 1080px)
    right: 140px
  @media screen and (max-width: 1079px)
    right: 20px

._sakana_text_box
  text-align: center
  padding-bottom: 100px
  letter-spacing: 0.2rem

._niku_text_box
  text-align: center
  padding: 200px 0 100px 0
  letter-spacing: 0.2rem
  @media screen and (max-width: 505px)
    padding: 100px 0

._sake_text_box
  text-align: center
  padding: 200px 0 100px 0
  letter-spacing: 0.2rem
  @media screen and (max-width: 505px)
    padding: 100px 0

._course_text_box
  text-align: center
  padding: 200px 0 100px 0
  letter-spacing: 0.2rem
  @media screen and (max-width: 505px)
    padding: 100px 0


._contents_title_container_common
  width: fit-content
  text-align: center
  margin: 25px auto 100px auto
  transition: 1s
  opacity: 0

._contents_title_common
  font-size: 30px
  @media screen and (max-width: 505px)
    font-size: 24px

._contents_subtitle_common
  font-size: 16px
  @media screen and (max-width: 505px)
    font-size: 12px

._contents_text_container_common
  font-size: 16px
  line-height: 2.4rem
  padding-top: 25px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 505px)
    font-size: 14px

._sakana_item_box
  position: relative
  background-image: url(image/sw-menu-sakana-bg.jpg)
  background-size: cover
  padding: 100px 0
  z-index: 0

._niku_item_box
  position: relative
  background-image: url(image/sw-menu-niku-bg.jpg)
  background-size: cover
  padding: 100px 0
  z-index: 0

._sake_item_box
  position: relative
  background-image: url(image/sw-menu-sake-bg.jpg)
  background-size: cover
  padding: 100px 0
  z-index: 0

._course_item_box
  position: relative
  background-image: url(image/sw-menu-course-bg.jpg)
  background-size: cover
  padding: 100px 0
  z-index: 0

._course_panel_container
  display: grid
  grid-template-columns: 352px 352px 352px
  gap: 16px
  justify-content: center
  transition: 1s
  margin-top: 25px
  opacity: 0
  @media screen and (max-width: 1087px)
    grid-template-columns: 302px 302px 302px
  @media screen and (max-width: 937px)
    grid-template-columns: 302px 302px
    gap: 50px 16px
  @media screen and (max-width: 619px)
    grid-template-columns: 302px
    gap: 50px 0px

._gradient_top_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0))
  width: 100%
  height: 300px
  top: 0
  z-index: -1

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 300px
  bottom: 0
  z-index: -1

._menu_item_1_container_common
  display: flex
  width: fit-content
  margin: 0 auto  100px
  padding-left: 25px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1027px)
    display: block
  @media screen and (max-width: 665px)
    width: 100%
    margin: 0 0 50px 0
    padding-right: 37px

._menu_item_img1
  max-width: 628px
  height: 100%
  vertical-align: bottom
  @media screen and (max-width: 1123px)
    width: 592px
  @media screen and (max-width: 665px)
    width: 100%

._menu_item_text_container_common
  display: flex
  @media screen and (max-width: 1027px)
    padding-top: 25px
    justify-content: center

._menu_item_text1
  font-size: 20px
  letter-spacing: 0.2rem
  line-height: 4.3rem
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  margin-top: 50px
  margin-left: 109px
  @media screen and (max-width: 1087px)
    margin-left: 79px
  @media screen and (max-width: 1027px)
    margin-top: 25px
    margin-left: 0px
    line-height: 6rem
  @media screen and (max-width: 505px)
    font-size: 16px
    line-height: 4.2rem

._menu_item_title1
  font-size: 30px
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 0.5rem
  margin-left: 67px
  @media screen and (max-width: 1087px)
    margin-left: 37px
  @media screen and (max-width: 1027px)
    margin-left: 40px
  @media screen and (max-width: 505px)
    font-size: 24px
    margin-left: 20px

._menu_item_2_container_common
  display: flex
  flex-direction: row-reverse
  width: fit-content
  margin: 0 auto
  padding-right: 25px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1027px)
    display: block
  @media screen and (max-width: 665px)
    width: 100%

._menu_item_text2
  font-size: 20px
  letter-spacing: 0.2rem
  line-height: 4.3rem
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  margin-top: 50px
  margin-left: 68px
  @media screen and (max-width: 1087px)
    margin-left: 38px
  @media screen and (max-width: 1027px)
    line-height: 6rem
    margin-top: 25px
    margin-left: 0px
  @media screen and (max-width: 505px)
    font-size: 16px
    line-height: 4.2rem

._menu_item_title2
  font-size: 30px
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 0.5rem
  margin-left: 67px
  margin-right: 41px
  @media screen and (max-width: 1087px)
    margin-left: 37px
  @media screen and (max-width: 1027px)
    margin-right: 0px
    margin-left: 37px
  @media screen and (max-width: 665px)
    margin-right: 37px
  @media screen and (max-width: 505px)
    font-size: 24px
    margin-left: 18px

._menu_item_img2_box
  @media screen and (max-width: 665px)
    padding-left: 37px

._menu_item_img2
  max-width: 628px
  height: 100%
  vertical-align: bottom
  @media screen and (max-width: 1123px)
    width: 592px
  @media screen and (max-width: 665px)
    width: 100%
</style>
