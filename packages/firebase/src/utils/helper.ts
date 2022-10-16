/**
 * ランダムIDを生成する
 */
export const createRandomId = () => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let docId = ''
  for (var i = 0; i < 20; i++) {
    docId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return docId
}
