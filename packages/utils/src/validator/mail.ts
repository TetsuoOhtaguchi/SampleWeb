import { checkNotEmpty, checkMailAddress } from '../validator/helper'

/**
 * 入力されたメールアドレスにエラーがあるか確認
 * @param {string} mail
 * @return {string} エラーメッセージのidを返す
 */
export const mailValidator = (mail: string) => {
  // 空欄だった場合
  if (!checkNotEmpty(mail)) {
    return '003'
  }
  // 正しいメールアドレスの形式ではない場合
  if (!checkMailAddress(mail)) {
    return '004'
  }
  return ''
}
