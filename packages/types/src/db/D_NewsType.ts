import { merge } from 'merge-anything'
import { DbRecord, defaultsDbRecord } from './shared/DbRecord'
import { DeepPartial } from '../utils'

// News内容タイプ
type NewsContentsType = {
  headerTitle: string
  imageURL: string
  contentsText: string
}

// Newsタイプフィールド
export type NewsTypeField = {
  /**お知らせタイトル */
  newsTitle: string
  /**公開フラグ */
  publicFlag: boolean
  /**削除フラグ */
  deleteFlag: boolean
  /**お知らせ内容 */
  newsContents: NewsContentsType[]
}

/**
 * Newsコレクションタイプ
 */
export type NewsType = DbRecord & NewsTypeField

/**
 * Newsデータに初期値を渡す関数
 */
export function defaultsNews (
  partialNews: DeepPartial<NewsType> = {}
): NewsType {
  const defaults: NewsTypeField = {
    newsTitle: '',
    publicFlag: true,
    deleteFlag: false,
    newsContents: []
  }
  return merge(defaultsDbRecord(), defaults, partialNews as any)
  // see https://github.com/millsp/ts-toolbelt/issues/270 for why I'm casting to `any` here.
}
