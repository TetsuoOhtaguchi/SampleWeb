<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * モーダルステート
   * @example true or false
   */
  modelValue: { type: Boolean, required: true }
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const modalState = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <!-- モーダル -->
  <teleport to="body">
    <transition name="modal">
      <div
        class="_modal"
        :style="'background-color: rgba(0,0,0,.5)'"
        v-show="modalState"
      >
        <div v-show="modalState" class="_modal_content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="sass" scoped>
// $

.modal-enter-avtive,.modal-leave-active
  opacity: 1
  transition: 0.5s
.modal-enter-from,.modal-leave-to
  opacity: 0

._modal
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  // display: flex
  // flex-direction: column
  // align-items: center
  // justify-content: center
  transition: 0.5s

._modal_content
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  -webkit-transform: translate(-50%, -50%)
  -ms-transform: translate(-50%, -50%)
  // display: flex
  // flex-direction: column
  // align-items: center
  // justify-content: center
  // width: auto
  // height: auto

// バー
// ._bar
//   background: $mainColor
//   width: 100%

// // ダイアログのタイトル
// ._title
//   color: $white
</style>
