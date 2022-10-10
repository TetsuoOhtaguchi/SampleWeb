<script setup lang="ts">
import { computed } from 'vue'
import Button from '../../../../../components/src/components/Button/Button.vue'
import CModal from '../../../components/CModal/CModal.vue'

const props = defineProps({
  /**
   * モーダルステート
   */
  modalState: { type: Boolean, default: false },
  /**
   * 画像URL
   */
  imageURL: { type: String, default: '' }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'update:modalState', val: Boolean): void
  (e: 'update:imageURL', val: String | undefined): void
}>()

const modalState = computed({
  get: () => props.modalState,
  set: value => {
    emit('update:modalState', value)
  }
})

const imageURL = computed({
  get: () => props.imageURL,
  set: value => {
    emit('update:imageURL', value)
  }
})

// ズームモーダル閉じるボタンをクリックする
const closeZoomModal = () => {
  imageURL.value = ''
  modalState.value = false
}
</script>

<template>
  <div>
    <!-- Zoomモーダル -->
    <CModal v-model="modalState">
      <q-card square class="_zoom_modal_card">
        <q-bar class="glossy _zoom_modal_bar">拡大</q-bar>
        <div class="_zoom_modal_img_box">
          <img v-if="imageURL" :src="imageURL" class="_img" />
          <img v-else src="/image/noimage.jpg" class="_img" />
        </div>

        <Button
          label="閉じる"
          design="consoleSmallSub"
          class="_zoom_modal_close_btn"
          @click="closeZoomModal"
        />
      </q-card>
    </CModal>
  </div>
</template>

<style lang="sass" scoped>
._zoom_modal_card
  width: 500px
  padding-bottom: 50px
._zoom_modal_bar
  background: $mainColor
  height: 50px
  font-weight: bold
  color: $white
._zoom_modal_img_box
  width: 500px
  height: 385px
._img
  width: 100%
  height: 100%
  object-fit: cover
._zoom_modal_close_btn
  width: 180px
  margin: 25px auto 0 auto
</style>
