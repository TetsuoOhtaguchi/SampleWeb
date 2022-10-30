import { ref } from 'vue'
import * as validator from '@sw/utils'
/**
 * アカウント情報の入力チェックを行う
 */
export const accountValidator = (name: string, mail: string) => {
  const isErrorCode = ref<string>('')
  const isErrorMsg = ref<string>('')

  // アカウントネーム
  isErrorCode.value = validator.nameValidator(name)
  if (isErrorCode.value === '001') {
    isErrorMsg.value = '※アカウントネームを入力してください'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }
  if (isErrorCode.value === '002') {
    isErrorMsg.value =
      '※アカウントネームは全角ひらがな、全角カタカナ、漢字のいずれかで入力してください'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }

  // メールアドレス
  isErrorCode.value = validator.mailValidator(mail)
  if (isErrorCode.value === '003') {
    isErrorMsg.value = '※メールアドレスを入力してください'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }
  if (isErrorCode.value === '004') {
    isErrorMsg.value = '※メールアドレスに誤りがあります'
    return { errorCode: isErrorCode.value, errorMsg: isErrorMsg.value }
  }

  return { errorCode: '', errorMsg: '' }
}
