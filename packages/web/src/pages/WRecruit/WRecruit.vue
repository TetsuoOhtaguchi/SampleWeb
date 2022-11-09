<script setup lang="ts">
import { ref, watch } from 'vue'
import WPageView from '../../components/WPageView/WPageView.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const cardContainerRef = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const cardContainerEle = cardContainerRef.value!

  if (windowWidth.value <= 491) {
    // SP表示
    if (windowScroll.value > 120) {
      cardContainerEle.style.marginTop = '0px'
      cardContainerEle.style.opacity = '1'
    }
  } else {
    // PC表示
    if (windowScroll.value > 310) {
      cardContainerEle.style.marginTop = '0px'
      cardContainerEle.style.opacity = '1'
    }
  }
})
</script>

<template>
  <div class="_recruit_box">
    <WPageView
      src="sw-recruit-pageview.jpg"
      alt="採用情報ページビュー画像"
      label="採用情報"
    />

    <div class="_recruit_container">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />

      <div ref="cardContainerRef" class="_card_container">
        <q-card square class="_recruit_card">
          <div class="_title_text">①ホールスタッフ／②キッチン補助スタッフ</div>
          <div class="_title_border" />

          <div class="_contents_container_common">
            <div class="_contents_title_common">業務形態</div>
            <div class="_contents_text_common">アルバイト・準社員・正社員</div>
          </div>

          <div class="_contents_container_common">
            <div class="_contents_title_common">業務情報</div>
            <div class="_contents_text_common">
              ①お客様のご案内や注文取り、配膳、レジや片づけなどのホール業
              務全般。<br />
              ②調理補助業務。経験者優遇、より調理技術を学べる環境です。
              ※未経験者でも大歓迎！！
            </div>
          </div>

          <div class="_contents_container_common">
            <div class="_contents_title_common">勤務地</div>
            <div class="_contents_text_common">
              本店／金沢駅前店／片町店<br />
              ※ご希望勤務地をお申し付けください
            </div>
          </div>

          <div class="_contents_container_common">
            <div class="_contents_title_common">応募資格</div>
            <div class="_contents_text_common">
              16歳から35歳くらいまで
            </div>
          </div>

          <div class="_contents_container_common">
            <div class="_contents_title_common">時給</div>
            <div class="_contents_text_common">
              【本店】<br />
              時給900円～980円<br />
              ※22時以降:時給1,125円～<br />
              【駅前店】【片町店】<br />
              時給1000円～1,250円<br />
              ※22時以降:時給1,250円～<br />
              ※時給は1分単位でお支払いしています、切り捨ては一切ありません<br />
              ※準社員、正社員　150,000～350,000円・社会保険完備
            </div>
          </div>

          <div class="_contents_container_common">
            <div class="_contents_title_common">交通費</div>
            <div class="_contents_text_common">
              【本店】 <br />
              車通勤OK <br />
              【駅前店】【野々市店】 <br />
              車通勤OK、手当有り <br />
            </div>
          </div>

          <div class="_contents_container_common">
            <div class="_contents_title_common">応募方法</div>
            <div class="_contents_text_common">
              まずは電話でご連絡ください。<br />
              【電話(本店)】：076-291-XXXX<br />
              【電話(駅前店)（片町店）】：076-292-XXXX<br />
              順次面接日程をお知らせいたします。<br />
            </div>
          </div>

          <div class="_company_name_text">株式会社LIG</div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._recruit_box
  background: black
  font-color: #333333
  font-weight: bold

._recruit_container
  position: relative
  width: 100%
  background-image: url(/image/sw-news-bg.jpg)
  background-position: center center
  z-index: 0
  padding: 100px 0

._gradient_top_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0))
  width: 100%
  height: 600px
  top: 0
  z-index: -2

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 600px
  bottom: 0
  z-index: -1

._card_container
  margin-top: 25px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 491px)
    padding: 0 37px

._recruit_card
  width: 936px
  padding: 100px
  margin: 0 auto
  @media screen and (max-width: 935px)
    width: 862px
  @media screen and (max-width: 861px)
    width: 788px
  @media screen and (max-width: 787px)
    width: 714px
  @media screen and (max-width: 713px)
    width: 640px
    padding: 50px 30px
  @media screen and (max-width: 639px)
    width: 566px
  @media screen and (max-width: 565px)
    width: 492px
  @media screen and (max-width: 491px)
    width: 100%

._title_text
  font-size: 18px
  margin-bottom: 20px

._title_border
  height: 5px
  width: 100%
  border-top: 1px solid #333333
  border-bottom: 1px solid #333333
  margin-bottom: 25px

._contents_container_common
  display: flex
  gap: 210px
  align-items: center
  padding: 30px 0
  border-bottom: 1px solid #333333
  @media screen and (max-width: 639px)
    gap: 105px
  @media screen and (max-width: 491px)
    display: block
    padding: 30px 0 0 0

._contents_title_common
  width: 60px
  flex-shrink: 0
  text-align: justify
  text-align-last: justify
  text-justify: inter-ideograph
  @media screen and (max-width: 491px)
    margin-bottom: 15px

._contents_text_common
  text-align: justify
  text-justify: inter-ideograph
  line-height: 1.6rem

._company_name_text
  text-align: center
  margin-top: 25px
</style>
