<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { defaultsNews, NewsType } from '@sw/types'
import { useRoute, useRouter } from 'vue-router'
import {
  allNewsData,
  setNews,
  createRandomId,
  storage,
  randomName,
  easyUpload
} from '@sw/firebase'
import { copy } from 'copy-anything'
// import { createDate } from '../../modules/date/createDate'
import CZoomModal from './CZoomModal/CZoomModal.vue'
import CModal from '../../components/CModal/CModal.vue'
import CDialogBasic from '../../components/CDialogBasic/CDialogBasic.vue'
import CCircleBtn from '../../components/CCircleBtn/CCircleBtn.vue'
import CToggle from '../../components/CToggle/CToggle.vue'
import Inputform from '../../../../components/src/components/Inputform/Inputform.vue'
import Button from '../../../../components/src/components/Button/Button.vue'
import { newsValidator } from './validator'

const route = useRoute()
const router = useRouter()

// パラメータID
const paramsId = ref<string | string[]>(route.params.targetId)

// プラスボタン制御
const addDisable = ref<boolean>(true)

// トグル
const toggleValue = ref<boolean>(false)

// ダイアログのアクション
const action = ref<string>('')

// スクロールボックスref
const scrollBox = ref<HTMLElement>()

// お知らせ情報初期値
const defaultNewsData = ref<NewsType>(defaultsNews())

/**
 * * お知らせ情報
 */
const newsData = computed(() => {
  let target
  if (paramsId.value === 'newpost') {
    target = defaultNewsData.value
  } else if (paramsId.value !== 'newpost' && !allNewsData.value[0]) {
    target = defaultNewsData.value
  } else {
    target = allNewsData.value.find(d => d.id === paramsId.value)

    addDisable.value = false
  }
  return target!
})

// 新規投稿を展開した場合
if (paramsId.value === 'newpost') {
  // お知らせ配列へお知らせ内容初期値を追加する
  newsData.value.newsContents.push({
    headerTitle: '',
    imageURL: '',
    contentsText: ''
  })
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
  // 配列の数が変更した場合のエラー表示を以下条件によって切り替える
  if (index === Number(isErrorContentsNo.value) - 1) {
    isErrorCode.value = ''
    isErrorMsg.value = ''
    isErrorContentsNo.value = ''
  }
  if (index < Number(isErrorContentsNo.value) - 1) {
    isErrorContentsNo.value = String(Number(isErrorContentsNo.value) - 1)
  }
}

// プラスボタンをクリックする
const clickAddBtn = () => {
  newsData.value.newsContents.push({
    headerTitle: '',
    imageURL: '',
    contentsText: ''
  })
  // スクロール処理
  const el = scrollBox.value!
  setTimeout(() => {
    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth'
    })
  }, 0)
}

// 画像アップロード処理
// 操作したindexを定義する
let targetIndex = 0
const inputFile = ref<any>()
const imgFileArr = ref<{ url: string; file: File }[]>([])
// 画像をクリックする
const clickImage = (e: any) => {
  if (paramsId.value !== 'newpost' && !toggleValue.value) return
  // 対象の配列を定義する
  const targetArr = Array.from(
    e.target.closest('._scroll_box').querySelectorAll('._post_item_container')
  )
  // クリックしたindexを変数へ代入する
  targetIndex = targetArr.findIndex(
    d => d === e.target.closest('._post_item_container')
  )
  // ファイル選択を起動する
  e.target
    .closest('._post_item_box')
    .querySelector('._input_file')
    .click()
}
// 画像をアップロードする
const uploadImg = (e: any) => {
  const targetUrl = URL.createObjectURL(inputFile.value.files[0])
  const targetFile = inputFile.value.files[0]

  imgFileArr.value.push({ url: targetUrl, file: targetFile })

  newsData.value.newsContents[targetIndex].imageURL = targetUrl
  e.target.value = ''
}

// ズームモーダルステータスとズームモーダルイメージURLを定義する
const zoomModalState = ref<boolean>(false)
const zoomModalImageUrl = ref<string>('')
// ズームアイコンをクリックする
const clickZoomIcon = (imageURL: string) => {
  if (paramsId.value !== 'newpost' && !toggleValue.value) return
  zoomModalImageUrl.value = imageURL
  zoomModalState.value = true
}

// 戻るボタンをクリック
const clickBackPage = () => {
  void router.push('/News')
}

/**
 * * Firestore保存処理を行う
 */
const dialogBasicState = ref<boolean>(false)
// 公開フラグ
const isPublicFlag = ref<boolean>(true)
// 削除フラグ
const isDeleteFlag = ref<boolean>(false)

// エラー値
const isErrorCode = ref<string>('')
const isErrorMsg = ref<string>('')
const isErrorContentsNo = ref<string>('')

