/**
 * 保存用の日時を生成する
 * @example 202212310101
 */
export const createDateNumber = () => {
  return Number(
    String(new Date().getFullYear()) +
      ('0' + (new Date().getMonth() + 1)).slice(-2) +
      ('0' + new Date().getDate()).slice(-2) +
      ('0' + new Date().getHours()).slice(-2) +
      ('0' + new Date().getMinutes()).slice(-2) +
      ('0' + new Date().getSeconds()).slice(-2)
  )
}
