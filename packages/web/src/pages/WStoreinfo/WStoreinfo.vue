<script setup lang="ts">
import { ref, watch } from 'vue'
import WPageView from '../../components/WPageView/WPageView.vue'
import { windowWidth, windowScroll } from 'src/boot/window'

const refContainerRef1 = ref<HTMLElement>()
const refContainerRef2 = ref<HTMLElement>()
const refContainerRef3 = ref<HTMLElement>()

// スクロール処理を実行する
watch(windowScroll, () => {
  const refContainerEle1 = refContainerRef1.value!
  const refContainerEle2 = refContainerRef2.value!
  const refContainerEle3 = refContainerRef3.value!

  if (windowWidth.value <= 533) {
    // SP表示
    if (windowScroll.value > 290) {
      refContainerEle1.style.marginTop = '0px'
      refContainerEle1.style.opacity = '1'
    }
    if (windowScroll.value > 1500) {
      refContainerEle2.style.marginTop = '0px'
      refContainerEle2.style.opacity = '1'
    }
    if (windowScroll.value > 2700) {
      refContainerEle3.style.marginTop = '0px'
      refContainerEle3.style.opacity = '1'
    }
  } else {
    // PC表示
    if (windowScroll.value > 240) {
      refContainerEle1.style.marginTop = '0px'
      refContainerEle1.style.opacity = '1'
    }
    if (windowScroll.value > 1090) {
      refContainerEle2.style.marginTop = '0px'
      refContainerEle2.style.opacity = '1'
    }
    if (windowScroll.value > 1940) {
      refContainerEle3.style.marginTop = '0px'
      refContainerEle3.style.opacity = '1'
    }
  }
})
</script>

<template>
  <div class="_storeinfo_box">
    <WPageView
      src="image/sw-storeinfo-pageview.jpg"
      alt="店舗情報ページビュー画像"
      label="店舗情報"
    />

    <div class="_storeinfo_container">
      <div class="_gradient_top_common" />
      <div class="_gradient_under_common" />
      <div class="_card_container">
        <!-- 店舗1 -->
        <div ref="refContainerRef1" class="_ref_container">
          <q-card square class="_storeinfo_card_common">
            <div class="_top_container">
              <img
                src="image/sw-storeinfo1.jpg"
                alt="店舗1画像"
                class="_store_img_common"
              />

              <div class="_text_container">
                <div class="_store_name_common">◯◯◯◯◯</div>
                <div class="_store_under_bar_common" />
                <div
                  class="_store_contents_container_common _margin_bottom_small_common"
                >
                  <div class="_contents_title_common">住所</div>
                  <div>〒921-8005<br />石川県金沢市間明町2-24-3</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_large_common"
                >
                  <div class="_contents_title_common">営業時間</div>
                  <div>18:00～23:00&nbsp;金土は24:00</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_small_common"
                >
                  <div class="_contents_title_common">定休日</div>
                  <div>月曜日<br />※日・月曜連休時は火曜休</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_large_common"
                >
                  <div class="_contents_title_common">お電話</div>
                  <div>076-292-3769</div>
                </div>

                <div class="_store_contents_container_common ">
                  <div class="_contents_title_common">アクセス</div>
                  <div>
                    経路を説明します。経路を説明します。経路を説明します。経路を説明します。
                  </div>
                </div>
              </div>
            </div>
            <!-- GoogleMapエリア -->
            <div ref="mapRef" class="_map_common">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.2374072032903!2d136.66479281506528!3d36.57249638818427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff83374a1baf0b1%3A0xbb8c7a215e6a0d74!2z44Gy44GM44GX6Iy25bGL6KGX!5e0!3m2!1sja!2sjp!4v1667914286836!5m2!1sja!2sjp"
                width="100%"
                height="250"
                style="border:0;"
                :allowfullscreen="false"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </q-card>
        </div>

        <div ref="refContainerRef2" class="_ref_container">
          <!-- 店舗2 -->
          <q-card square class="_storeinfo_card_common">
            <div class="_top_container_revers">
              <div class="_text_container_revers">
                <div class="_store_name_common">◯◯◯◯◯</div>
                <div class="_store_under_bar_common" />
                <div
                  class="_store_contents_container_common _margin_bottom_small_common"
                >
                  <div class="_contents_title_common">住所</div>
                  <div>〒921-8005<br />石川県金沢市間明町2-24-3</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_large_common"
                >
                  <div class="_contents_title_common">営業時間</div>
                  <div>18:00～23:00&nbsp;金土は24:00</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_small_common"
                >
                  <div class="_contents_title_common">定休日</div>
                  <div>月曜日<br />※日・月曜連休時は火曜休</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_large_common"
                >
                  <div class="_contents_title_common">お電話</div>
                  <div>076-292-3769</div>
                </div>

                <div class="_store_contents_container_common ">
                  <div class="_contents_title_common">アクセス</div>
                  <div>
                    経路を説明します。経路を説明します。経路を説明します。経路を説明します。
                  </div>
                </div>
              </div>

              <img
                src="image/sw-storeinfo2.jpg"
                alt="店舗2画像"
                class="_store_img_revers"
              />
            </div>
            <!-- GoogleMapエリア -->
            <div ref="mapRef" class="_map_common">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.7464579091156!2d136.6495687650649!3d36.56022583887121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8347fb484edfb%3A0x79e3155c8beb85e0!2z44CSOTIwLTA5ODEg55-z5bed55yM6YeR5rKi5biC54mH55S6!5e0!3m2!1sja!2sjp!4v1667914421529!5m2!1sja!2sjp"
                width="100%"
                height="250"
                style="border:0;"
                :allowfullscreen="false"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </q-card>
        </div>

        <div ref="refContainerRef3" class="_ref_container">
          <!-- 店舗3 -->
          <q-card square class="_storeinfo_card_common">
            <div class="_top_container">
              <img
                src="image/sw-storeinfo3.jpg"
                alt="店舗3画像"
                class="_store_img_common"
              />

              <div class="_text_container">
                <div class="_store_name_common">◯◯◯◯◯</div>
                <div class="_store_under_bar_common" />
                <div
                  class="_store_contents_container_common _margin_bottom_small_common"
                >
                  <div class="_contents_title_common">住所</div>
                  <div>〒921-8005<br />石川県金沢市間明町2-24-3</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_large_common"
                >
                  <div class="_contents_title_common">営業時間</div>
                  <div>18:00～23:00&nbsp;金土は24:00</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_small_common"
                >
                  <div class="_contents_title_common">定休日</div>
                  <div>月曜日<br />※日・月曜連休時は火曜休</div>
                </div>

                <div
                  class="_store_contents_container_common _margin_bottom_large_common"
                >
                  <div class="_contents_title_common">お電話</div>
                  <div>076-292-3769</div>
                </div>

                <div class="_store_contents_container_common ">
                  <div class="_contents_title_common">アクセス</div>
                  <div>
                    経路を説明します。経路を説明します。経路を説明します。経路を説明します。
                  </div>
                </div>
              </div>
            </div>
            <!-- GoogleMapエリア -->
            <div ref="mapRef" class="_map_common">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.007022751534!2d136.6459827150655!3d36.5780485878733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff8334203bb8605%3A0x5d5df6011ebba7ea!2z6YeR5rKi6aeF!5e0!3m2!1sja!2sjp!4v1667536257809!5m2!1sja!2sjp"
                width="100%"
                height="250"
                style="border:0;"
                :allowfullscreen="false"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._storeinfo_box
  background: $black

