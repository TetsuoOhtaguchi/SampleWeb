<script setup lang="ts">
import { ref } from 'vue'

// Emitの定義
const emit = defineEmits<{
  (e: 'example'): void
}>()
</script>

<template>
  <div class="_store_info_box">
    <div ref="storeInfoTitleBoxRef" class="_store_info_title_box">
      <div class="_store_info_title_container">
        <div class="_store_info_title">店舗情報</div>
      </div>
      <div class="_store_info_mini_title">Store Info</div>
    </div>

    <div class="_store_info_item_container">
      <img src="image/sw-store-info1.jpg" alt="店舗情報写真1" />
      <div class="_store_info_text_container">
        <div>
          <div class="_store_name">◯◯◯◯◯</div>
          <div class="_store_details_box_common  _address_table">
            <div class="_store_details_title_common">住所</div>
            <div>〒921-8005<br />石川県金沢市間明町2-24-3</div>
          </div>
          <div class="_store_details_box_common _open_table">
            <div class="_store_details_title_common">営業時間</div>
            <div>18:00～23:00 金土は24:00</div>
          </div>
          <div class="_store_details_box_common _close_table">
            <div class="_store_details_title_common">定休日</div>
            <div>月曜日<br />※日・月曜連休時は火曜休</div>
          </div>
          <div class="_store_details_box_common _tel_table">
            <div class="_store_details_title_common">お電話</div>
            <div>076-292-3769</div>
          </div>
          <div class="_store_details_box_common">
            <div class="_store_details_title_common">アクセス</div>
            <div>
              経路を説明します。経路を説明します。<br />経路を説明します。経路を説明します。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._store_info_box
  color: #ffffff
  height: 1731px
  padding: 100px 0
  background-image: url(image/sw-store-info-bg.jpg)
  background-size:  cover

._store_info_title_box
  color: #ffffff
  font-weight: bold
  width: fit-content
  margin: 25px auto 0 auto
//   opacity: 0
//   transition: 1s

._store_info_title_container
  display: flex
  justify-content: center

._store_info_title
  font-size: 30px
  -ms-writing-mode: tb-rl
  writing-mode: vertical-rl
  letter-spacing: 1rem
  @media screen and (max-width: 479px)
    letter-spacing: 0.8rem
    font-size: 24px

._store_info_mini_title
  font-size: 16px
  letter-spacing: 0.1rem
  @media screen and (max-width: 479px)
    font-size: 14px

._store_info_item_container
  display: grid
  grid-template-columns: 490px 490px
  gap: 108px
  justify-content: center
  margin-top: 100px

._store_info_text_container
  background: gray
  display: flex
  align-items: center

._store_name
  background: lime
  width: 490px
  font-size: 36px
  border-bottom: 1px solid #ffffff
  line-height: 4.5rem
  letter-spacing: 0.4rem
  padding: 0 10px
  margin-bottom: 50px

._store_details_box_common
  background: skyblue
  display: flex
  gap: 144px

._store_details_title_common
  background: pink
  width:  85px
  text-align-last: justify
  padding-left: 10px

._address_table
  margin-bottom: 21px

._open_table
  margin-bottom: 42px

._close_table
  margin-bottom: 21px

._tel_table
 margin-bottom: 42px
</style>
