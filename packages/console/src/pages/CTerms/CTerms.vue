<script setup lang="ts">
import CTermsText from './CTermsText/CTermsText.vue'
</script>

<template>
  <div class="_terms_box">
    <div class="_terms_title_text">利用規約</div>

    <div class="_title_border" />

    <CTermsText />
  </div>
</template>

<style lang="sass" scoped>
._terms_box
  width: 654px
  margin: 0 auto
  color: $fontColor

._terms_title_text
  font-size: 26px
  font-weight: bold
  text-align: center

._title_border
  height: 5px
  border-top: 1px solid $fontColor
  border-bottom: 1px solid $fontColor
  margin-top: 25px
</style>
