import {
  checkNotEmpty,
  checkMailAddress,
  checkPassword
} from '../validator/helper'

/**
 * ログイン時、入力されたメールアドレスにエラーがあるか確認
 * @param {string} mail
 * @return {string} エラーメッセージのidを返す
 */
export const loginMailValidator = (mail: string) => {
  // 空欄だった場合
  if (!checkNotEmpty(mail)) {
    return '※入力情報に誤りがあります'
  }
  // 正しいメールアドレスの形式ではない場合
  if (!checkMailAddress(mail)) {
    return '※入力情報に誤りがあります'
  }
  return ''
}

/**
 * ログイン時、入力されたパスワードにエラーがあるか確認
 * @param {string} password
 * @return {string} エラーメッセージのidを返す
 */
export const loginPasswordValidator = (password: string) => {
  // 空欄だった場合
  if (!checkNotEmpty(password)) {
    return '※入力情報に誤りがあります'
  }
  // 正しいパスワードの形式ではない場合
  if (!checkPassword(password)) {
    return '※入力情報に誤りがあります'
  }
  // 6桁以下の英数字だった場合
  if (password.length < 6) {
    return '※入力情報に誤りがあります'
  }
  return ''
}
