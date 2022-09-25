<script setup lang="ts">
import { computed } from 'vue'
import Button from '../../../../components/src/components/Button/Button.vue'

const props = defineProps({
  mode: { type: String, default: 'A' },
  /**
   * 現在地
   * @example 2
   */
  currentLocationNum: { type: Number, default: 1 },
  /**
   * 前disable
   * @example true
   */
  clickBackDisable: { type: Boolean, default: false },
  /**
   * 次disable
   * @example true
   */
  clickNextDisable: { type: Boolean, default: false },
  /**
   * 合計ページ数
   * @example 3
   */
  totalNumberOfPages: { type: Number, default: 1 }
})

const emit = defineEmits<{
  (e: 'update:currentLocationNum', val: Number): void
  (e: 'update:clickBackDisable', val: boolean): void
  (e: 'update:clickNextDisable', val: boolean): void
  (e: 'clickBack'): void
  (e: 'clickNext'): void
  (e: 'clickOshirase'): void
}>()

const isCurrentLocationNum = computed({
  get: () => props.currentLocationNum,
  set: value => {
    emit('update:currentLocationNum', value)
  }
})

const isClickBackDisable = computed({
  get: () => props.clickBackDisable,
  set: value => {
    emit('update:clickBackDisable', value)
  }
})

const isClickNextDisable = computed({
  get: () => props.clickNextDisable,
  set: value => {
    emit('update:clickNextDisable', value)
  }
})
</script>

<template>
  <div class="_w_page_navi_box">
    <Button
      design="webTetragon"
      label="前"
      :disable="isClickBackDisable"
      @click="emit('clickBack')"
    />

    <div v-if="mode === 'A'" class="_current_location_box">
      {{ isCurrentLocationNum }}/{{ totalNumberOfPages }}
    </div>

    <Button
      v-if="mode === 'B'"
      design="webNomal"
      label="お知らせ一覧"
      class="_oshirase_ichiran_btn"
      @click="emit('clickOshirase')"
    />

    <Button
      design="webTetragon"
      label="次"
      :disable="isClickNextDisable"
      @click="emit('clickNext')"
    />
  </div>
</template>

<style lang="sass" scoped>
._w_page_navi_box
  display: flex

._current_location_box
  background: $white
  font-size: 18px
  font-weight: bold
  letter-spacing: 0.3rem
  display: flex
  justify-content: center
  align-items: center
  @media screen and (min-width: 1080px)
    height: 70px
    width: 260px
    margin: 0 50px
  @media screen and (max-width: 1079px)
    height: 60px
    width: 146px
    margin: 0 18px

._oshirase_ichiran_btn
  @media screen and (min-width: 1080px)
    // height: 70px
    // width: 260px
    margin: 0 50px
  @media screen and (max-width: 1079px)
    // height: 60px
    // width: 146px
    margin: 0 18px
</style>
