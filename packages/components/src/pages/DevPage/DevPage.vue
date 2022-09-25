<script setup lang="ts">
import { ref } from 'vue'
import Inputform from '../../components/Inputform/Inputform.vue'
import Button from '../../components/Button/Button.vue'
import Image from '../../components/Image/Image.vue'
import Checkbox from '../../components/Checkbox/Checkbox.vue'

// インプットフォーム
const inputformValueWeb = ref<string>('')
const inputformValueConsole = ref<string>('')
const inputformError = ref<boolean>(false)
const inputformDisable = ref<boolean>(false)
const inputformValuePwd = ref<string>('')
const isPwd = ref<boolean>(true)

// ボタン
const buttonClick = ref<string>('')
const clickWebNomal = () => {
  buttonClick.value = 'webNomal'
}
const clickWebTetragon = () => {
  buttonClick.value = 'webTetragon'
}
const clickWebOutline = () => {
  buttonClick.value = 'webOutline'
}
const clickWebFooter = () => {
  buttonClick.value = 'webFooter'
}
const clickConsoleNomalMain = () => {
  buttonClick.value = 'consoleNomalMain'
}
const clickConsoleNomalSub = () => {
  buttonClick.value = 'consoleNomalSub'
}
const clickConsoleSmallMain = () => {
  buttonClick.value = 'consoleSmallMain'
}
const clickConsoleSmallSub = () => {
  buttonClick.value = 'consoleSmallSub'
}

// チェックボックス
const checkBoxValue = ref<boolean>(false)
</script>

<template>
  <div class="_box">
    <!-- タイトルエリア -->
    <q-card
      style="background: radial-gradient(circle, #2846a8 0%, #0a1d5c 100%)"
      class="_title_card"
    >
      <div class="_title">web/console共通コンポーネント</div>
    </q-card>

    <!-- コンポーネントエリア -->
    <div class="_components_area">
      <!-- インプットフォーム -->
      <q-card class="_components_title_card">Inputform</q-card>
      <div class="_components_container">
        <!-- webノーマル -->
        <Inputform
          v-model="inputformValueWeb"
          title="メールアドレス"
          :required="true"
          placeholder="E-mail"
          design="web"
          :error="inputformError"
          :disable="inputformDisable"
        />
        <div>v-model:{{ inputformValueWeb }}</div>

        <!-- consoleノーマル -->
        <Inputform
          v-model="inputformValueConsole"
          title="メールアドレス"
          :required="true"
          placeholder="E-mail"
          design="console"
          :error="inputformError"
          :disable="inputformDisable"
        />
        <div>v-model:{{ inputformValueConsole }}</div>

        <!-- consoleパスワード -->
        <Inputform
          v-model="inputformValuePwd"
          title="パスワード"
          :required="true"
          placeholder="Password"
          design="console"
          :error="inputformError"
          :disable="inputformDisable"
          :type="isPwd ? 'password' : 'text'"
          :iconRight="isPwd ? 'visibility_off' : 'visibility'"
          @click="isPwd = !isPwd"
        />
        <div>v-model:{{ inputformValuePwd }}</div>
      </div>

      <!-- ボタン -->
      <q-card class="_components_title_card">Button</q-card>
      <div>click:{{ buttonClick }}</div>
      <div class="_components_container _btn_container">
        <Button label="お品書き" design="webNomal" @click="clickWebNomal" />
        <Button label="次" design="webTetragon" @click="clickWebTetragon" />
        <Button label="送　信" design="webOutline" @click="clickWebOutline" />
        <Button label="お問合せ" design="webFooter" @click="clickWebFooter" />
        <Button
          label="ログイン"
          design="consoleNomalMain"
          @click="clickConsoleNomalMain"
        />
        <Button
          label="戻る"
          design="consoleNomalSub"
          @click="clickConsoleNomalSub"
        />
        <Button
          label="新規登録"
          design="consoleSmallMain"
          @click="clickConsoleSmallMain"
        />
        <Button
          label="ログアウト"
          design="consoleSmallSub"
          @click="clickConsoleSmallSub"
        />
      </div>

      <!-- チェックボックス -->
      <q-card class="_components_title_card">Checkbox</q-card>
      <div class="_components_container">
        <Checkbox v-model="checkBoxValue" />
      </div>

      <!-- イメージ -->
      <q-card class="_components_title_card">Image</q-card>
      <div class="_components_container">
        <Image src="noimage02.jpg" alt="画像未登録" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._box
    background: #F4F4F4
    padding: 50px 0

._title_card
    width: fit-content
    padding: 20px
    margin: 0 auto
._title
    font-size: 30px
    font-weight: bold
    color: $white

// コンポーネントエリア
._components_area
    padding: 100px 50px

._components_title_card
    width: fit-content
    padding: 10px 20px
    font-size: 24px
    font-weight: bold
    color: $mainColor
    margin-bottom: 10px
._components_container
    padding: 20px 0
    border-bottom: 2px solid $subColor
    margin-bottom: 100px

._btn_container
  display: grid
  gap: 10px 0
</style>
