<script setup lang="ts"></script>

<template>
  <div class="_course_panel">
    <div class="_course_name">コース名</div>

    <div class="_price">22,000円（税込）</div>

    <div class="_border" />

    <div class="_contents_text">
      コース内容の説明<br />コース内容の説明が入ります。
    </div>

    <div class="_contents_example_title">＜&nbsp;内容一例&nbsp;＞</div>

    <div class="_contents_text">
      内容の説明が入ります。<br />内容の説明が入ります。内容の説明<br />が入ります。内容の説明が入ります。<br />内容の説明が入ります。<br />内容の説明が入ります。内容の<br />説明が入ります。<br />内容の説明が入ります。
    </div>
  </div>
</template>

<style lang="sass" scoped>
._course_panel
    background: $black
    color: $white
    font-weight: bold
    border: 10px solid $white
    padding: 50px 0px
    text-align: center
    @media screen and (min-width: 1080px)
        width: 352px
    @media screen and (max-width: 1079px)
        width: 302px

._course_name
    margin-bottom: 25px
    @media screen and (min-width: 1080px)
        font-size: 28px
    @media screen and (max-width: 1079px)
        font-size: 24px

._price
    color: #787B54
    @media screen and (min-width: 1080px)
        font-size: 18px
    @media screen and (max-width: 1079px)
        font-size: 16px

._border
    height: 4px
    width: 80px
    border-top: 1px solid #787B54
    border-left: 1px solid $black
    border-bottom: 1px solid #787B54
    border-right: 1px solid $black
    margin: 25px auto

._contents_text
    line-height: 2.5

._contents_example_title
    margin: 40px 0 25px 0
</style>
