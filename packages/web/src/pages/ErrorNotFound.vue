<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>

<template>
  <div class="_error_not_found_box">
    <div class="_gradient_top_common" />
    <div class="_gradient_under_common" />

    <div class="_contents_container">
      <div class="_404_text">404</div>
      <div class="_message_text">ページが見つかりません。</div>

      <q-btn
        square
        no-caps
        flat
        text-color="black"
        style="background: #ffffff"
        label="TOP"
        class="_top_btn"
        to="/"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
._error_not_found_box
  position: relative
  background-image: url(/image/sw-oshinagaki-bg.jpg)
  background-size:  cover
  color: #ffffff
  height: 100vh
  z-index: 0

._gradient_top_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0))
  width: 100%
  height: 250px
  top: 0
  z-index: -2

._gradient_under_common
  position: absolute
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))
  width: 100%
  height: 250px
  bottom: 0
  z-index: -1

._contents_container
  position: absolute
  width: fit-content
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)

._404_text
  font-size: 200px
  font-weight: bold
  text-align: center
  @media screen and (max-width: 441px)
    font-size: 160px

._message_text
  font-size: 24px
  font-weight: bold
  text-align: center
  margin-bottom: 25px
  @media screen and (max-width: 441px)
    font-size: 22px

._top_btn
  font-weight: bold
  font-size: 18px
  letter-spacing: 0.3em
  height: 70px
  width: 100%
  @media screen and (max-width: 1079px)
    height: 60px
</style>
