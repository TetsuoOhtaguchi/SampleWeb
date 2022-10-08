import { Timestamp } from 'firebase/firestore'
import { DeepPartial } from '../../utils'
import { merge } from 'merge-anything'

/**
 * 共通Type情報
 */
export type DbRecord = {
  id: string
  userIdCreated: string
  userIdUpdated: string
  dateCreated: null | Date | Timestamp
  dateUpdated: null | Date | Timestamp
}

/**
 * 共通項目に初期値を渡す関数
 * @param  {DeepPartial<DbRecord>={}} partialDbRecord
 * @returns DbRecord
 */
export function defaultsDbRecord (
  partialDbRecord: DeepPartial<DbRecord> = {}
): DbRecord {
  const defaults: DbRecord = {
    id: '',
    userIdCreated: '',
    userIdUpdated: '',
    dateCreated: null,
    dateUpdated: null
  }
  return merge(defaults, partialDbRecord as any)
  // see https://github.com/millsp/ts-toolbelt/issues/270 for why I'm casting to `any` here.
}
