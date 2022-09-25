<script setup lang="ts">
const props = defineProps({
  /**
   * ラベル
   * @example 'お品書き'
   */
  label: { type: String, default: 'お品書き' },
  /**
   * ミニサイズへ変更
   * @example true
   */
  miniSize: { type: Boolean, default: false }
})
</script>

<template>
  <div :class="{ _nomal_size_box: !miniSize, _mini_size_box: miniSize }">
    {{ label }}
  </div>
</template>

<style lang="sass" scoped>
._nomal_size_box
    border: 5px solid #4E4141
    background: $white
    font-weight: bold
    color: $fontColor
    text-align: center
    -ms-writing-mode: tb-rl
    writing-mode: vertical-rl
    display: flex
    align-items: center
    letter-spacing: 0.3rem
    @media screen and (min-width: 1080px)
        width: 75px
        font-size: 28px
        padding: 38px 0px
    @media screen and (max-width: 1079px)
        width: 68px
        font-size: 24px
        padding: 30px 0px

._mini_size_box
    background: $white
    font-family: 'ヒラギノ明朝 ProN'
    font-weight: bold
    color: fontColor
    text-align: center
    -ms-writing-mode: tb-rl
    writing-mode: vertical-rl
    display: flex
    align-items: center
    letter-spacing: 0.3rem
    @media screen and (min-width: 1080px)
        border: 5px solid #4E4141
        width: 75px
        font-size: 28px
        padding: 38px 0px
    @media screen and (max-width: 1079px)
        border: 3px solid #4E4141
        width: 38px
        font-size: 16px
        padding: 30px 0px
</style>
