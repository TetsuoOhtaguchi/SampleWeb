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
  </div>
  <div class="_w_footer_under_area">
    <div class="_w_footer_company_text">
      ©&nbsp;LIG&nbsp;all&nbsp;right&nbsp;reserved.
    </div>
  </div>
</template>

<style lang="sass" scoped>
._w_footer_box
  letter-spacing: 0.1em
  background-image: url(/image/footer-image.jpg)
  background-repeat: no-repeat
  background-size: cover
  background-position: center
  padding: 100px 0
  @media screen and (max-width: 793px)
    padding: 50px 0

._w_footer_contents_container
  color: $white
  font-weight: bold
  width: 720px
  margin: 0 auto
  @media screen and (max-width: 793px)
    width: 100%
    padding: 0 37px

._contact_title
  text-align: center
  font-size: 24px
  @media screen and (max-width: 793px)
    font-size: 20px

._contact_title_sub
  text-align: center
  margin: 10px 0 25px 0
  font-size: 14px
  @media screen and (max-width: 793px)
    font-size: 12px

._contact_border_x
  border-bottom: 1px solid $white
  margin-bottom: 20px
  @media screen and (max-width: 793px)
    margin-bottom: 25px

._contact_border_x_under
  margin-top: 25px

._contact_items_container
  display: flex
  @media screen and (max-width: 793px)
    display: block

._container_common
  width: 360px
  text-align: center
  @media screen and (max-width: 793px)
    margin: 0 auto
    width: 360px
  @media screen and (max-width: 793px)
    width: 300px

._container_contact_style
  width: fit-content
  text-align: center
  margin: 0 auto

._contact_title_common
  font-size: 14px
  margin-bottom: 25px
  @media screen and (max-width: 793px)
    font-size: 12px
    margin-bottom: 20px

._tel_num_text
  font-size: 24px
  @media screen and (max-width: 793px)
    font-size: 16px

._open_time
  font-size: 12px
  @media screen and (max-width: 793px)
    font-size: 10px

._contact_border_y
  border-left: 1px solid $white
  height: 107px
  width: 1px

._w_footer_under_area
  height: 50px
  @media screen and (max-width: 793px)
    height: 40px

._w_footer_company_text
  font-size: 10px
  color: $fontColor
  text-align: center
  padding-top: 29px
  @media screen and (max-width: 793px)
    padding-top: 19px
</style>
