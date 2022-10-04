<script setup lang="ts">
import { ref, watch } from 'vue'
import { testAllNewsPostingData } from './CNewsPosting.test.data'
import { copy } from 'copy-anything'
import { useRoute, useRouter } from 'vue-router'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import CCircleBtn from '../../components/CCircleBtn/CCircleBtn.vue'
import CToggle from '../../components/CToggle/CToggle.vue'

/**
 * * 共通タイプ
 * ? 個別のタイプ情報と合わせるにはどのようにすればよいか？
 */
// type DbRecord = {
//   /**ドキュメントID */
//   id: string
//   /**登録者 */
//   userIdCreated: string
//   /**更新者 */
//   userIdUpdated: string
//   /**登録日時 */
//   dateCreated: null | Date | Timestamp
//   /**更新日時 */
//   dateUpdated: null | Date | Timestamp
// }

// お知らせ内容タイプ
type NewsContentsType = {
  headerTitle: string
  imageURL: string
  contentsText: string
}

// お知らせタイプ
type NewsType = {
  /**ドキュメントID */
  id: string
  /**登録者 */
  userIdCreated: string
  /**更新者 */
  userIdUpdated: string
  /**登録日時 */
  dateCreated: null | Date
  /**更新日時 */
  dateUpdated: null | Date

  /**お知らせタイトル */
  newsTitle: string
  /**公開フラグ */
  publicFlag: boolean
  /**削除フラグ */
  deleteFlag: boolean
  /**お知らせ内容 */
  newsContents: NewsContentsType[]
}

/**
 * * お知らせ情報を定義する
 */
const newsData = ref<NewsType>({
  id: '',
  userIdCreated: '',
  userIdUpdated: '',
  dateCreated: null,
  dateUpdated: null,
  newsTitle: '',
  publicFlag: false,
  deleteFlag: false,
  newsContents: [
    {
      headerTitle: '',
      imageURL: '',
      contentsText: ''
    }
  ]
})

const route = useRoute()
const router = useRouter()

// パラメータID
const paramsId = ref<string | string[]>(route.params.targetId)

// プラスボタン制御
const addDisable = ref<boolean>(true)

// トグル
const toggleValue = ref<boolean>(false)

// テーブルを展開した場合
if (paramsId.value !== 'newpost') {
  /**
   * * 全てのお知らせ情報配列を定義する
   */
  const allNewsPostingData = ref<NewsType[]>(copy(testAllNewsPostingData))

  // 対象のお知らせ情報を取得し、変数へ代入する
  const targetNewsData = allNewsPostingData.value.find(
    d => d.id === paramsId.value
  )
  if (targetNewsData) newsData.value = targetNewsData

  // プラスボタンの制御を解除する
  addDisable.value = false
}

watch(
  newsData,
  () => {
    // お知らせ内容配列の最後の値が全て空欄の場合、プラスボタンを制御する
    const lastObj = newsData.value.newsContents.slice(-1)[0]
    if (!lastObj.contentsText && !lastObj.headerTitle && !lastObj.imageURL) {
      addDisable.value = true
    } else {
      addDisable.value = false
    }
  },
  {
    deep: true
  }
)

// マイナスボタンをクリックする
const clickRemoveBtn = (index: number) => {
  newsData.value.newsContents.splice(index, 1)
}

// プラスボタンをクリックする
const clickAddBtn = () => {
  newsData.value.newsContents.push({
    headerTitle: '',
    imageURL: '',
    contentsText: ''
  })
}

// 削除ボタンをクリックする
const clickDeleteBtn = () => {
  console.log('削除')
}
</script>