// 公開処理
const clickPublic = () => {
  if (paramsId.value !== 'newpost' && !toggleValue.value) return
  // 入力チェックを行う
  const newsErrorObj = newsValidator(newsData.value)
  if (newsErrorObj) {
    isErrorCode.value = newsErrorObj.errorCode
    isErrorMsg.value = newsErrorObj.errorMsg
    isErrorContentsNo.value = newsErrorObj.errorContentsNo
  }
  // エラーコードとエラーメッセージが存在した場合処理を終了する
  if (isErrorCode.value && isErrorMsg.value) return

  // エラーが存在しない場合、公開処理を行う
  action.value = '公開'
  isPublicFlag.value = true
  dialogBasicState.value = true
}
// 非公開処理
const clickPrivate = () => {
  if (!toggleValue.value) return
  // 入力チェックを行う
  const newsErrorObj = newsValidator(newsData.value)
  if (newsErrorObj) {
    isErrorCode.value = newsErrorObj.errorCode
    isErrorMsg.value = newsErrorObj.errorMsg
    isErrorContentsNo.value = newsErrorObj.errorContentsNo
  }
  // エラーコードとエラーメッセージが存在した場合処理を終了する
  if (isErrorCode.value && isErrorMsg.value) return

  action.value = '非公開'
  isPublicFlag.value = false
  dialogBasicState.value = true
}
// 削除処理
const clickDelete = () => {
  if (!toggleValue.value) return
  action.value = '削除'
  isDeleteFlag.value = true
  dialogBasicState.value = true
}
const clickConfSub = () => {
  // ダイアログを閉じる
  dialogBasicState.value = false
}

