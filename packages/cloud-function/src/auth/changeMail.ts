import * as functions from 'firebase-functions'
import { https } from 'firebase-functions'
import * as admin from 'firebase-admin'

/**
 * メールアドレスの変更
 * @param {*} option { uid: string; mail: string }
 * @returns string
 */
export const changeMail = functions
  .region('asia-northeast1')
  .https.onCall(async (option: { uid: string; mail: string }, context) => {
    try {
      const res = await admin.auth().updateUser(option.uid, {
        email: option.mail
      })
      return res.uid
    } catch (err) {
      return new https.HttpsError('aborted', (err as any).codePrefix, err)
    }
  })
