import {
  checkNotEmpty,
  checkFullWidthString,
  replaceSpaceDelete
} from '../validator/helper'

/**
 * 入力された名前にエラーがあるか確認
 * @param {string} name
 * @return {string} エラーメッセージのidを返す
 */
export const nameValidator = (name: string) => {
  const target = replaceSpaceDelete(name)
  // 空欄だった場合
  if (!checkNotEmpty(target)) {
    return '001'
  }
  // 全角ひらがな、全角カタカナ、漢字のいずれかで入力されていない場合
  if (!checkFullWidthString(target)) {
    return '002'
  }
  return ''
}
