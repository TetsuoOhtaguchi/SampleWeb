/**
 * 日時を生成する
 * @example '2022/12/01 12:00'
 */
export const createDate = (date: Date) => {
  if (date)
    return (
      date.getFullYear() +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + date.getDate()).slice(-2) +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2)
    )
}
