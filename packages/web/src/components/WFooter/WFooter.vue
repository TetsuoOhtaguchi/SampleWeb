<script setup lang="ts">
import { ref, watch } from 'vue'
import Image from '../../../../components/src/components/Image/Image.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { windowWidth } from 'src/boot/window'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isPath = ref<string>(route.path)

watch(route, () => {
  isPath.value = route.path
})

const clickContactBtn = () => {
  void router.push('/Contact')
}
</script>

<template>
  <div class="_w_footer_box">
    <div v-if="isPath !== '/Contact'" class="_w_footer_contents_container">
      <div class="_contact_title">お問合せ</div>

      <div class="_contact_title_sub">ご予約・お問合せはこちらから</div>

      <div class="_contact_border_x" />

      <div class="_contact_items_container">
        <div class="_container_common">
          <div class="_contact_title_common">お電話でのお問合せ</div>
          <div class="_tel_num_text">076-291-XXXX</div>
          <div class="_open_time">受付時間&nbsp;平日12:00〜23:00</div>
        </div>

        <div v-if="windowWidth > 1079" class="_contact_border_y" />
        <div
          v-if="windowWidth < 1080"
          class="_contact_border_x _contact_border_x_under"
        />

        <div class="_container_common">
          <div class="_contact_title_common">メールでのお問合せ</div>
          <Button
            label="お問合せフォームへ"
            design="webFooter"
            @click="clickContactBtn"
          />
        </div>
      </div>
    </div>

    <div v-else class="_w_footer_contents_container">
      <div class="_contact_title">お問合せ</div>

      <div class="_contact_title_sub">ご予約・お問合せはこちらから</div>

      <div class="_contact_border_x" />

      <div class="_container_contact_style">
        <div class="_contact_title_common">お電話でのお問合せ</div>
        <div class="_tel_num_text">076-291-XXXX</div>
        <div class="_open_time">受付時間&nbsp;平日12:00〜23:00</div>
      </div>
    </div>

    <div class="_black_out" />
    <Image src="footer-image.jpg" alt="東茶屋街" class="_footer_image" />
  </div>
  <div class="_w_footer_under_area">
    <div class="_w_footer_company_text">
      ©&nbsp;LIG&nbsp;all&nbsp;right&nbsp;reserved.
    </div>
  </div>
</template>

<style lang="sass" scoped>
._w_footer_box
  position: relative
  letter-spacing: 0.1em

._w_footer_contents_container
  position: absolute
  z-index: 10
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
  color: $white
  font-weight: bold
  @media screen and (min-width: 1080px)
    width: 720px
    height: 220px
  @media screen and (max-width: 1079px)
    width: 300px

._contact_title
  text-align: center
  @media screen and (min-width: 1080px)
    font-size: 24px
  @media screen and (max-width: 1079px)
    font-size: 20px

._contact_title_sub
  text-align: center
  margin: 10px 0 25px 0
  @media screen and (min-width: 1080px)
    font-size: 14px
  @media screen and (max-width: 1079px)
    font-size: 12px

._contact_border_x
  border-bottom: 1px solid $white
  @media screen and (min-width: 1080px)
    margin-bottom: 20px
  @media screen and (max-width: 1079px)
    margin-bottom: 25px

._contact_border_x_under
  margin-top: 25px

._contact_items_container
  @media screen and (min-width: 1080px)
    display: flex

._container_common
  width: 360px
  text-align: center
  @media screen and (max-width: 1079px)
    margin: 0 auto
    width: 360px
  @media screen and (max-width: 1079px)
    width: 300px

._container_contact_style
  width: fit-content
  text-align: center
  margin: 0 auto

._contact_title_common
  @media screen and (min-width: 1080px)
    font-size: 14px
    margin-bottom: 25px
  @media screen and (max-width: 1079px)
    font-size: 12px
    margin-bottom: 20px

._tel_num_text
  @media screen and (min-width: 1080px)
    font-size: 24px
  @media screen and (max-width: 1079px)
    font-size: 16px

._open_time
  @media screen and (min-width: 1080px)
    font-size: 12px
  @media screen and (max-width: 1079px)
    font-size: 10px

._contact_border_y
  border-left: 1px solid $white
  height: 107px
  width: 1px

._black_out
  position: absolute
  width: 100%
  background: $black
  opacity: 0.66
  @media screen and (min-width: 1080px)
    height: 400px
  @media screen and (max-width: 1079px)
    height: 434px


._footer_image
  @media screen and (min-width: 1080px)
    height: 400px
  @media screen and (max-width: 1079px)
    height: 434px

._w_footer_under_area
  @media screen and (min-width: 1080px)
    height: 50px
  @media screen and (max-width: 1079px)
    height: 40px

._w_footer_company_text
  font-size: 10px
  color: $fontColor
  text-align: center
  @media screen and (min-width: 1080px)
    padding-top: 29px
  @media screen and (max-width: 1079px)
    padding-top: 19px
</style>
