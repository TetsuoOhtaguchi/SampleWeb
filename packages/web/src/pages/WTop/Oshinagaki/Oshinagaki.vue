<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '../../../../../components/src/components/Button/Button.vue'
import { windowWidth, windowScroll } from 'src/boot/window'
import { useRouter } from 'vue-router'

const router = useRouter()

const oshinagakiTitleBoxRef = ref<HTMLElement>()
const oshinagakiTextRef = ref<HTMLElement>()
const oshinagakiSakanaBoxRef = ref<HTMLElement>()
const oshinagakiNikuBoxRef = ref<HTMLElement>()
const oshinagakiSakeBoxRef = ref<HTMLElement>()
const oshinagakiSakanaBoxSpRef = ref<HTMLElement>()
const oshinagakiNikuBoxSpRef = ref<HTMLElement>()
const oshinagakiSakeBoxSpRef = ref<HTMLElement>()
const oshinagakiBtnContainerRef = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const oshinagakiTitleBoxEle = oshinagakiTitleBoxRef.value!
  const oshinagakiTextEle = oshinagakiTextRef.value!
  const oshinagakiSakanaBoxEle = oshinagakiSakanaBoxRef.value!
  const oshinagakiNikuBoxEle = oshinagakiNikuBoxRef.value!
  const oshinagakiSakeBoxEle = oshinagakiSakeBoxRef.value!
  const oshinagakiSakanaBoxSpEle = oshinagakiSakanaBoxSpRef.value!
  const oshinagakiNikuBoxSpEle = oshinagakiNikuBoxSpRef.value!
  const oshinagakiSakeBoxSpEle = oshinagakiSakeBoxSpRef.value!
  const oshinagakiBtnContainerEle = oshinagakiBtnContainerRef.value!

  if (windowWidth.value <= 729) {
    // SP表示
    if (windowScroll.value > 2500) {
      oshinagakiTitleBoxEle.style.marginTop = '0px'
      oshinagakiTitleBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 2700) {
      oshinagakiTextEle.style.marginTop = '69px'
      oshinagakiTextEle.style.opacity = '1'
    }
    if (windowScroll.value > 3150) {
      if (!oshinagakiSakanaBoxSpEle) return
      oshinagakiSakanaBoxSpEle.style.marginLeft = '0px'
      oshinagakiSakanaBoxSpEle.style.opacity = '1'
    }
    if (windowScroll.value > 3950) {
      if (!oshinagakiNikuBoxSpEle) return
      oshinagakiNikuBoxSpEle.style.marginRight = '0px'
      oshinagakiNikuBoxSpEle.style.opacity = '1'
    }
    if (windowScroll.value > 4800) {
      if (!oshinagakiSakeBoxSpEle) return
      oshinagakiSakeBoxSpEle.style.marginLeft = '0px'
      oshinagakiSakeBoxSpEle.style.opacity = '1'
    }
    if (windowScroll.value > 5400) {
      if (!oshinagakiBtnContainerEle) return
      oshinagakiBtnContainerEle.style.marginTop = '100px'
      oshinagakiBtnContainerEle.style.opacity = '1'
    }
  } else if (windowWidth.value <= 922) {
    // SP表示
    if (windowScroll.value > 2300) {
      oshinagakiTitleBoxEle.style.marginTop = '0px'
      oshinagakiTitleBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 2500) {
      oshinagakiTextEle.style.marginTop = '69px'
      oshinagakiTextEle.style.opacity = '1'
    }
    if (windowScroll.value > 2900) {
      if (!oshinagakiSakanaBoxSpEle) return
      oshinagakiSakanaBoxSpEle.style.marginLeft = '0px'
      oshinagakiSakanaBoxSpEle.style.opacity = '1'
    }
    if (windowScroll.value > 3800) {
      if (!oshinagakiNikuBoxSpEle) return
      oshinagakiNikuBoxSpEle.style.marginRight = '0px'
      oshinagakiNikuBoxSpEle.style.opacity = '1'
    }
    if (windowScroll.value > 4700) {
      if (!oshinagakiSakeBoxSpEle) return
      oshinagakiSakeBoxSpEle.style.marginLeft = '0px'
      oshinagakiSakeBoxSpEle.style.opacity = '1'
    }
    if (windowScroll.value > 5300) {
      if (!oshinagakiBtnContainerEle) return
      oshinagakiBtnContainerEle.style.marginTop = '100px'
      oshinagakiBtnContainerEle.style.opacity = '1'
    }
  } else {
    // PC表示
    if (windowScroll.value > 2450) {
      oshinagakiTitleBoxEle.style.marginTop = '0px'
      oshinagakiTitleBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 2700) {
      oshinagakiTextEle.style.marginTop = '69px'
      oshinagakiTextEle.style.opacity = '1'
    }
    if (windowScroll.value > 3200) {
      if (!oshinagakiSakanaBoxEle) return
      oshinagakiSakanaBoxEle.style.paddingLeft = '139px'
      oshinagakiSakanaBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 3950) {
      if (!oshinagakiNikuBoxEle) return
      oshinagakiNikuBoxEle.style.paddingRight = '139px'
      oshinagakiNikuBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 4600) {
      if (!oshinagakiSakeBoxEle) return
      oshinagakiSakeBoxEle.style.paddingLeft = '139px'
      oshinagakiSakeBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 5080) {
      if (!oshinagakiBtnContainerEle) return
      oshinagakiBtnContainerEle.style.marginTop = '100px'
      oshinagakiBtnContainerEle.style.opacity = '1'
    }
  }
})

