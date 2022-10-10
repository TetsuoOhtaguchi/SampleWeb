import { Timestamp } from '@firebase/firestore'

/**
 * 日時を生成する
 * @example '2022/12/01 12:00'
 */
export const createDate = (date: null | Date | Timestamp) => {
  if (!date) return 'error'
  if (date instanceof Timestamp) {
    date = date.toDate()
  }
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes
}