._storeinfo_container
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
  height: 1000px
  top: 0
  z-index: -2

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 1000px
  bottom: 0
  z-index: -1

._card_container
  display: grid
  gap: 100px
  @media screen and (max-width: 533px)
    padding: 0 37px
    gap: 50px

._ref_container
  transition: 1s
  margin-top: 25px
  opacity: 0

._storeinfo_card_common
  width: 936px
  padding: 50px
  font-weight: bold
  color: #333333
  margin: 0 auto
  @media screen and (max-width: 935px)
    width: 836px
  @media screen and (max-width: 835px)
    width: fit-content
  @media screen and (max-width: 533px)
    padding: 50px 25px
    width: 100%


._top_container
  display: flex
  margin: 0 auto 50px auto
  @media screen and (max-width: 835px)
    display: block
    width: fit-content
    margin: 0 auto 25px auto
  @media screen and (max-width: 533px)
    width: 100%

._top_container_revers
  display: flex
  margin: 0 auto 50px auto
  @media screen and (max-width: 835px)
    display: flex
    flex-direction: column-reverse
    width: fit-content
    margin: 0 auto 25px auto
  @media screen and (max-width: 533px)
    width: 100%

._store_img_common
  height: 100%
  width: 352px
  vertical-align: bottom
  @media screen and (max-width: 935px)
    width: 302px
  @media screen and (max-width: 835px)
    width: 434px
    margin-bottom: 25px
  @media screen and (max-width: 533px)
    width: 100%

._store_img_revers
  height: 100%
  width: 352px
  vertical-align: bottom
  margin-left: auto
  @media screen and (max-width: 935px)
    width: 302px
  @media screen and (max-width: 835px)
    width: 434px
    margin-left: 0px
    margin-bottom: 25px
  @media screen and (max-width: 533px)
    width: 100%

._text_container
  width: 434px
  margin-left: auto
  @media screen and (max-width: 935px)
    width: 384px
  @media screen and (max-width: 835px)
    width: 434px
    margin-left: 0px
  @media screen and (max-width: 533px)
    width: 100%

._text_container_revers
  width: 434px
  @media screen and (max-width: 935px)
    width: 384px
  @media screen and (max-width: 835px)
    width: 434px
  @media screen and (max-width: 533px)
    width: 100%

._store_name_common
  font-size: 28px
  @media screen and (max-width: 935px)
    font-size: 20px

._store_under_bar_common
  height: 5px
  border-top: 1px solid #333333
  border-bottom: 1px solid #333333
  margin-bottom: 20px
  @media screen and (max-width: 935px)
    margin-bottom: 18px
  @media screen and (max-width: 533px)
    margin-bottom: 25px

._store_contents_container_common
  display: flex
  gap: 114px
  font-weight: bold
  @media screen and (max-width: 935px)
    gap: 64px
  @media screen and (max-width: 449px)
    display: block

._contents_title_common
  width: 80px
  flex-shrink: 0
  letter-spacing: 0.2rem
  text-align: justify
  text-align-last: justify
  text-justify: inter-ideograph
  font-size: 16px
  @media screen and (max-width: 935px)
    font-size: 14px
  @media screen and (max-width: 449px)
    margin-bottom: 15px

._margin_bottom_small_common
  margin-bottom: 15px
  @media screen and (max-width: 935px)
    margin-bottom: 10px
  @media screen and (max-width: 449px)
    margin-bottom: 25px

._margin_bottom_large_common
  margin-bottom: 30px
  @media screen and (max-width: 935px)
    margin-bottom: 20px
  @media screen and (max-width: 449px)
    margin-bottom: 25px

._map_common
  display: flex
  justify-content: center
</style>
