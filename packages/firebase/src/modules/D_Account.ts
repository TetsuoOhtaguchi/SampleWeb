import { ref } from 'vue'
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  Unsubscribe
} from 'firebase/firestore'
import { AccountType } from '@sw/types'
import { db } from '../initFirebase'
import { createRandomId } from '../utils'

export const allAccountData = ref<AccountType[]>([])

const returnVal = ref<null | Unsubscribe>()

export const getAccount = () => {
  const q = collection(db, 'D_Account')
  returnVal.value = onSnapshot(q, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // *追加
        if (change.doc.data().id) {
          allAccountData.value.push(change.doc.data() as AccountType)
        }
      } else if (change.type === 'modified') {
        // *更新
        const modifiedData: any = change.doc.data()

        if (
          allAccountData.value.some(
            (d: AccountType) => d.id === modifiedData.id
          )
        ) {
          const targetArr = allAccountData.value.map((d: AccountType) => {
            if (d.id === modifiedData.id) {
              d = modifiedData
            }
            return d
          })
          allAccountData.value = targetArr
        } else {
          allAccountData.value.push(change.doc.data() as AccountType)
        }
      } else if (change.type === 'removed') {
        // *削除
        allAccountData.value = allAccountData.value.filter(
          (d: AccountType) => d.id !== change.doc.data().id
        )
      }
    })
  })
}

export const setAccount = async (
  collectionName: 'D_Account',
  data: AccountType
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

export const unsubscribeAccount = () => {
  if (!returnVal.value) return
  returnVal.value()
}
