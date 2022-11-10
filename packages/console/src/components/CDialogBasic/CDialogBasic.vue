<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from '../../../../components/src/components/Button/Button.vue'

const props = defineProps({
  modelValue: { type: String, default: 'request' },
  /**
   * 行動
   * @example '公開'
   */
  action: { type: String, default: '公開' }
})

// Emitの定義
const emit = defineEmits<{
  (e: 'update:modelValue', val: String): void
  (e: 'clickConfSub'): void
  (e: 'clickClose'): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

// ダイアログ内容初期値を定義する
const dialogContentsState = ref<number>(0)
// セーブフラグ
const saveFlag = ref<boolean>(false)
const clickConfMain = () => {
  if (saveFlag.value) return
  saveFlag.value = true
  dialogContentsState.value = 1
  model.value = 'request'
}

watch(model, () => {
  if (model.value === 'request') return
  // 'request'の戻り値によって処理を分岐する
  if (model.value === 'sucsess') {
    // 処理が成功した場合
    dialogContentsState.value = 2
  } else {
    // 処理が失敗した場合
    dialogContentsState.value = 3
  }
})

const clickClose = () => {
  saveFlag.value = false
  emit('clickClose')
  dialogContentsState.value = 0
}
</script>

<template>
  <q-card square class="_dialog_basic_card">
    <!-- 確認ダイアログタイトル -->
    <q-bar v-if="dialogContentsState === 0" class="glossy _dialog_basic_bar"
      >{{ action }}確認</q-bar
    >

    <!-- 通信中ダイアログタイトル -->
    <q-bar v-if="dialogContentsState === 1" class="glossy _dialog_basic_bar"
      >{{ action }}中</q-bar
    >

    <!-- 完了ダイアログタイトル -->
    <q-bar v-if="dialogContentsState === 2" class="glossy _dialog_basic_bar"
      >{{ action }}完了</q-bar
    >

    <!-- エラーダイアログタイトル -->
    <q-bar v-if="dialogContentsState === 3" class="glossy _dialog_basic_bar"
      >{{ action }}失敗</q-bar
    >

    <div class="_dialog_basic_inner">
      <!-- 確認ダイアログ内容 -->
      <div v-if="dialogContentsState === 0">
        <div class="_dialog_basic_message">
          {{ action }}します、よろしいですか？
        </div>
        <div class="_conf_double_btn_container">
          <Button
            design="consoleSmallMain"
            :label="action"
            @click="clickConfMain"
          />
          <Button
            design="consoleSmallSub"
            label="戻る"
            @click="emit('clickConfSub')"
          />
        </div>
      </div>

      <!-- 通信中ダイアログ内容 -->
      <div v-if="dialogContentsState === 1">
        <div class="_dialog_basic_message">
          {{ action }}中です。<br />しばらくお待ちください。
        </div>
        <div class="_dialog_basic_spinner_position">
          <q-spinner-ios color="primary" size="3em" />
        </div>
      </div>

      <!-- 完了ダイアログ内容 -->
      <div v-if="dialogContentsState === 2">
        <div class="_dialog_basic_message">{{ action }}が完了しました。</div>
        <div class="_dialog_basic_close_btn">
          <Button
            design="consoleSmallSub"
            label="閉じる"
            class="_close_btn"
            @click="clickClose"
          />
        </div>
      </div>

      <!-- エラーダイアログ内容 -->
      <div v-if="dialogContentsState === 3">
        <div class="_dialog_basic_error_message">
          エラーが発生しました。<br />処理を終了します。
        </div>
        <div class="_dialog_basic_error_close_btn">
          <Button
            design="consoleSmallSub"
            label="閉じる"
            class="_close_btn"
            @click="clickClose"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<style lang="sass" scoped>
._dialog_basic_card
  width: 700px

._dialog_basic_bar
  background: $mainColor
  height: 50px
  font-weight: bold
  color: $white

._dialog_basic_inner
  padding: 50px

._dialog_basic_message
  text-align: center
  color: $mainColor
  font-weight: bold
  line-height: 2.5

._dialog_basic_error_message
  text-align: center
  color: $errorMsg
  font-weight: bold
  line-height: 2.5

._conf_double_btn_container
  display: grid
  grid-template-columns: 180px 180px
  gap: 25px
  margin-top: 70px
  justify-content: center

._dialog_basic_spinner_position
  display: flex
  justify-content: center
  margin-top: 33px

._dialog_basic_close_btn
  display: flex
  justify-content: center
  margin-top: 70px
._close_btn
  width: 180px

._dialog_basic_error_close_btn
  display: flex
  justify-content: center
  margin-top: 15px
</style>