// 保存処理リクエスト
const isRequest = ref<string>('')
watch(isRequest, async () => {
  if (isRequest.value === 'request') {
    // 公開フラグを変数へ代入する
    newsData.value.publicFlag = isPublicFlag.value
    // 削除フラグを変数へ代入する
    newsData.value.deleteFlag = isDeleteFlag.value

    // 登録日と更新日を変数へ代入する
    if (!newsData.value.dateCreated) {
      // 新規
      newsData.value.dateCreated = new Date()
    } else {
      // 更新
      newsData.value.dateUpdated = new Date()
    }

    // お知らせタイトル・ヘッダータイトルの前後の空白を削除する
    newsData.value.newsTitle = newsData.value.newsTitle.trim()
    newsData.value.newsContents = newsData.value.newsContents.map(d => {
      d.headerTitle = d.headerTitle.trim()
      return d
    })

    if (paramsId.value === 'newpost') newsData.value.id = createRandomId()

    // 保存用の画像URL配列
    const targetNewsContentsURL = await Promise.all(
      copy(newsData.value.newsContents).map(d => {
        const target = imgFileArr.value.find(v => v.url === d.imageURL)!

        return easyUpload(
          storage,
          `newsContents/${newsData.value.id}/${randomName(20, target.file)}`,
          target.file
        )
      })
    )
    // 保存用の画像URLにindexプロパティを付与する
    const imageUrlArr = ref<{ index: number; url: string }[]>([])
    targetNewsContentsURL.map((d, index) => {
      imageUrlArr.value.push({ index: index, url: d })
      return d
    })
    // 保存用のURLを変数へ代入する
    newsData.value.newsContents.map((d, index) => {
      const target = imageUrlArr.value.find(v => v.index === index)!
      d.imageURL = target.url
      return d
    })

    /**
     * todo firestoreへ情報を登録する
     */
    setNews('D_News', newsData.value)
      .then(() => {
        isRequest.value = 'sucsess'
        toggleValue.value = false
      })
      .catch(e => {
        console.log(e, 'error')
        isRequest.value = 'error'
      })
  }
})
const clickClose = () => {
  // 以下の条件でお知らせページへ遷移する
  if (paramsId.value === 'newpost') void router.push('/News')
  if (newsData.value.deleteFlag) void router.push('/News')
  // ダイアログを閉じる
  dialogBasicState.value = false
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
        @click="clickBackPage"
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
          @click="clickDelete"
        />
      </div>
    </div>

    <!-- 投稿エリア -->
    <!-- 投稿アイテムコンテナ -->
    <div class="_post_item_box">
      <!-- 左  -->
      <div ref="scrollBox" class="_scroll_box">
        <input
          ref="inputFile"
          type="file"
          class="_input_file"
          accept="image/*"
          @change="uploadImg"
        />
        <div
          v-for="(item, index) in newsData.newsContents"
          :key="index"
          class="_post_item_container"
        >
          <!-- index -->
          <div class="_index_number">No.{{ index + 1 }}</div>
          <!-- プラスマイナスボタン -->
          <div class="_circle_btn_position_common">
            <CCircleBtn
              v-if="index !== 0"
              btnType="remove"
              :disable="paramsId !== 'newpost' && !toggleValue"
              @click="clickRemoveBtn(index)"
            />
            <CCircleBtn
              btnType="add"
              :disable="(paramsId !== 'newpost' && !toggleValue) || addDisable"
              @click="clickAddBtn()"
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
              :error="
                (isErrorCode === '006' &&
                  index + 1 === Number(isErrorContentsNo)) ||
                  (isErrorCode === '007' &&
                    index + 1 === Number(isErrorContentsNo))
              "
              class="_header_title _margin_bottom_common"
            />

            <!-- 画像コンテナ -->
            <div class="_img_container _margin_bottom_common">
              <div
                class="_img_box"
                :class="{
                  _img_box_disable: paramsId !== 'newpost' && !toggleValue
                }"
                @click="clickImage"
              >
                <div
                  v-if="
                    isErrorCode === '006' &&
                      index + 1 === Number(isErrorContentsNo)
                  "
                  class="_error_img"
                />
                <img
                  v-if="item.imageURL"
                  :src="item.imageURL"
                  class="_img"
                  :class="{
                    _disable_img: paramsId !== 'newpost' && !toggleValue
                  }"
                />
                <img
                  v-else
                  src="/image/noimage.jpg"
                  class="_img"
                  :class="{
                    _disable_img: paramsId !== 'newpost' && !toggleValue
                  }"
                />
              </div>

              <!-- ズームコンテナ -->
              <div
                class="_zoom_container"
                :class="{
                  _zoom_container_disable:
                    paramsId !== 'newpost' && !toggleValue
                }"
                @click="clickZoomIcon(item.imageURL)"
              >
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
              :error="
                (isErrorCode === '006' &&
                  index + 1 === Number(isErrorContentsNo)) ||
                  (isErrorCode === '008' &&
                    index + 1 === Number(isErrorContentsNo))
              "
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
          :error="isErrorCode === '005'"
          class="_news_title _margin_bottom_common"
        />
        <!-- 公開ボタン -->
        <div class="_btn_container_common _margin_bottom_common">
          <Button
            design="consoleSmallMain"
            label="公開"
            :disable="paramsId !== 'newpost' && !toggleValue"
            class="_public_btn"
            @click="clickPublic"
          />
          <q-icon
            v-if="paramsId !== 'newpost' && newsData.publicFlag"
            name="check_circle_outlined"
            class="_public_icon"
          />
        </div>

        <!-- 非公開ボタン -->
        <div
          class="_btn_container_common"
          :class="{ _margin_bottom_common: paramsId !== 'newpost' }"
        >
          <Button
            v-if="paramsId !== 'newpost'"
            design="consoleSmallSub"
            label="非公開"
            :disable="paramsId !== 'newpost' && !toggleValue"
            class="_public_btn"
            @click="clickPrivate"
          />
          <q-icon
            v-if="paramsId !== 'newpost' && !newsData.publicFlag"
            name="check_circle_outlined"
            class="_undisclosed_icon"
          />
        </div>

        <div
          v-if="
            paramsId !== 'newpost' &&
              Number(newsData.dateCreated) === Number(newsData.dateUpdated)
          "
          class="_release_date"
          :class="{ _margin_bottom_common: paramsId !== 'newpost' }"
        >
          公開日時&ensp;{{ newsData.dateCreated }}
        </div>
        <div
          v-else-if="
            paramsId !== 'newpost' &&
              newsData.publicFlag &&
              Number(newsData.dateCreated) < Number(newsData.dateUpdated)
          "
          class="_release_date"
          :class="{ _margin_bottom_common: paramsId !== 'newpost' }"
        >
          公開日時&ensp;{{ newsData.dateUpdated }}
        </div>
        <div
          v-else-if="!newsData.publicFlag"
          class="_private"
          :class="{ _margin_bottom_common: paramsId !== 'newpost' }"
        >
          非公開
        </div>

        <!-- エラーメッセージ -->
        <div v-if="isErrorMsg" class="_error_msg">
          {{ isErrorMsg }}
        </div>
      </div>
    </div>

    <!-- Zoomモーダル -->
    <CZoomModal
      v-model:modalState="zoomModalState"
      v-model:imageURL="zoomModalImageUrl"
    />

    <!-- Baseモーダル -->
    <CModal v-model="dialogBasicState">
      <CDialogBasic
        v-model="isRequest"
        :action="action"
        @clickConfSub="clickConfSub"
        @clickClose="clickClose"
      />
    </CModal>
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

._circle_btn_position_common
  position: absolute
  bottom: 0
  left: 625px
  display: grid
  gap: 25px

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
  position: relative
  width: 137px
  height: 95px
  cursor: pointer

._img_box_disable
  cursor: not-allowed
._img
  width: 100%
  height: 100%
  object-fit: cover
._disable_img
  opacity: 0.7
._error_img
  position: absolute
  width: 100%
  height: 100%
  background: #FF7E7E
  opacity: 0.7

._input_file
  display: none

._zoom_container
  height: 28px
  width: fit-content
  display: flex
  align-items: center
  margin-left: 10px
  cursor: pointer
  transition: .3s
._zoom_container:hover
  opacity: 0.7
._zoom_container_disable
  opacity: 0.7
  cursor: not-allowed

._search_icon
  font-size: 30px
  color: $subColor
._search_text
  font-size: 18px
  font-weight: bold
  color: $subColor
  margin-left: 5px

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

._release_date
  color: $mainColor
  font-size: 12px

._private
  color: $subColor
  font-size: 12px
  opacity: 0.7

._error_msg
  font-size: 12px
  font-weight: bold
  color: $errorMsg
  // margin-top: 25px
</style>
