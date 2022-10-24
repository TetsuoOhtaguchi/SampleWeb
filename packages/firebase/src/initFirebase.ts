import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getAuth } from 'firebase/auth'
import { initializeAuth, indexedDBLocalPersistence } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const config = {
  apiKey: 'AIzaSyA4JxEnz2_mBJGJsr_9EeW9FuItS7bxhYc',
  authDomain: 'sample-web-3eabc.firebaseapp.com',
  projectId: 'sample-web-3eabc',
  storageBucket: 'sample-web-3eabc.appspot.com',
  messagingSenderId: '227517966944',
  appId: '1:227517966944:web:41790c7e5f232036b9f105'
}

const app = initializeApp(config)

enableIndexedDbPersistence(getFirestore(), {}).catch(err => {
  if (err.code === 'failed-precondition') {
    console.log('err')
  } else if (err.code === 'unimplemented') {
    console.log('err')
  }
})

/**
 * ! 確認 おそらくauthが取得出来ないためエラーが発生している
 */
export const auth = getAuth()

// export const auth = getAuth(app)

// export const auth = initializeAuth(app, {
//   persistence: indexedDBLocalPersistence
//   // No popupRedirectResolver defined
// })

console.log(auth)

export const db = getFirestore(app)

export const storage = getStorage(app)

// export const functions = getFunctions(app, 'asia-northeast1')

export const functions = null