const clickOshinagakiBtn = () => {
  void router.push('/Menu')
}
</script>

<template>
  <div class="_oshinagaki_area_box">
    <div ref="oshinagakiTitleBoxRef" class="_oshinagaki_title_box">
      <div class="_oshinagaki_title_container">
        <div class="_oshinagaki_title">お品書き</div>
      </div>
      <div class="_oshinagaki_mini_title">MENU</div>
    </div>
    <div ref="oshinagakiTextRef" class="_oshinagaki_text">
      お品書きの説明が入ります。お品書きの<br />
      説明が入ります。お品書きの説明<br />
      が入ります。お品書きの説明が入りますお品書き<br />
      の説明が入ります。お品書きの説明が入ります。
    </div>

    <!-- PC表示 -->
    <div v-if="windowWidth > 922" class="_oshinagaki_contents_container">
      <!-- 肴 -->
      <div ref="oshinagakiSakanaBoxRef" class="_oshinagaki_sakana_box">
        <img
          src="image/sw-oshinagaki-sakana.jpg"
          alt="お品書き肴画像"
          class="_oshinagaki_img_common"
        />
        <div class="_oshinagaki_contents_text_common">
          肴料理の説明が入ります。<br />肴料理の説明が入ります。肴料理の<br />説明が入ります。<br />肴料理の説明が入ります。肴料理の説明が入ります。<br />肴料理の説明が入ります。
        </div>
        <div class="_oshinagaki_contents_title_container_common">
          <div class="_oshinagaki_contents_title_common">
            肴
          </div>
          <div class="_oshinagaki_contents_subtitle_common">
            FISH
          </div>
        </div>
      </div>

      <!-- 肉 -->
      <div ref="oshinagakiNikuBoxRef" class="_oshinagaki_niku_box">
        <img
          src="image/sw-oshinagaki-niku.jpg"
          alt="お品書き肉画像"
          class="_oshinagaki_img_common"
        />
        <div class="_oshinagaki_contents_title_container_common">
          <div class="_oshinagaki_contents_title_common">
            肉
          </div>
          <div class="_oshinagaki_contents_subtitle_common">
            MEAT
          </div>
        </div>
        <div class="_oshinagaki_contents_text_common">
          肉料理の説明が入ります。<br />肉料理の説明が入ります。肉料理の<br />説明が入ります。<br />肉料理の説明が入ります。肉料理の説明が入ります。<br />肉料理の説明が入ります。
        </div>
      </div>

      <!-- 酒 -->
      <div ref="oshinagakiSakeBoxRef" class="_oshinagaki_sake_box">
        <img
          src="image/sw-oshinagaki-sake.jpg"
          alt="お品書き酒画像"
          class="_oshinagaki_img_common"
        />
        <div class="_oshinagaki_contents_text_common">
          酒の説明が入ります。<br />酒の説明が入ります。酒の<br />説明が入ります。<br />酒の説明が入ります。酒の説明が入ります。<br />酒の説明が入ります。
        </div>
        <div class="_oshinagaki_contents_title_container_common">
          <div class="_oshinagaki_contents_title_common">
            酒
          </div>
          <div class="_oshinagaki_contents_subtitle_common">
            SAKE
          </div>
        </div>
      </div>
    </div>

    <!-- SP表示 -->
    <div v-else class="_oshinagaki_box_common_sp">
      <!-- 肴 -->
      <div ref="oshinagakiSakanaBoxSpRef" class="_oshinagaki_sakana_box_sp">
        <img
          src="image/sw-oshinagaki-sakana.jpg"
          alt="お品書き肴画像"
          class="_oshinagaki_img_common"
        />
        <div class="_oshinagaki_sakana_text_container_sp">
          <div class="_oshinagaki_contents_text_common">
            肴料理の説明が入ります。<br />肴料理の説明が入ります。肴料理の<br />説明が入ります。<br />肴料理の説明が入ります。肴料理の説明が入ります。<br />肴料理の説明が入ります。
          </div>
          <div class="_oshinagaki_contents_title_container_common">
            <div class="_oshinagaki_contents_title_common">
              肴
            </div>
            <div class="_oshinagaki_contents_subtitle_common">
              FISH
            </div>
          </div>
        </div>
      </div>

      <!-- 肉 -->
      <div ref="oshinagakiNikuBoxSpRef" class="_oshinagaki_niku_box_sp">
        <img
          src="image/sw-oshinagaki-niku.jpg"
          alt="お品書き肉画像"
          class="_oshinagaki_img_common"
        />
        <div class="_oshinagaki_niku_text_container_sp">
          <div class="_oshinagaki_contents_text_common">
            肉料理の説明が入ります。<br />肉料理の説明が入ります。肉料理の<br />説明が入ります。<br />肉料理の説明が入ります。肉料理の説明が入ります。<br />肉料理の説明が入ります。
          </div>
          <div class="_oshinagaki_contents_title_container_common">
            <div class="_oshinagaki_contents_title_common">
              肉
            </div>
            <div class="_oshinagaki_contents_subtitle_common">
              MEAT
            </div>
          </div>
        </div>
      </div>

      <!-- 酒 -->
      <div ref="oshinagakiSakeBoxSpRef" class="_oshinagaki_sake_box_sp">
        <img
          src="image/sw-oshinagaki-sake.jpg"
          alt="お品書き酒画像"
          class="_oshinagaki_img_common"
        />
        <div class="_oshinagaki_sake_text_container_sp">
          <div class="_oshinagaki_contents_text_common">
            酒の説明が入ります。<br />酒の説明が入ります。酒の<br />説明が入ります。<br />酒の説明が入ります。酒の説明が入ります。<br />酒の説明が入ります。
          </div>
          <div class="_oshinagaki_contents_title_container_common">
            <div class="_oshinagaki_contents_title_common">
              酒
            </div>
            <div class="_oshinagaki_contents_subtitle_common">
              SAKE
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="oshinagakiBtnContainerRef" class="_oshinagaki_btn_container">
      <Button label="お品書き一覧" @click="clickOshinagakiBtn" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
