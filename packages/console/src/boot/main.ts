import { getNews, unsubscribeNews } from '../../../firebase/src/modules/D_News'
import {
  getAccount,
  unsubscribeAccount
} from '../../../firebase/src/modules/D_Account'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@sw/firebase'
import { Router } from 'vue-router'

export default async ({ router }: { router: Router }) => {
  /**
   * * auth情報の監視処理を行う
   */
  onAuthStateChanged(auth, async user => {
    if (router.currentRoute.value.fullPath.startsWith('/dev')) return
    const backPath =
      router.currentRoute.value.path === '/' ||
      router.currentRoute.value.path === '/Login'
        ? '/Contact'
        : router.currentRoute.value.path
    router.push('/')
    if (user) {
      //　ログインしている
      /**
       * * DB情報
       */
      // お知らせ情報
      getNews()
      // アカウント情報
      getAccount()
      router.push(backPath)
    } else {
      //　ログアウトして
      unsubscribeNews()
      unsubscribeAccount()
      router.push('/Login')
    }
  })
}
