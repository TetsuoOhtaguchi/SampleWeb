export {}
// /**
//  * エラーメッセージを取得して返す
//  * @param code
//  * @returns 'エラーメッセージ'
//  */
//  export function getErrorText(code: string): string {
//     if (code !== '000') {
//       // エラー有
//       return dbMMessageModule.doc(code).data?.msg || '※エラーが起きました'
//     } else {
//       // エアー無
//       return ''
//     }
//   }

//   /**
//    * エラーメッセージを取得して返す
//    * @param code
//    * @returns 'エラーメッセージ'
//    */
//   export async function getErrorTextLogin(code: string): Promise<string> {
//     if (code !== '000') {
//       // エラー有
//       const errorMsg = await dbMMessageModule.doc(code).fetch()
//       return errorMsg?.msg || '※エラーが起きました'
//     } else {
//       // エアー無
//       return ''
//     }
//   }
