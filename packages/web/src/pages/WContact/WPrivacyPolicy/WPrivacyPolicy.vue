<script setup lang="ts">
import { ref } from 'vue'

// const props = defineProps({})

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()
</script>

<template>
  <div class="_privacy_policy_box">
    <div class="_title_common">プライバシーポリシー</div>
    <div class="_pp_promise">
      当サイトをご利用するお客様のプライバシーに係る個人情報の重要性を認識し、適切に利用し、個人情報の保護に努めることをお約束いたします。
    </div>

    <div class="_item_container">
      <div class="_item_title_common">個人情報の利用目的</div>
      <div class="_item_text_common">
        当サイトでは、メールでのお問い合わせの際に、名前、メールアドレス等の個人情報を送信いただきますが、これらの個人情報は質問に対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
      </div>

      <div class="_item_title_common">個人情報の第三者への開示</div>
      <div class="_item_text_common">
        当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。<br />・情報提供者本人の同意がある場合と<br />・法令等への協力のため、開示が必要となる場合
      </div>

      <div class="_item_title_common">個人情報の訂正、削除について</div>
      <div class="_item_text_common">
        ご利用者様ご本人の要請があった場合、ご本人を確認した上で個人情報の訂正、削除を適切に行います。
      </div>

      <div class="_item_title_common">Cookieの使用について</div>
      <div class="_item_text_common">
        当サイトは、お客様によりよいサービスを提供するため、Cookie
        (クッキー)を使用することがありますが、これにより個人を特定できる情報の収集を行えるものではなく、お客様のプライバシーを侵害することはございません。また、Cookie
        (クッキー)の受け入れを希望されない場合は、ブラウザの設定で変更することができます。
      </div>

      <div class="_item_title_common">個人情報保護に関するお問い合わせ</div>
      <div class="_item_text_common">
        個人情報保護に関するお問い合わせや開示、修正、削除のご依頼がある場合は、お問い合わせフォームよりご連絡ください。
      </div>
    </div>

    <div class="_title_common _margin_top">利用規約</div>
    <div class="_item_container">
      <div class="_item_title_common">利用規約</div>
      <div class="_item_text_common">
        この利用規約（以下，「本規約」といいます。）は，ふるさと（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
      </div>

      <div class="_item_title_common">免責事項</div>
      <div class="_item_text_common">
        当サイトからリンクなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._privacy_policy_box
    max-width: 536px
    padding-top: 50px
    color: $fontColor
    text-align: justify
    text-justify: inter-ideograph

._title_common
    font-size: 20px
    font-weight: bold
    text-align: center
    margin-bottom: 30px
    @media screen and (max-width: 670px)
        font-size: 16px

._margin_top
    margin-top: 50px

._pp_promise
    margin-bottom: 30px
    @media screen and (max-width: 670px)
        font-size: 12px

._item_container
    display: grid
    gap: 15px

._item_title_common
    font-size: 16px
    border-bottom: 1px solid $fontColor
    width: fit-content
    line-height: 1rem
    @media screen and (max-width: 670px)
        font-size: 14px

._item_text_common
    @media screen and (max-width: 670px)
        font-size: 12px
</style>
