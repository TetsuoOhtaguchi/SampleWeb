import * as functions from 'firebase-functions'
import { https } from 'firebase-functions'
import { sendMail as _sendMail } from './init'
import { SendMailOptions } from 'nodemailer'
import * as admin from 'firebase-admin'
import { createPassWord } from '../helper/createPass'

/**
 * メール送信
 * @param {*} data SendMailOptions
 * @returns 'success'
 */
export const sendMail = functions
  .region('asia-northeast1')
  .https.onCall(async (option: SendMailOptions, context) => {
    try {
      return await _sendMail(option)
    } catch (err) {
      return new https.HttpsError('aborted', (err as any).toString())
    }
  })

/**
 * メール送信
 * @param {*} data SendMailOptions
 * @returns 'success'
 */
export const createEmployeeAuth = functions
  .region('asia-northeast1')
  .https.onCall(async (email: string, context) => {
    const password = createPassWord(8)

    try {
      const setAuth = await admin.auth().createUser({
        email: email,
        password: password
      })

      const mailOption: SendMailOptions = {
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

      await _sendMail(mailOption)

      return setAuth.uid
    } catch (err) {
      return new https.HttpsError('aborted', (err as any).message)
    }
  })
