/**
 * 日付をストリングへ整形する
 * @example '2022/12/31'
 */
export const dateStringYMD = (dateNum: number) => {
  const targetString = String(dateNum)
  return (
    targetString.substring(0, 4) +
    '/' +
    targetString.substring(4, 6) +
    '/' +
    targetString.substring(6, 8)
  )
}

/**
 * 日時をストリングへ整形する
 * @example '2022/12/31 12:00
 */
export const dateStringYMDHM = (dateNum: number) => {
  const targetString = String(dateNum)
  return (
    targetString.substring(0, 4) +
    '/' +
    targetString.substring(4, 6) +
    '/' +
    targetString.substring(6, 8) +
    ' ' +
    targetString.substring(8, 10) +
    ':' +
    targetString.substring(10, 12)
  )
}