._oshinagaki_area_box
  font-weight: bold
  padding: 100px 0
  background-image: url(image/sw-oshinagaki-bg.jpg)
  background-size:  cover

._oshinagaki_title_box
  color: #ffffff
  width: fit-content
  margin: 25px auto 0 auto
  opacity: 0
  transition: 1s

._oshinagaki_title_container
  display: flex
  justify-content: center

._oshinagaki_title
  font-size: 30px
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 1rem
  @media screen and (max-width: 479px)
    letter-spacing: 0.8rem
    font-size: 24px

._oshinagaki_mini_title
  font-size: 16px
  letter-spacing: 0.1rem
  @media screen and (max-width: 479px)
    font-size: 14px

._oshinagaki_text
  color: #ffffff
  font-size: 16px
  letter-spacing: 0.2rem
  line-height: 2rem
  margin-bottom: 100px
  text-align: center
  margin-top: 94px
  opacity: 0
  transition: 1s
  @media screen and (max-width: 479px)
    font-size: 14px
  @media screen and (max-width: 450px)
    letter-spacing: 0rem
    padding: 0 34px

// お品書きコンテンツコンテナ
._oshinagaki_contents_container
  color: #ffffff
  display: grid
  grid-auto-columns: auto
  gap: 100px

// 肴
._oshinagaki_sakana_box
  width: fit-content
  background-image: url(image/sw-oshinagaki-sakana-bg.jpg)
  background-repeat: no-repeat
  display: flex
  gap: 58px
  padding: 50px 62px 50px 114px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1227px)
    width: 1092px
    gap: 28px
  @media screen and (max-width: 1091px)
    width: 993px
  @media screen and (max-width: 992px)
    padding: 50px 62px 50px 100px
    width: 922px

