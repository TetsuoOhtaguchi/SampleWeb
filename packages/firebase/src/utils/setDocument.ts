import { doc, setDoc } from 'firebase/firestore'
import { db } from '../initFirebase'

const randomId = () => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let docId = ''
  for (var i = 0; i < 20; i++) {
    docId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return docId
}

export const setDocument = async (collectionName: string, data: Object) => {
  const id = randomId()
  await setDoc(
    doc(db, collectionName, id),
    { ...data, ...{ id: id } },
    { merge: true }
  )
}
