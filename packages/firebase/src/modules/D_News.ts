import { ref } from 'vue'
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc
} from 'firebase/firestore'
import { NewsType } from '@sw/types'
import { db, auth } from '../initFirebase'

function initialState () {
  return {
    data: [] // firestore data
  }
}

export const allNewsData = ref<NewsType[]>([])

export const initNews = () => {
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

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    getNewsData: (state: any) =>
      state.data.sort((a: NewsType, b: NewsType) => {
        return Number(a.dateCreated) - Number(b.dateCreated)
      })
  },

  mutations: {
    initData (state: any, value: Array<NewsType>) {
      state.data = value
    },
    reset (state: any) {
      state.data = {}
    }
  },

  actions: {
    getDocs ({ dispatch, rootState, state, commit }: any) {
      // const db = getFirestore()
      // const q = collection(db, 'D_News')
      // onSnapshot(q, snapshot => {
      //   let haveData: Array<any> = state.data || []
      //   snapshot.docChanges().forEach(change => {
      //     if (change.type === 'added') {
      //       // *追加
      //       if (change.doc.data().id) {
      //         haveData.push(change.doc.data())
      //       }
      //     } else if (change.type === 'modified') {
      //       // *更新
      //       const modifiedData: any = change.doc.data()
      //       if (haveData.some((d: NewsType) => d.id === modifiedData.id)) {
      //         haveData.map((d: NewsType) => {
      //           if (d.id === modifiedData.id) {
      //             d = modifiedData
      //           }
      //           return d
      //         })
      //       } else {
      //         haveData.push(change.doc.data())
      //       }
      //     } else if (change.type === 'removed') {
      //       // *削除
      //       haveData = haveData.filter(
      //         (d: NewsType) => d.id !== change.doc.data().id
      //       )
      //     }
      //   })
      //   commit('initData', haveData)
      // })
    },

    async setDocs ({ dispatch, rootState, state }: any, data: NewsType) {
      data = {
        ...data,
        ...{
          dateCreated: new Date(),
          userIdCreated: auth.currentUser?.uid || ''
        }
      }
      const db = getFirestore()
      const newdata = collection(db, 'D_News')
      const getId: any = await addDoc(newdata, data)
      // IDを追加
      const addId = doc(db, 'D_News', getId.id)
      return updateDoc(addId, { id: getId.id })
    }
  }
}
