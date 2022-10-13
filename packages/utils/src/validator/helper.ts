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
