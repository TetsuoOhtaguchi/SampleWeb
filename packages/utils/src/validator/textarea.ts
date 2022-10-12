import { checkNotEmpty } from '../validator/helper'

/**
 * 入力されたテキストエリアにエラーがあるか確認（空白入力可能）
 * @param {string} text
 * @return {string} エラーメッセージのidを返す
 */
export const textareaValidator = (text: string): '001' | '000' => {
  // 空欄だった場合
  if (!checkNotEmpty(text)) {
    return '001'
  }
  return '000'
}