<template>
  <div>
    <div class="_top_area_container _margin_bottom_common">
      <!-- 戻るボタン -->
      <Button
        design="consoleSmallSub"
        label="戻る"
        class="_back_btn"
        @click="router.go(-1)"
      />
      <CToggle
        v-if="paramsId !== 'newpost'"
        v-model="toggleValue"
        class="_toggle"
      />
      <div v-if="paramsId !== 'newpost'" class="_delete_btn_position">
        <CCircleBtn
          btnType="delete"
          :disable="paramsId !== 'newpost' && !toggleValue"
          @click="clickDeleteBtn"
        />
      </div>
    </div>

    <!-- 投稿エリア -->
    <!-- 投稿アイテムコンテナ -->
    <div class="_post_item_box">
      <!-- 左  -->
      <div class="_scroll_box">
        <div
          v-for="(item, index) in newsData.newsContents"
          :key="item.headerTitle"
          class="_post_item_container"
        >
          <!-- index -->
          <div class="_index_number">No.{{ index + 1 }}</div>
          <!-- プラスマイナスボタン -->
          <div class="_add_btn_position">
            <CCircleBtn
              v-if="newsData.newsContents.length !== index + 1"
              btnType="remove"
              :disable="paramsId !== 'newpost' && !toggleValue"
              @click="clickRemoveBtn(index)"
            />
            <CCircleBtn
              v-else
              btnType="add"
              :disable="(paramsId !== 'newpost' && !toggleValue) || addDisable"
              @click="clickAddBtn"
            />
          </div>

          <!-- カード -->
          <div
            class="_card"
            :class="{
              _card_margin_bottom:
                newsData.newsContents.length > 1 &&
                newsData.newsContents.length !== index + 1,
              _card_margin_bottom_last:
                newsData.newsContents.length === index + 1
            }"
          >
            <!-- ヘッダータイトル -->
            <Inputform
              v-model="item.headerTitle"
              design="console"
              dense
              title="ヘッダータイトル"
              placeholder="ヘッダーのタイトルを入力してください"
              :disable="paramsId !== 'newpost' && !toggleValue"
              class="_header_title _margin_bottom_common"
            />

            <!-- 画像コンテナ -->
            <div class="_img_container _margin_bottom_common">
              <div class="_img_box">
                <img v-if="item.imageURL" :src="item.imageURL" class="_img" />
                <img v-else src="/image/noimage.jpg" class="_img" />
              </div>
              <!-- サーチコンテナ -->
              <div class="_search_container">
                <q-icon name="search" class="_search_icon" />
                <div class="_search_text">拡大</div>
              </div>
            </div>

            <Inputform
              v-model="item.contentsText"
              design="console"
              title="お知らせ内容"
              type="textarea"
              placeholder="お知らせ内容を入力してください"
              :textareaRows="5"
              :disable="paramsId !== 'newpost' && !toggleValue"
            />
          </div>
        </div>
      </div>

      <!-- 右 -->
      <div>
        <!-- お知らせタイトル -->
        <Inputform
          v-model="newsData.newsTitle"
          design="console"
          title="お知らせタイトル"
          placeholder="お知らせのタイトルを入力してください"
          :disable="paramsId !== 'newpost' && !toggleValue"
          class="_news_title _margin_bottom_common"
        />
        <!-- 公開ボタン -->
        <div class="_btn_container_common _margin_bottom_common">
          <Button design="consoleSmallMain" label="公開" class="_public_btn" />
          <q-icon
            v-if="paramsId !== 'newpost' && newsData.publicFlag"
            name="check_circle_outlined"
            class="_public_icon"
          />
        </div>

        <!-- 未公開ボタン -->
        <div class="_btn_container_common">
          <Button
            v-if="paramsId !== 'newpost'"
            design="consoleSmallSub"
            label="未公開"
            class="_public_btn "
          />
          <q-icon
            v-if="paramsId !== 'newpost' && !newsData.publicFlag"
            name="check_circle_outlined"
            class="_undisclosed_icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
._top_area_container
  display: flex
  align-items: center

._margin_bottom_common
  margin-bottom: 25px

._back_btn
  width: 110px

._toggle
  margin-left: 25px

._delete_btn_position
  margin-left: auto

._post_item_box
  display: flex

._scroll_box
  height: calc(100vh - 287px)
  overflow: scroll
  width: 691px
  margin-right: 50px

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
  height: 412px
  border-radius: 5px
  padding: 25px
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .3)
._card_margin_bottom
  margin-bottom: 60px
._card_margin_bottom_last
  margin-bottom: 7px

._header_title
  width: 288px

._img_container
  display: flex

._img_box
  width: 137px
  height: 95px
  line-height: 0
  overflow: hidden
._img
  width: 100%
  height: 100%
  object-fit: cover

._search_container
  height: 28px
  width: fit-content
  display: flex
  align-items: center
  margin-left: 10px
  cursor: pointer
  transition: .3s
._search_container:hover
  opacity: 0.7

._search_icon
  font-size: 30px
  color: $subColor
._search_text
  font-size: 18px
  font-weight: bold
  color: $subColor
  margin-left: 5px

._space
  height: 50px
  background: red

._news_title
  width: 400px

._btn_container_common
  display: flex
  align-items: center

._public_btn
  width: 180px
._public_icon
  margin-left: 25px
  font-size: 24px
  color: #21ba45

._undisclosed_icon
  margin-left: 25px
  font-size: 24px
  color: #c10015
</style>
