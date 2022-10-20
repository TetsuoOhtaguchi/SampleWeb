import { ref } from 'vue'
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore'
import { NewsType } from '@sw/types'
import { db } from '../initFirebase'
import { createRandomId } from '../utils'

export const allNewsData = ref<NewsType[]>([])

export const getNews = () => {
  const q = collection(db, 'D_News')
  onSnapshot(q, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        // *追加
        if (change.doc.data().id) {
          allNewsData.value.push(change.doc.data() as NewsType)
        }
      } else if (change.type === 'modified') {
        // *更新
        const modifiedData: any = change.doc.data()

        if (allNewsData.value.some((d: NewsType) => d.id === modifiedData.id)) {
          allNewsData.value.map((d: NewsType) => {
            if (d.id === modifiedData.id) {
              d = modifiedData
            }
            return d
          })
        } else {
          allNewsData.value.push(change.doc.data() as NewsType)
        }
      } else if (change.type === 'removed') {
        // *削除
        allNewsData.value = allNewsData.value.filter(
          (d: NewsType) => d.id !== change.doc.data().id
        )
      }
    })
  })
}

export const setNews = async (collectionName: 'D_News', data: NewsType) => {
  let isId
  if (!data.id) {
    // 新規
    isId = createRandomId()
  } else {
    console.log('常にこちらを通る')
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
