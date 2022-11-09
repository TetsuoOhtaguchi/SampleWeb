<script setup lang="ts">
// Emitの定義
const emit = defineEmits<{
  (e: 'clickMokuji'): void
}>()
</script>

<template>
  <div class="_mokuji_container" @click="emit('clickMokuji')">
    <div class="_btn_circle_outer">
      <div class="_btn_circle_inner" />
    </div>
    <div class="_mokuji">もくじ</div>
  </div>
</template>

<style lang="sass" scoped>
._mokuji_container
    width: fit-content
    cursor: pointer

._btn_circle_outer
    border: 2px solid #787B54
    border-radius: 50px
    display: flex
    justify-content: center
    align-items: center
    margin: 0 auto
    transition: 0.3s
    @media screen and (min-width: 1080px)
        height: 34px
        width: 34px
    @media screen and (max-width: 1079px)
        height: 25px
        width: 25px

._btn_circle_inner
    border: 2px solid #787B54
    border-radius: 50px
    transition: 0.3s
    @media screen and (min-width: 1080px)
        height: 20px
        width: 20px
    @media screen and (max-width: 1079px)
        height: 14px
        width: 14px

._mokuji
    font-weight: bold
    -ms-writing-mode: tb-rl
    writing-mode: vertical-rl
    letter-spacing: 0.3rem
    margin: 12px auto 0 auto
    transition: 0.3s
    color: #787B54
    @media screen and (min-width: 1080px)
        font-size: 19px
    @media screen and (max-width: 1079px)
        font-size: 14px

._mokuji_container:hover ._btn_circle_outer
    border: 2px solid #878c45

._mokuji_container:hover ._btn_circle_inner
    border: 2px solid #878c45

._mokuji_container:hover ._mokuji
    color: #878c45
</style>