._oshinagaki_box_common_sp
  color: #ffffff
  width: fit-content
  margin: 0 auto
  @media screen and (max-width: 468px)
    margin: 0
    width: 100vw

._oshinagaki_sakana_text_container_sp
  background-image: url(image/sw-oshinagaki-sakana-bg-sp.jpg)
  background-repeat: no-repeat
  background-size: cover
  width: 432px
  display: flex
  justify-content: center
  gap: 17px
  padding: 25px 0 50px 0
  @media screen and (max-width: 468px)
    width: 394px
  @media screen and (max-width: 430px)
    width: 339px
    gap: 15px

._oshinagaki_img_common
  vertical-align: bottom
  height: 100%
  width: 628px
  @media screen and (max-width: 1227px)
    width: 553px
  @media screen and (max-width: 1091px)
    width: 502px
  @media screen and (max-width: 992px)
    width: 432px
  @media screen and (max-width: 468px)
    width: 394px
  @media screen and (max-width: 430px)
    width: 339px

._oshinagaki_contents_title_container_common
  width: fit-content
  text-align: center
  height: 80px

._oshinagaki_contents_title_common
  font-size: 30px

._oshinagaki_contents_subtitle_common
  font-size: 12px
  letter-spacing: 0.2rem
  margin-top: 10px

._oshinagaki_contents_text_common
  font-size: 16px
  letter-spacing: 0.1rem
  line-height: 3rem
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  padding-top: 40px
  @media screen and (max-width: 1091px)
    font-size: 14px
    line-height: 2.4rem
    height: 420px
  @media screen and (max-width: 992px)
    height: 360px
  @media screen and (max-width: 922px)
    height: 400px
    line-height: 3rem
    padding-top: 25px
  @media screen and (max-width: 430px)
    line-height: 2.2rem

// 肉
._oshinagaki_niku_box
  width: fit-content
  background-image: url(image/sw-oshinagaki-niku-bg.jpg)
  background-repeat: no-repeat
  display: flex
  flex-direction: row-reverse
  gap: 58px
  padding: 50px 114px 50px 55px
  margin-left: auto
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1227px)
    width: 1092px
    gap: 28px
  @media screen and (max-width: 1091px)
    width: 993px
  @media screen and (max-width: 992px)
    padding: 50px 62px 50px 100px
    width: 922px

._oshinagaki_sakana_box_sp
  transition: 1s
  margin-left: 25px
  opacity: 0

._oshinagaki_niku_box_sp
  width: fit-content
  margin: 50px 25px 50px auto
  transition: 1s
  opacity: 0

._oshinagaki_sake_box_sp
  transition: 1s
  margin-left: 25px
  opacity: 0

._oshinagaki_niku_text_container_sp
  background-image: url(image/sw-oshinagaki-niku-bg-sp.jpg)
  background-repeat: no-repeat
  background-size: cover
  width: 432px
  display: flex
  justify-content: center
  gap: 17px
  padding: 25px 0 50px 0
  @media screen and (max-width: 468px)
    width: 394px
  @media screen and (max-width: 430px)
    width: 339px
    gap: 15px

// 酒
._oshinagaki_sake_box
  width: fit-content
  background-image: url(image/sw-oshinagaki-sake-bg.jpg)
  background-repeat: no-repeat
  display: flex
  gap: 58px
  padding: 50px 58px 50px 114px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 1227px)
    width: 1092px
    gap: 28px
  @media screen and (max-width: 1091px)
    width: 993px
  @media screen and (max-width: 992px)
    padding: 50px 62px 50px 100px
    width: 922px

._oshinagaki_sake_text_container_sp
  background-image: url(image/sw-oshinagaki-sake-bg-sp.jpg)
  background-repeat: no-repeat
  background-size: cover
  width: 432px
  display: flex
  justify-content: center
  gap: 17px
  padding: 25px 0 50px 0
  @media screen and (max-width: 468px)
    width: 394px
  @media screen and (max-width: 430px)
    width: 339px
    gap: 15px

._oshinagaki_btn_container
  width: fit-content
  margin: 125px auto 0 auto
  transition: 1s
  opacity: 0
</style>
