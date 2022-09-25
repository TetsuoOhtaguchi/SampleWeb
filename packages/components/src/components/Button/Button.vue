<script setup lang="ts">
import { PropType } from 'vue'
import { Button } from './Button.types'

const props = defineProps({
  /**
   * ラベル
   * @example
   */
  label: { type: String, default: 'お品書き' },
  /**
   * デザイン
   * @example 'webNomal'
   */
  design: { type: String as PropType<Button['type']>, default: 'webNomal' },
  /**
   * 制御
   * @example true
   */
  disable: { type: Boolean, default: false }
})
</script>

<template>
  <div>
    <!-- webデザインパターン -->
    <!-- webNomal -->
    <q-btn
      v-if="design === 'webNomal' && label !== 'お知らせ一覧'"
      square
      no-caps
      flat
      :label="label"
      style="background: #ffffff"
      class="_btn _web_nomal"
    />
    <q-btn
      v-if="design === 'webNomal' && label === 'お知らせ一覧'"
      square
      no-caps
      flat
      :label="label"
      style="background: #ffffff"
      class="_btn _web_nomal_oshirase"
    />

    <!-- webTetragon -->
    <q-btn
      v-if="design === 'webTetragon'"
      square
      no-caps
      flat
      :label="label"
      :disable="disable"
      style="background: #ffffff"
      class="_btn _web_tetragon"
    />

    <!-- webOutline -->
    <q-btn
      v-if="design === 'webOutline'"
      outline
      rounded
      square
      color="dark"
      no-caps
      :label="label"
      class="_btn _web_outline"
    />

    <!-- webFooter -->
    <q-btn
      v-if="design === 'webFooter'"
      outline
      rounded
      color="white"
      no-caps
      :label="label"
      class="_btn _web_footer"
    />

    <!-- consoleデザインパターン -->
    <!-- consoleNomalMain -->
    <q-btn
      v-if="design === 'consoleNomalMain'"
      rounded
      no-caps
      color="primary"
      :label="label"
      class="glossy _btn _console_nomal"
    />

    <!-- consoleNomalSub -->
    <q-btn
      v-if="design === 'consoleNomalSub'"
      rounded
      no-caps
      color="secondary"
      :label="label"
      class="glossy _btn _console_nomal"
    />

    <!-- consoleSmallMain -->
    <q-btn
      v-if="design === 'consoleSmallMain'"
      rounded
      no-caps
      color="primary"
      :label="label"
      class="glossy _btn _console_small"
    />

    <!-- consoleSmallSub -->
    <q-btn
      v-if="design === 'consoleSmallSub'"
      rounded
      no-caps
      color="secondary"
      :label="label"
      class="glossy _btn _console_small"
    />
  </div>
</template>

<style lang="sass" scoped>
._btn
  // width: 100%
  font-weight: bold

._web_nomal
  font-family: 'ヒラギノ明朝 ProN'
  font-size: 18px
  letter-spacing: 0.3em
  @media screen and (min-width: 1080px)
    height: 70px
    width: 260px
  @media screen and (max-width: 1079px)
    height: 60px
    width: 224px
._web_nomal_oshirase
  font-family: 'ヒラギノ明朝 ProN'
  font-size: 18px
  letter-spacing: 0.3em
  @media screen and (min-width: 1080px)
    height: 70px
    width: 260px
  @media screen and (max-width: 1079px)
    letter-spacing: normal
    height: 60px
    width: 146px

._web_tetragon
  font-family: 'ヒラギノ明朝 ProN'
  font-size: 18px
  letter-spacing: 0.3em
  @media screen and (min-width: 1080px)
    height: 70px
    width: 70px
  @media screen and (max-width: 1079px)
    height: 60px
    width: 60px

._web_outline
  font-family: 'ヒラギノ明朝 ProN'
  font-size: 18px
  letter-spacing: 0.3em
  @media screen and (min-width: 1080px)
    height: 70px
    width: 260px
  @media screen and (max-width: 1079px)
    height: 60px
    width: 224px

._web_footer
  font-family: 'ヒラギノ明朝 ProN'
  @media screen and (min-width: 1080px)
    font-size: 14px
    height: 46px
    width: 218px
    letter-spacing: 0.3em
  @media screen and (max-width: 1079px)
    font-size: 18px
    height: 60px
    width: 224px
    letter-spacing: normal

._console_nomal
  font-family: 'ヒラギノ角ゴシック'
  width: 180px
  height: 60px

._console_small
  font-family: 'ヒラギノ角ゴシック'
  width: 100%
  height: 40px
</style>
