import { merge } from 'merge-anything'
import { DbRecord, defaultsDbRecord } from './shared/DbRecord'
import { DeepPartial } from '../utils'

// Accountタイプフィールド
export type AccountTypeField = {
  /**ネーム */
  name: string
  /**メールアドレス */
  mail: string
  /**削除フラグ */
  deleteFlag: boolean
  /**登録日 */
  registrationDate: number
}

/**
 * Accountコレクションタイプ
 */
export type AccountType = DbRecord & AccountTypeField

/**
 * Accountデータに初期値を渡す関数
 */
export function defaultsAccount (
  partialAccount: DeepPartial<AccountType> = {}
): AccountType {
  const defaults: AccountTypeField = {
    name: '',
    mail: '',
    deleteFlag: false,
    registrationDate: 0
  }
  return merge(defaultsDbRecord(), defaults, partialAccount as any)
  // see https://github.com/millsp/ts-toolbelt/issues/270 for why I'm casting to `any` here.
}
