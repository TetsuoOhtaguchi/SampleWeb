import { ref } from 'vue'
import { NewsType } from '@sw/types'
import * as validator from '@sw/utils'
/**
 * お知らせ情報の入力チェックを行う
 */
export const newsValidator = (data: NewsType) => {
  // お知らせタイトル
  if (!validator.checkNotEmpty(data.newsTitle)) {
    return {
      errorCode: '005',
      errorMsg: '※お知らせタイトルを入力してください',
      errorContentsNo: ''
    }
  }

  // お知らせ内容のエラー配列を定義する
  const contentsErrorArr = ref<
    { errorContentsNo: string; errorCode: string; errorMsg: string }[]
  >([])
  // ループ処理カウンターを定義する
  const loopCounter = ref<number>(0)
  // エラーテキスト配列を定義する
  for (const v of data.newsContents) {
    // 配列のlengthが1で、ヘッダータイトル・画像URL・お知らせ内容が全て空欄の場合
    if (
      data.newsContents.length === 1 &&
      !v.headerTitle &&
      !v.imageURL &&
      !v.contentsText
    ) {
      return {
        errorCode: '006',
        errorMsg: '※お知らせ情報を入力してください',
        errorContentsNo: ''
      }
    }

    loopCounter.value++
    // ヘッダータイトルが空欄の場合
    if (validator.checkNotEmpty(v.headerTitle)) {
      contentsErrorArr.value.push({
        errorCode: '',
        errorMsg: '',
        errorContentsNo: String(loopCounter.value)
      })
    } else {
      contentsErrorArr.value.push({
        errorCode: '007',
        errorMsg: '※ヘッダータイトルを入力してください',
        errorContentsNo: String(loopCounter.value)
      })
    }
    // ヘッダータイトルは入力されているが、お知らせ内容が空欄の場合
    if (
      validator.checkNotEmpty(v.headerTitle) &&
      validator.checkNotEmpty(v.contentsText)
    ) {
      contentsErrorArr.value.push({
        errorCode: '',
        errorMsg: '',
        errorContentsNo: String(loopCounter.value)
      })
    } else {
      contentsErrorArr.value.push({
        errorCode: '008',
        errorMsg: '※お知らせ内容を入力してください',
        errorContentsNo: String(loopCounter.value)
      })
    }
  }
  if (contentsErrorArr.value.some(d => d.errorMsg !== '')) {
    const targetContents = contentsErrorArr.value.find(d => d.errorMsg)
    return targetContents
  }

  return { errorCode: '', errorMsg: '', errorContentsNo: '' }
}
