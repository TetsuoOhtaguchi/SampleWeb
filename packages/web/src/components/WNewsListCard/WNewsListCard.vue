<script setup lang="ts">
import Image from '../../../../components/src/components/Image/Image.vue'
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
    <div v-if="windowWidth < 1080" class="_news_date">
      {{ dateCreated }}
    </div>
    <Image :src="src" :alt="alt" class="_news_image" />

    <div class="_left_container">
      <div v-if="windowWidth > 1079" class="_news_date">{{ dateCreated }}</div>

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
    @media screen and (min-width: 1080px)
        display: flex
        justify-content: center
        align-items: center
        width: 936px
        height: 300px
        padding: 35px 0px
    @media screen and (max-width: 1079px)
        width: 302px
        height: 436px
        padding: 29px 0px

._news_image
    @media screen and (min-width: 1080px)
        width: 352px
        height: 226px
    @media screen and (max-width: 1079px)
        width: 244px
        height: 157px
        margin: 0 auto

._left_container
    @media screen and (min-width: 1080px)
        width: 475px
        height: 226px
        margin-left: 35px
    @media screen and (max-width: 1079px)
        width: 244px
        margin: 0 auto

._news_date
    text-align: end
    @media screen and (min-width: 1080px)
        font-size: 12px
    @media screen and (max-width: 1079px)
        font-size: 10px
        margin: 0px 29px 5px 0px

._news_title
    font-weight: bold
    @media screen and (min-width: 1080px)
        font-size: 16px
        padding: 10px 0px
    @media screen and (max-width: 1079px)
        font-size: 14px
        padding: 15px 0px 10px 0px

._news_list_border
    border-top: 1px solid #707070
    border-right: 1px solid $white
    border-bottom: 1px solid #707070
    border-left: 1px solid $white
    height: 5px
    @media screen and (min-width: 1080px)
        margin-bottom: 20px
    @media screen and (max-width: 1079px)
        margin-bottom: 15px

._news_contents
    text-align: justify
    text-justify: inter-ideograph
    display: -webkit-box
    -webkit-box-orient: vertical
    overflow: hidden
    @media screen and (min-width: 1080px)
        line-height: 2
        font-size: 14px
        -webkit-line-clamp: 5
    @media screen and (max-width: 1079px)
        line-height: 1.9
        font-size: 12px
        -webkit-line-clamp: 6
</style>
