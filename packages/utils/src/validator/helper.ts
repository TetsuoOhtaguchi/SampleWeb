/**
 * 入力された値が空かチェックする
 * @param {string | number} inputVal - 入力された値
 * @return {boolean} 入力された値が空でなければtrue, 空ならfalseを返す
 */
export const checkNotEmpty = (inputVal: string | number) => !!inputVal

/**
 * 全角ひらがな、全角カタカナ、漢字のいずれかで入力されているかチェックする
 * @param {string} inputVal - 入力された値
 * @return {boolean} 値が全角ひらがな、全角カタカナ、漢字のいずれかで入力されているならtrue, そうでないならfalseを返す
 */
export const checkFullWidthString = (inputVal: string) =>
  /^[ーぁ-んァ-ン一-龥々]+$/.test(inputVal)

/**
 * 正しいメールアドレスの形式かチェックする
 * @param {string} inputVal - 入力された値
 * @return {boolean} 入力された値が正しいメールアドレスの形式ならtrue, そうでないならfalseを返す
 */
export const checkMailAddress = (inputVal: string) =>
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
    inputVal
  )

/**
 * 正しいパスワードの形式かチェックする
 * @param {string} inputVal - 入力された値
 * @return {boolean} 入力された値が正しいパスワードの形式ならtrue, そうでないならfalseを返す
 */
export const checkPassword = (inputVal: string) => /^[A-Za-z0-9]/.test(inputVal)

/**
 * 文字列の空白を消す
 * @param {string} inputVal - 入力された値
 * @return {string} 文字列の空白を消す
 */
export const replaceSpaceDelete = (inputVal: string) =>
  inputVal.replace(/\s+/g, '')

/**
 * n桁の半角数字かチェックする
 * @param {string} inputVal - 入力された値
 * @param {number} numOfDigits - 桁数の指定(省略された場合、任意の桁数とマッチ)
 * @return {boolean} 入力された値がn桁の半角数字ならtrue, そうでないならfalseを返す
 */
export const checkHalfWidthDigit = (
  inputVal: string,
  numOfDigits = 0,
  endOfRange = 0
) => {
  if (numOfDigits) {
    if (endOfRange) {
      return new RegExp(`^\\d{${numOfDigits},${endOfRange}}$`).test(inputVal)
    } else {
      return new RegExp(`^\\d{${numOfDigits}}$`).test(inputVal)
    }
  }
  return /^\d*$/.test(inputVal)
}

/**
 * 文字列の全角数字を文字列の半角数字へ変換する
 * @param {string} inputVal - "０１２３４５６７８９"
 * @return {string} "012345678"
 */
export const replaceStringHalfNum = (inputVal: string) =>
  inputVal
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
    .replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '-')
