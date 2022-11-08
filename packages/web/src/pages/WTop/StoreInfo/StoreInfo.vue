<script setup lang="ts">
import { ref, watch } from 'vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const storeInfoTitleBoxRef = ref<HTMLElement>()
const storeInfoItemContainerRef = ref<HTMLElement>()
const mapRef = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const storeInfoTitleBoxEle = storeInfoTitleBoxRef.value!
  const storeInfoItemContainerEle = storeInfoItemContainerRef.value!
  const mapEle = mapRef.value!

  if (windowWidth.value <= 468) {
    // SP表示
    if (windowScroll.value > 5750) {
      storeInfoTitleBoxEle.style.marginTop = '0px'
      storeInfoTitleBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 6000) {
      storeInfoItemContainerEle.style.marginTop = '50px'
      storeInfoItemContainerEle.style.opacity = '1'
    }
    if (windowScroll.value > 7200) {
      mapEle.style.opacity = '1'
    }
  } else {
    // PC表示
    if (windowScroll.value > 5400) {
      storeInfoTitleBoxEle.style.marginTop = '0px'
      storeInfoTitleBoxEle.style.opacity = '1'
    }
    if (windowScroll.value > 5850) {
      storeInfoItemContainerEle.style.marginTop = '100px'
      storeInfoItemContainerEle.style.opacity = '1'
    }
    if (windowScroll.value > 6600) {
      mapEle.style.opacity = '1'
    }
  }
})

const isMapWidth = ref<string>('1088')
const isMapHeight = ref<string>('490')
watch(windowWidth, () => {
  if (windowWidth.value >= 1088) {
    isMapWidth.value = '1088'
  }
  if (windowWidth.value >= 469) {
    isMapHeight.value = '490'
  }
  if (windowWidth.value < 1088) {
    isMapWidth.value = '1020'
  }
  if (windowWidth.value < 1017) {
    isMapWidth.value = '880'
  }
  if (windowWidth.value < 923) {
    isMapWidth.value = '432'
  }
  if (windowWidth.value < 469) {
    isMapWidth.value = '100%'
    isMapHeight.value = '340'
  }
})
</script>

<template>
  <div class="_store_info_box">
    <div ref="storeInfoTitleBoxRef" class="_store_info_title_box">
      <div class="_store_info_title_container">
        <div class="_store_info_title">店舗情報</div>
      </div>
      <div class="_store_info_mini_title">Store Info</div>
    </div>

    <div ref="storeInfoItemContainerRef" class="_store_info_item_container">
      <img
        src="image/sw-store-info1.jpg"
        alt="店舗情報写真1"
        class="_store_info_img"
      />
      <div class="_store_info_text_container">
        <div>
          <div class="_store_name">◯◯◯◯◯</div>
          <div class="_store_details_box_common  _address_table">
            <div class="_store_details_title_common">住所</div>
            <div>〒921-8005<br />石川県金沢市間明町2-24-3</div>
          </div>
          <div class="_store_details_box_common _open_table">
            <div class="_store_details_title_common">営業時間</div>
            <div>18:00～23:00 金土は24:00</div>
          </div>
          <div class="_store_details_box_common _close_table">
            <div class="_store_details_title_common">定休日</div>
            <div>月曜日<br />※日・月曜連休時は火曜休</div>
          </div>
          <div class="_store_details_box_common _tel_table">
            <div class="_store_details_title_common">お電話</div>
            <div>076-292-3769</div>
          </div>
          <div class="_store_details_box_common">
            <div class="_store_details_title_common">アクセス</div>
            <div>
              経路を説明します。経路を説明します。<br />経路を説明します。経路を説明します。
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- GoogleMapエリア -->
    <div ref="mapRef" class="_map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.2374072032903!2d136.66479281506528!3d36.57249638818427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff83374a1baf0b1%3A0xbb8c7a215e6a0d74!2z44Gy44GM44GX6Iy25bGL6KGX!5e0!3m2!1sja!2sjp!4v1667914286836!5m2!1sja!2sjp"
        :width="isMapWidth"
        :height="isMapHeight"
        style="border:0;"
        :allowfullscreen="false"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._store_info_box
  color: #ffffff
  padding: 100px 0
  background-image: url(image/sw-store-info-bg.jpg)
  background-size:  cover

._store_info_title_box
  color: #ffffff
  font-weight: bold
  width: fit-content
  margin: 25px auto 0 auto
  opacity: 0
  transition: 1s

._store_info_title_container
  display: flex
  justify-content: center

._store_info_title
  font-size: 30px
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 1rem
  @media screen and (max-width: 479px)
    letter-spacing: 0.8rem
    font-size: 24px

._store_info_mini_title
  font-size: 16px
  letter-spacing: 0.1rem
  @media screen and (max-width: 479px)
    font-size: 14px

._store_info_item_container
  display: grid
  grid-template-columns: 490px 490px
  gap: 108px
  justify-content: center
  transition: 1s
  margin-top: 125px
  opacity: 0
  @media screen and (max-width: 1087px)
    gap: 37px
  @media screen and (max-width: 1016px)
    grid-template-columns: 490px 360px
  @media screen and (max-width: 922px)
    display: block
    width: fit-content
    margin: 125px auto 0 auto
  @media screen and (max-width: 468px)
    padding: 0 37px
    margin-top: 75px

._store_info_img
  height: auto
  width: 490px
  vertical-align: bottom
  @media screen and (max-width: 922px)
    width: 432px
  @media screen and (max-width: 468px)
    width: 100%

._store_info_text_container
  display: flex
  align-items: center
  width: fit-content
  font-weight: bold

._store_name
  width: 490px
  font-size: 36px
  border-bottom: 1px solid #ffffff
  line-height: 4.5rem
  letter-spacing: 0.4rem
  padding: 0 10px
  margin-bottom: 50px
  @media screen and (max-width: 1016px)
    width: 360px
  @media screen and (max-width: 922px)
    width: 432px
    margin: 50px 0 30px 0
  @media screen and (max-width: 468px)
    width: calc(100vw - 74px)
    font-size: 28px
    line-height: 3rem
    padding: 0

._store_details_box_common
  display: flex
  gap: 144px
  width: fit-content
  @media screen and (max-width: 1016px)
    gap: 25px

._store_details_title_common
  width:  85px
  text-align-last: justify
  padding-left: 10px
  @media screen and (max-width: 468px)
    padding-left: 0

._address_table
  margin-bottom: 21px
  @media screen and (max-width: 468px)
    margin-bottom: 31px

._open_table
  margin-bottom: 42px
  @media screen and (max-width: 468px)
    margin-bottom: 52px

._close_table
  margin-bottom: 21px
  @media screen and (max-width: 468px)
    margin-bottom: 31px

._tel_table
 margin-bottom: 42px
 @media screen and (max-width: 468px)
    margin-bottom: 52px

._map
  display: flex
  justify-content: center
  margin-top: 100px
  transition: 1s
  opacity: 0
  @media screen and (max-width: 468px)
    padding: 0 37px
</style>
