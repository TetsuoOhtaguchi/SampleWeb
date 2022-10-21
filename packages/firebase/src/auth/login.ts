import { auth } from '@sw/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { UserCredential } from 'firebase/auth'

/**
 * メールとパスワードでログインする関数
 * @param mail string
 * @param password string
 */
export const login = (
  mail: string,
  password: string
): Promise<UserCredential> => {
  return new Promise((resolve, rejects) => {
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential: UserCredential) => {
        // Signed in
        // const user = userCredential.user
        resolve(userCredential)
      })
      .catch(error => {
        // const errorCode = error.code
        // const errorMessage = error.message
        rejects(error)
      })
  })
}
