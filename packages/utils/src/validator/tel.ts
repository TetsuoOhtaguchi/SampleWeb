import {
  checkNotEmpty,
  checkHalfWidthDigit,
  replaceStringHalfNum,
  replaceSpaceDelete
} from '../validator/helper'

/**
 * 入力された電話番号にエラーがあるか確認
 * @param {string} phoneNumber
 * @return {string} エラーメッセージのidを返す
 */
export const phoneNumberValidator = (phoneNumber: string) => {
  const targetPhoneNumber = replaceStringHalfNum(phoneNumber)
  const target = replaceSpaceDelete(targetPhoneNumber)
  // 空欄だった場合
  if (!checkNotEmpty(target)) {
    return '010'
  }
  // 10桁または11桁の文字列半角数字の形式になっていない
  if (!checkHalfWidthDigit(target, 10, 11)) {
    return '011'
  }
  return ''
}
