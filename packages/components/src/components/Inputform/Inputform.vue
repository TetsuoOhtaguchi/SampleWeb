<script setup lang="ts">
import { computed, PropType } from 'vue'
import { Inputform } from './Inputform.types'

const props = defineProps({
  /**
   * 値
   * @example 'テスト', 100
   */
  modelValue: { type: [String, Number] },
  /**
   * デザイン
   * @example 'filled'
   */
  design: { type: String, default: 'web' },
  /**
   * 高さ
   * @example true or false
   */
  dense: { type: Boolean, default: false },
  /**
   * タイトル
   * @example '氏名'
   */
  title: { type: String, default: '' },
  /**
   * 必須
   * @example true or false
   */
  required: { type: Boolean, default: false },
  /**
   * プレースホルダー
   * @example 'お問合せ内容を入力してください。'
   */
  placeholder: { type: String, default: '' },
  /**
   * タイプ
   * @example 'textarea'
   */
  type: { type: String as PropType<Inputform['type']> },
  /**
   * テキストエリア行数
   * @example 100
   */
  textareaRows: { type: Number, default: 10 },
  /**
   * エラー
   * @example true or false
   */
  error: { type: Boolean, default: false },
  /**
   * 制御
   * @example true or false
   */
  disable: { type: Boolean, default: false },
  /**
   * @example 'search'
   * 左アイコン
   */
  iconLeft: { type: String, default: '' },
  /**
   * @example 'visibility'
   * 右アイコン
   */
  iconRight: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | undefined): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div>
    <div
      v-if="title"
      :class="{
        _title_web: design === 'web',
        _title_console: design === 'console'
      }"
    >
      {{ title }}<span v-if="required" class="_required">*</span>
    </div>
    <!-- web -->
    <q-input
      v-if="design === 'web'"
      outlined
      v-model="model"
      color="grey-6"
      :dense="dense"
      :placeholder="placeholder"
      :type="type"
      :rows="textareaRows"
      :class="{ _web_design: !error, _error: error }"
    />

    <!-- console -->
    <q-input
      v-if="design === 'console'"
      outlined
      v-model="model"
      color="primary"
      :dense="dense"
      :placeholder="placeholder"
      :type="type"
      :rows="textareaRows"
      :disable="disable"
      class="_console_input_common"
      :class="{ _disable: disable, _error: error }"
    >
      <!-- 左アイコン -->
      <template v-if="iconLeft" v-slot:prepend>
        <q-icon :name="iconLeft" />
      </template>

      <!-- 右アイコン -->
      <template v-if="iconRight" v-slot:append>
        <q-icon
          :name="iconRight"
          :class="{
            _password:
              iconRight === 'visibility_off' || iconRight === 'visibility'
          }"
        />
      </template>
    </q-input>
  </div>
</template>

<style lang="sass" scoped>
._title_web
    color: $fontColor
    font-weight: bold
    margin-bottom: 10px
    font-family: 'ヒラギノ明朝 ProN'
._title_console
    font-size: 12px
    font-weight: bold
    color: $mainColor
    margin-bottom: 10px
    font-family: 'ヒラギノ角ゴシック'
._required
    margin-left: 5px

._web_design
    background: #DCDCDC
    border-radius: 4px

._console_input_common
  width: 100%
  background: $white

._error
    background: #FF7E7E
    border-radius: 4px
._disable
    background: $blue-grey-2
    border-radius: 4px

._password
    cursor: pointer
</style>
