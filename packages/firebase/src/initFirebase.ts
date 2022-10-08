import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyA4JxEnz2_mBJGJsr_9EeW9FuItS7bxhYc',
  authDomain: 'sample-web-3eabc.firebaseapp.com',
  projectId: 'sample-web-3eabc',
  storageBucket: 'sample-web-3eabc.appspot.com',
  messagingSenderId: '227517966944',
  appId: '1:227517966944:web:41790c7e5f232036b9f105'
}

function initFirebase () {
  initializeApp(config)

  enableIndexedDbPersistence(getFirestore(), {}).catch(err => {
    if (err.code === 'failed-precondition') {
      console.log('err')
    } else if (err.code === 'unimplemented') {
      console.log('err')
    }
  })
}

export { initFirebase }
