export {}

// import { auth } from '../index'
// import { sendPasswordResetEmail } from 'firebase/auth'

// /**
//  * 入力されたメールアドレスへパスワードリセットメールを送信する
//  * @param {string} mail
//  * @return {string} エラーメッセージのidを返す
//  */
// export const passwordReset = async (
//   mail: string
// ): Promise<'success' | String> => {
//   return new Promise((resolve, rejects) => {
//     sendPasswordResetEmail(auth, mail)
//       .then(() => {
//         resolve('success')
//       })
//       .catch(error => {
//         rejects(error.code)
//       })
//   })
// }
