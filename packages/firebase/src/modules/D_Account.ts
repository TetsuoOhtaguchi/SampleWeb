import { ref } from 'vue'
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore'
import { AccountType } from '@sw/types'
import { db } from '../initFirebase'
import { createRandomId } from '../utils'

export const allAccountData = ref<AccountType[]>([])

export const getAccount = () => {
  const q = collection(db, 'D_Account')
  onSnapshot(q, snapshot => {
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
  let isId
  if (!data.id) {
    // 新規
    isId = createRandomId()
  } else {
    // 更新
    isId = data.id
  }

  await setDoc(
    doc(db, collectionName, isId),
    {
      ...data,
      ...{ id: isId }
    },
    { merge: true }
  )
}