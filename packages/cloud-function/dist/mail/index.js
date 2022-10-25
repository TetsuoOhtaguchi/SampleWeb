'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.createAccountAuth = exports.sendMail = void 0
const functions = require('firebase-functions')
const firebase_functions_1 = require('firebase-functions')
const init_1 = require('./init')
const admin = require('firebase-admin')
const createPass_1 = require('../helper/createPass')
/**
 * メール送信
 * @param {*} data SendMailOptions
 * @returns 'success'
 */
exports.sendMail = functions
  .region('asia-northeast1')
  .https.onCall(async (option, context) => {
    try {
      return await (0, init_1.sendMail)(option)
    } catch (err) {
      return new firebase_functions_1.https.HttpsError(
        'aborted',
        err.toString()
      )
    }
  })
/**
 * メール送信
 * @param {*} data SendMailOptions
 * @returns 'success'
 */
exports.createAccountAuth = functions
  .region('asia-northeast1')
  .https.onCall(async (email, context) => {
    const password = (0, createPass_1.createPassWord)(8)
    try {
      const setAuth = await admin.auth().createUser({
        email: email,
        password: password
      })
      const mailOption = {
        from: 'sample-web-info@ligto.net',
        to: email,
        subject: 'ログイン情報',
        text: `※このメールは自動送信されています。

アカウントが発行されましたのでお知らせいたします。

■■■■■■■■■■■■■■■■■■■■■■■■■
メールアドレス：${email}
パスワード：${password}
■■■■■■■■■■■■■■■■■■■■■■■■■

パスワードの変更に関しましては、
ログインページ【ログインパスワードを忘れた方はこちら】から行っていただけます。`
      }
      await (0, init_1.sendMail)(mailOption)
      return setAuth.uid
    } catch (err) {
      return new firebase_functions_1.https.HttpsError('aborted', err.message)
    }
  })
//# sourceMappingURL=index.js.map
