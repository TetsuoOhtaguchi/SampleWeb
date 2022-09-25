import { ref } from 'vue'

/**
 * 画面の幅を取得
 */
export const funGetWindowWidth = (): number => {
  return navigator.userAgent.match(/iPhone|Android.+Mobile/) ||
    (window.navigator.userAgent.toLowerCase().includes('safari') &&
      !window.navigator.userAgent.toLowerCase().includes('chrome'))
    ? screen.width
    : window.innerWidth
}

/** windowの幅を監視 */
export const windowWidth = ref<number>(funGetWindowWidth())

// 画面の幅を確認
window.addEventListener('resize', () => {
  windowWidth.value = funGetWindowWidth()
})

/**
 * 画面の高さを取得
 */
export const funGetWindowHeight = (): number => {
  return navigator.userAgent.match(/iPhone|Android.+Mobile/) ||
    (window.navigator.userAgent.toLowerCase().includes('safari') &&
      !window.navigator.userAgent.toLowerCase().includes('chrome'))
    ? screen.height
    : window.innerHeight
}

/** windowの高さを監視 */
export const windowHeight = ref<number>(funGetWindowHeight())

// 画面の高さを確認
window.addEventListener('resize', () => {
  windowHeight.value = funGetWindowHeight()
})
