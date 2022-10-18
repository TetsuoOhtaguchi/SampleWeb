import { storage } from '../initFirebase'
/**
 * 画像をFirebase storageへ保存する
 */
export async function easyUpload (path: String, data: File, fun = () => {}) {
  /**
   * ! アップロード方法
   */
  // const storage = firebase.storage().ref()
  // const storageRef = storage.child(path)
  // const uploadTask = storageRef.put(data)
  // return new Promise((resolve, reject) => {
  //   uploadTask.on(
  //     'state_changed',
  //     snapshot => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       if (fun) {
  //         fun(progress, snapshot.state)
  //       }
  //     },
  //     error => {
  //       reject(error)
  //     },
  //     () => {
  //       uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
  //         resolve(downloadURL)
  //       })
  //     }
  //   )
  // })
}
