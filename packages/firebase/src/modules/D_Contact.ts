import { ref } from 'vue'
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  Unsubscribe
} from 'firebase/firestore'
import { ContactType } from '@sw/types'
import { db } from '../initFirebase'

export const allContactData = ref<ContactType[]>([])

const returnVal = ref<null | Unsubscribe>()

export const getContact = () => {
  const q = collection(db, 'D_Contact')
  returnVal.value = onSnapshot(q, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // *追加
        if (change.doc.data().id) {
          allContactData.value.push(change.doc.data() as ContactType)
        }
      } else if (change.type === 'modified') {
        // *更新
        const modifiedData: any = change.doc.data()

        if (
          allContactData.value.some(
            (d: ContactType) => d.id === modifiedData.id
          )
        ) {
          const targetArr = allContactData.value.map((d: ContactType) => {
            if (d.id === modifiedData.id) {
              d = modifiedData
            }
            return d
          })
          allContactData.value = targetArr
        } else {
          allContactData.value.push(change.doc.data() as ContactType)
        }
      } else if (change.type === 'removed') {
        // *削除
        allContactData.value = allContactData.value.filter(
          (d: ContactType) => d.id !== change.doc.data().id
        )
      }
    })
  })
}

export const setContact = async (
  collectionName: 'D_Contact',
  data: ContactType
) => {
  await setDoc(
    doc(db, collectionName, data.id),
    {
      ...data,
      ...{ id: data.id }
    },
    { merge: true }
  )
}

export const unsubscribeContact = () => {
  if (!returnVal.value) return
  returnVal.value()
}
