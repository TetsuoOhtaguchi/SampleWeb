import { merge } from 'merge-anything'
import { DbRecord, defaultsDbRecord } from './shared/DbRecord'
import { DeepPartial } from '../utils'

// Contactタイプフィールド
export type ContactTypeField = {
  /**ネーム */
  name: string
  /**メールアドレス */
  mail: string
  /**電話番号 */
  tel: string
  /**内容 */
  contents: string
  /**既読フラグ */
  alreadyReadFlag: boolean
}

/**
 * Contactコレクションタイプ
 */
export type ContactType = DbRecord & ContactTypeField

/**
 * Contactデータに初期値を渡す関数
 */
export function defaultsContact (
  partialContact: DeepPartial<ContactType> = {}
): ContactType {
  const defaults: ContactTypeField = {
    name: '',
    mail: '',
    tel: '',
    contents: '',
    alreadyReadFlag: false
  }
  return merge(defaultsDbRecord(), defaults, partialContact as any)
  // see https://github.com/millsp/ts-toolbelt/issues/270 for why I'm casting to `any` here.
}
