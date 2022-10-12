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
export const loginMailValidator = (mail: string): '101' | '103' | '000' => {
  // 空欄だった場合
  if (!checkNotEmpty(mail)) {
    return '101'
  }
  // 正しいメールアドレスの形式ではない場合
  if (!checkMailAddress(mail)) {
    return '103'
  }
  return '000'
}

/**
 * ログイン時、入力されたパスワードにエラーがあるか確認
 * @param {string} password
 * @return {string} エラーメッセージのidを返す
 */
export const loginPasswordValidator = (
  password: string
): '102' | '103' | '000' => {
  // 空欄だった場合
  if (!checkNotEmpty(password)) {
    return '102'
  }
  // 正しいパスワードの形式ではない場合
  if (!checkPassword(password)) {
    return '103'
  }
  // 6桁以下の英数字だった場合
  if (password.length < 6) {
    return '103'
  }
  return '000'
}
