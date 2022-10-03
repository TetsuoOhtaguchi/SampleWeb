<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import Image from '../../../../components/src/components/Image/Image.vue'
import CCircleBtn from '../../components/CCircleBtn/CCircleBtn.vue'

const route = useRoute()
const router = useRouter()

// パラメータID
const paramsId = ref<string | string[]>(route.params.targetId)
console.log(paramsId.value)
</script>

<template>
  <div>
    <!-- 戻るボタン -->
    <Button
      design="consoleSmallSub"
      label="戻る"
      class="_back_btn _margin_bottom_common"
      @click="router.go(-1)"
    />

    <!-- 投稿エリア -->
    <!-- 投稿アイテムコンテナ -->
    <div class="_post_item_box">
      <div class="_scroll_box">
        <div class="_post_item_container">
          <!-- index -->
          <div class="_index_number">No.1</div>
          <!-- 追加ボタン -->
          <div class="_add_btn_position">
            <CCircleBtn btnType="add" />
          </div>

          <!-- カード -->
          <div class="_card">
            <!-- ヘッダータイトル -->
            <Inputform
              design="console"
              dense
              title="ヘッダータイトル"
              class="_header_title _margin_bottom_common"
            />
            <!-- 画像コンテナ -->
            <Image />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._margin_bottom_common
  margin-bottom: 25px

._back_btn
  width: 110px

._post_item_box

._scroll_box
  background: skyblue
  height: calc(100vh - 285px)
  overflow: scroll
  width: 691px

._post_item_container
  position: relative

._index_number
  color: $mainColor
  font-weight: bold
  position: absolute
  left: 625px

._add_btn_position
  position: absolute
  bottom: 0
  left: 625px

._card
  background: #EBEBEB
  width: 604px
  height: 421px
  border-radius: 5px
  padding: 25px

._header_title
  width: 288px

._image
  width: 137px
  height: 95px
</style>
