import { ref } from 'firebase/storage'
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { FirebaseStorage, TaskState } from 'firebase/storage'

/**
 * create random name
 */
export function randomName (len = 20, file?: File) {
  let pass = ''
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const string = letters + letters.toUpperCase() + numbers
  for (var i = 0; i < len; i++) {
    pass += string.charAt(Math.floor(Math.random() * string.length))
  }

  if (file) {
    const getExtension = file.name
    const extensionArr = getExtension.split('.')
    const extension = extensionArr[extensionArr.length - 1]
    pass = `${pass}.${extension}`
  }

  return pass
}

/**
 * upload file
 */
export async function easyUpload (
  storage: FirebaseStorage,
  path: string,
  data: File,
  fun?: (progress: number, status: TaskState) => string
): Promise<string> {
  const storageRef = ref(storage, path)

  const uploadTask = Array.isArray(data)
    ? uploadBytesResumable(storageRef, data[0], data[1])
    : uploadBytesResumable(storageRef, data)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress: number =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        if (fun) {
          fun(progress, snapshot.state)
        }
      },
      error => {
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          resolve(downloadURL)
        })
      }
    )
  })
}

// /**
//  * base64からtypeを取得
//  */
// const getTypeFromBase64 = (base64: string) => {
//   if (!base64.includes('data:')) return ''
//   const g = base64.match(/data:(.+);base64,/)
//   if (!g || g.length < 2) return ''
//   return g[1]
// }

// /**
//  * base64をFileに変換
//  */
// export const base64ToFile = (base64: string, type = ''): File => {
//   // base64のデコード
//   const bin = window.atob(base64.replace(/^.*,/, ''))

//   // バイナリデータ化
//   const buffer = new Uint8Array(bin.length)
//   for (let i = 0; i < bin.length; i++) {
//     buffer[i] = bin.charCodeAt(i)
//   }

//   const getType = getTypeFromBase64(base64)
//   if (getType && type && getType !== type)
//     throw new Error('第二引数を確認してください。')

//   // ファイルオブジェクト生成(この例ではjpegファイル)
//   return new File([buffer.buffer], 'tempData', {
//     type: getType || type
//   })
// }

// /**
//  * 画像を圧縮
//  * @example pre: 何%画像の解像度を下げるか設定する
//  */
// export const compressionImage = async (
//   file: File,
//   per: number,
//   size: number = 100
// ): Promise<File> => {
//   const info = await getInfoFromFile(file)

//   if (per > 100 || per < 0)
//     throw new Error('第二引数は、0から100の間で設定してください。')
//   if (size > 100 || size < 0)
//     throw new Error('第二引数は、0から100の間で設定してください。')

//   if (!info.type.includes('image')) throw new Error('画像のみ圧縮可能です。')

//   const canvas = document.createElement('canvas')
//   // canvas.width = info.width * (size / 100)
//   // canvas.height = info.height * (size / 100)
//   const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

//   const image = new Image()
//   return new Promise((resolve, rejects) => {
//     image.onload = () => {
//       ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
//       const base64 = canvas.toDataURL(info.type, per / 100)
//       // const base64 = canvas.toDataURL(info.type)
//       resolve(base64ToFile(base64))
//     }
//     image.src = info.path
//   })
// }

// /**
//  * ファイルの情報を取得
//  */
// export const getInfoFromFile = async (file: File) => {
//   // const base64 = await fileToBase64(file)
//   const path = URL.createObjectURL(file)
//   // const image = await fileToHTMLImageElement(path)

//   return {
//     file,
//     path,
//     type: file?.type,
//     name: file?.name,
//     size: file?.size,
//     // stringBytes: bytesToString(file?.size),
//     // width: image.width,
//     // height: image.height,
//     // base64,
//     extension: file?.name.split('.').pop() ?? ''
//   }
// }
