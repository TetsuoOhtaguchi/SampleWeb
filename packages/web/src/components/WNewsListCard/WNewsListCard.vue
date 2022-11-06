<script setup lang="ts">
import { windowWidth } from 'src/boot/window'

const props = defineProps({
  /**
   * url
   * @example 'noimage.jpg'
   */
  src: { type: String, default: 'noimage.jpg' },
  /**
   * alt
   * @example '写真未登録'
   */
  alt: { type: String, default: '写真未登録' },
  /**
   * 登録日
   * @example '2022年9月1日'
   */
  dateCreated: { type: String, default: 'YYYY年MM月DD日' },
  /**
   * お知らせタイトル
   * @example 'お知らせのタイトルが入ります'
   */
  newsTitle: { type: String, default: 'お知らせのタイトルが入ります' },
  /**
   * お知らせの内容が入ります。
   * @example 'お知らせの内容が入ります'
   */
  newsContents: { type: String, default: 'お知らせの内容が入ります。' }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()
</script>

<template>
  <div class="_news_list_card_box">
    <div v-if="windowWidth <= 699" class="_news_date">
      {{ dateCreated }}
    </div>
    <div class="_news_image_container">
      <img :src="src" :alt="alt" class="_news_image" />
    </div>

    <div class="_left_container">
      <div v-if="windowWidth > 699" class="_news_date">{{ dateCreated }}</div>

      <div class="_news_title">{{ newsTitle }}</div>

      <div class="_news_list_border" />

      <div class="_news_contents">
        {{ newsContents }}
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._news_list_card_box
  background: $white
  color: $fontColor
  display: flex
  justify-content: center
  align-items: center
  width: 936px
  height: 300px
  padding: 35px 0px
  @media screen and (max-width: 935px)
    width: 836px
  @media screen and (max-width: 835px)
    width: 700px
    height: 100%
  @media screen and (max-width: 699px)
    display: block
    width: 302px
    padding: 29px 0px

._news_image_container
  @media screen and (max-width: 935px)
    padding-left: 35px
  @media screen and (max-width: 699px)
    width: fit-content
    margin: 0 auto
    padding-left: 0px

._news_image
  object-fit: cover
  vertical-align: bottom
  width: 352px
  height: 226px
  @media screen and (max-width: 835px)
    height: 157px
    width: 244px

._left_container
  width: 475px
  height: 226px
  margin-left: 35px
  @media screen and (max-width: 935px)
    width: 100%
    padding-right: 35px
  @media screen and (max-width: 835px)
    height: 157px
  @media screen and (max-width: 699px)
    width: 244px
    margin: 0 auto
    padding-right: 0px
    height: 200px

._news_date
  text-align: end
  font-size: 12px
  @media screen and (max-width: 835px)
    font-size: 10px
  @media screen and (max-width: 699px)
    margin: 0px 29px 5px 0px

._news_title
  font-weight: bold
  font-size: 16px
  padding: 10px 0px
  @media screen and (max-width: 835px)
    font-size: 14px
    padding: 15px 0px 10px 0px

._news_list_border
  border-top: 1px solid #707070
  border-right: 1px solid $white
  border-bottom: 1px solid #707070
  border-left: 1px solid $white
  height: 5px
  margin-bottom: 20px
  @media screen and (max-width: 835px)
    margin-bottom: 15px

._news_contents
  text-align: justify
  text-justify: inter-ideograph
  display: -webkit-box
  -webkit-box-orient: vertical
  overflow: hidden
  line-height: 2
  font-size: 14px
  -webkit-line-clamp: 5
  @media screen and (max-width: 835px)
    font-size: 12px
    -webkit-line-clamp: 3
  @media screen and (max-width: 699px)
    line-height: 1.9
    -webkit-line-clamp: 6
</style>
