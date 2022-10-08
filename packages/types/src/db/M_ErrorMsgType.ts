import { merge } from 'merge-anything'
import { DbRecord, defaultsDbRecord } from './shared/DbRecord'
import { DeepPartial } from '../utils'

// ErrorMsgタイプフィールド
export type ErrorMsgTypeField = {
  /**エラーメッセージ */
  msg: string
}

/**
 * ErrorMsgコレクションタイプ
 */
export type ErrorMsgType = DbRecord & ErrorMsgTypeField

/**
 * ErrorMsgデータに初期値を渡す関数
 */
export function defaultsErrorMsg (
  partialErrorMsg: DeepPartial<ErrorMsgType> = {}
): ErrorMsgType {
  const defaults: ErrorMsgTypeField = {
    msg: ''
  }
  return merge(defaultsDbRecord(), defaults, partialErrorMsg as any)
  // see https://github.com/millsp/ts-toolbelt/issues/270 for why I'm casting to `any` here.
}
